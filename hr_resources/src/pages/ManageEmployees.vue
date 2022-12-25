<template>
  <div class="employee">
    <div class="employee__actions">
      <input-month class="action" :date="date" @changeDate="(newDate) => (date = newDate)" />
      <button-download-previous class="action" :date="date" :company-id="companyId" />
      <button-import-file
        class="action"
        :company-id="companyId"
        :date="importDate"
        :disabled="!isAllowChanges"
        @import="uploadImport"
      />
      <button-add class="action" @add="addEmployee" :disabled="!isAllowChanges" />
    </div>
    <div class="employee__list">
      <employees-list
        :employees="employees"
        :levels="levels"
        @editEmployee="editEmployee"
        @removeEmployee="removeEmployee"
        :isAllowChanges="isAllowChanges"
      />
      <employees-total :employees="employees" :levels="levels" />
    </div>
    <edit-employee ref="editEmployee" :levels="levels" />
    <modal-window ref="confirm">
      <template #header>{{ $t("NeedConfirm") }}</template>
      <template #body>{{ $t("AYouSure") }}</template>
    </modal-window>
  </div>
</template>
<script>
import { ref } from "vue";
import employeeApi from "@/services/employee";
import { levelApi } from "@/services/levelApi";
import { getLevelNameById } from "@/utils/getLevelName";
import { dateToYYMM, YYMMtoDate } from "@/utils/month";
import EmployeesList from "@/components/EmployeesList";
import ModalWindow from "@/components/ModalWindow";
import EditEmployee from "@/components/EditEmployee";
import InputMonth from "@/components/InputMonth";
import ButtonDownloadPrevious from "@/components/ButtonDownloadPrevious";
import ButtonImportFile from "@/components/ButtonImportFile";
import EmployeesTotal from "@/components/EmployeesTotal";
import ButtonAdd from "@/components/ButtonAdd";
import { mapMutations } from "vuex";

export default {
  name: "EmployeesManage",
  components: {
    EmployeesTotal,
    ButtonImportFile,
    ButtonDownloadPrevious,
    InputMonth,
    EditEmployee,
    ModalWindow,
    EmployeesList,
    ButtonAdd,
  },
  data() {
    return {
      employees: [],
      date: {},
      importDate: null,
    };
  },
  props: {
    companyId: {
      type: String,
      required: false,
      default: "0",
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
  watch: {
    date() {
      this.setDate(this.date);
      this.setEmployees();
    },
  },
  mounted() {
    const date = new Date();
    if (date.getDate() >= 15) {
      date.setMonth(date.getMonth() + 1);
    }
    this.date = date;
    this.setLevels();
    this.setImportDate();
  },
  computed: {
    isAllowChanges() {
      if (!this.date) return false;
      return dateToYYMM(this.date) === dateToYYMM(this.importDate);
    },
  },
  methods: {
    ...mapMutations(["setDate"]),
    async setImportDate() {
      const importDate = await employeeApi.getDateImportPermission(this.companyId);
      this.importDate = importDate?.allow_month ? YYMMtoDate(importDate.allow_month) : "";
    },
    async setEmployees() {
      this.employees = await employeeApi.index(this.companyId, dateToYYMM(this.date));
    },
    async setLevels() {
      this.levels = await levelApi.index();
    },
    async addEmployee() {
      const newEmployee = await this.$refs.editEmployee.open({ sendEmployee: this.storeEmployee });
      if (newEmployee) {
        this.employees.push(newEmployee);
      }
    },
    async storeEmployee(employee) {
      employee.month = dateToYYMM(this.date);
      const result = await employeeApi.store(this.companyId, employee);
      if (result.message) {
        return result;
      } else {
        return result.data;
      }
    },
    async editEmployee(id) {
      let employee = Object.assign(
        {},
        this.employees.find((employee) => employee.id === id)
      );
      const updateEmployee = await this.$refs.editEmployee.open({ employee, sendEmployee: this.updateEmployee });
      if (updateEmployee) {
        const employeeI = this.employees.findIndex((employee) => employee.id === id);
        this.employees[employeeI] = updateEmployee;
      }
    },
    async updateEmployee(employee) {
      employee.month = dateToYYMM(this.date);
      const result = await employeeApi.update(this.companyId, employee);
      if (result.message) {
        return result;
      } else {
        return result.data;
      }
    },
    async removeEmployee(id) {
      const confirmation = await this.$refs.confirm.open();
      if (confirmation) {
        employeeApi.delete(this.companyId, id).then(() => {
          this.employees = this.employees.filter((employee) => employee.id !== id);
        });
      }
    },
    uploadImport(status) {
      if (status === 1) {
        this.setEmployees();
      } else {
        this.$router.push({ name: "import", params: { companyId: this.companyId } });
      }
    },
  },
};
</script>
<style src="@/assets/styles/managePage.scss" lang="scss"></style>
