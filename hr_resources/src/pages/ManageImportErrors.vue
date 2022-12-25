<template>
  <div class="employee employee--import">
    <div class="employee__header" v-if="importEmployees?.fileName">
      Ошибки импорта файла {{ importEmployees?.fileName }}:
      <br />
      {{ importEmployeesMessages }}
    </div>
    <template v-if="employees">
      <div class="employee__actions">
        <input-month class="action" :date="date" :disabled="true" />
        <div class="action">
          <button class="btn btn--primary" @click="sendEmployees" :disabled="!allowApprove">
            {{ $t("Button.Approve") }}
          </button>
        </div>
        <button-import-file class="action" :company-id="companyId" :date="date" @import="uploadImport" />
        <button-add class="action" @add="addEmployee" />
      </div>
      <div class="employee__list">
        <employees-list
          :employees="employees"
          :levels="levels"
          :errors-count="errorsCount"
          @editEmployee="editEmployee"
          @removeEmployee="removeEmployee"
        />
      </div>
      <edit-employee ref="editEmployee" :levels="levels" />
      <modal-window ref="confirm">
        <template #header>Требуется подтверждение</template>
        <template #body>Вы уверены?</template>
      </modal-window>
    </template>
    <div v-else>Файл импорта не найден</div>
  </div>
</template>
<script>
import ButtonImportFile from "@/components/ButtonImportFile";
import InputMonth from "@/components/InputMonth";
import EditEmployee from "@/components/EditEmployee";
import ModalWindow from "@/components/ModalWindow";
import EmployeesList from "@/components/EmployeesList";
import { ref } from "vue";
import { getLevelNameById } from "@/utils/getLevelName";
import { levelApi } from "@/services/levelApi";
import { mapGetters, mapMutations } from "vuex";
import employeeApi from "@/services/employee";
import { dateToYYMM } from "@/utils/month";
import ButtonAdd from "@/components/ButtonAdd";

export default {
  name: "ManageImportErrors",
  components: {
    ButtonAdd,
    ButtonImportFile,
    InputMonth,
    EditEmployee,
    ModalWindow,
    EmployeesList,
  },
  props: {
    companyId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const levels = ref([]);
    const getLevelName = (level) => {
      return getLevelNameById(level, levels);
    };
    return {
      levels,
      getLevelName,
    };
  },
  created() {
    this.setLevels();
  },
  computed: {
    ...mapGetters(["importsEmployees"]),
    importEmployees() {
      return this.importsEmployees.find((i) => i.companyId == this.companyId);
    },
    importEmployeesMessages() {
      try {
        return Object.values(this.importEmployees.messages).flat().join(", ");
      } catch {
        return "";
      }
    },
    employees: {
      get() {
        if (!this.importEmployees) return false;
        return this.importEmployees.employees;
      },
      set(employees) {
        this.changeImportEmployees({ employees, companyId: this.companyId });
      },
    },
    allowApprove() {
      return !this.errorsCount && this.employees.length;
    },
    errorsCount() {
      return this.employees.reduce((count, i) => (i.error ? ++count : count), 0);
    },
    date: {
      get() {
        if (!this.importEmployees) return "";
        return this.importEmployees.date;
      },
      set(date) {
        this.changeImportEmployees({ date, companyId: this.companyId });
      },
    },
  },
  methods: {
    ...mapMutations(["changeImportEmployees", "setImportEmployees"]),
    async setLevels() {
      this.levels = await levelApi.index();
    },
    async addEmployee() {
      const newEmployee = await this.$refs.editEmployee.open({ sendEmployee: (employee) => employee });
      if (newEmployee) {
        this.employees.push(newEmployee);
      }
    },
    async editEmployee(id) {
      let employee = Object.assign(
        {},
        this.employees.find((employee) => employee.id === id)
      );
      const updateEmployee = await this.$refs.editEmployee.open({ employee, sendEmployee: (employee) => employee });
      if (updateEmployee) {
        updateEmployee.error = "";
        this.employees = this.employees.map((employee) => (employee.id === id ? updateEmployee : employee));
      }
    },
    async removeEmployee(id) {
      const confirmation = await this.$refs.confirm.open();
      if (confirmation) {
        this.employees = this.employees.filter((employee) => employee.id !== id);
      }
    },
    async sendEmployees() {
      const result = await employeeApi.mass_upsert(this.companyId, dateToYYMM(this.date), this.employees);
      if (result && result.type === "error") {
        this.setImportEmployees({
          fileName: this.importEmployees.fileName,
          employees: result.data.data,
          companyId: this.companyId,
          date: this.date,
        });
      } else if (result.status === 204) {
        this.$router.push({ name: "companies", params: { companyId: this.companyId } });
      }
    },
    uploadImport(status) {
      if (status === 1) {
        this.$router.push({ name: "companies", params: { companyId: this.companyId } });
      }
    },
  },
};
</script>
<style src="@/assets/styles/managePage.scss" lang="scss"></style>
