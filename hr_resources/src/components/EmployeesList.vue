<template>
  <div class="list">
    <div class="table">
      <div class="tr" @click="setSort">
        <div
          class="th"
          data-sort="id"
          v-if="isShowErrors"
          :class="{ active: sort.by === 'id', [sort.order]: sort.by === 'id' }"
        >
          №
        </div>
        <div class="th" data-sort="name" :class="{ active: sort.by === 'name', [sort.order]: sort.by === 'name' }">
          {{ $t("EmployeesList.Name") }}
        </div>
        <div class="th" data-sort="level" :class="{ active: sort.by === 'level', [sort.order]: sort.by === 'level' }">
          {{ $t("EmployeesList.CardType") }}
        </div>
        <div
          class="th cell-phone"
          data-sort="phone"
          :class="{ active: sort.by === 'phone', [sort.order]: sort.by === 'phone' }"
        >
          {{ $t("EmployeesList.Phone") }}
        </div>
        <div
          class="th"
          data-sort="error"
          v-if="isShowErrors"
          :class="{ active: sort === 'error', [sort.order]: sort.by === 'error' }"
        >
          {{ $t("EmployeesList.Errors") }} ({{ errorsCount }})
        </div>
      </div>
      <div class="tr" v-for="employee of sortEmployees" :key="employee.id">
        <div title="№:" class="td" v-if="isShowErrors">{{ +employee.id + 1 }}</div>
        <div :title="$t('EmployeesList.Name') + ':'" class="td">{{ employee.name }}</div>
        <div :title="$t('EmployeesList.CardType') + ':'" class="td">{{ getLevelName(employee.level) }}</div>
        <div :title="$t('EmployeesList.Phone') + ':'" class="td cell-phone">
          {{ employee.phone }}
          <actions-list v-if="isAllowChanges" class="employee-edit" :style="{ top: '25px', right: '20px' }">
            <li @click="editEmployee(employee.id)">
              <span>{{ $t("Button.Edit") }}</span>
              <img src="../assets/images/EditLogo.svg" alt="" />
            </li>
            <li @click="deleteEmployee(employee.id)">
              <span>{{ $t("Button.Remove") }}</span>
              <img src="../assets/images/DeleteLogo.svg" alt="" />
            </li>
          </actions-list>
        </div>
        <div :title="$t('EmployeesList.Errors') + ':'" class="td" v-if="isShowErrors">
          {{ employee.error }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLevelNameById } from "@/utils/getLevelName";
import ActionsList from "@/components/ActionsList";
export default {
  name: "EmployeesList",
  emits: ["editEmployee", "removeEmployee"],
  components: { ActionsList },
  props: {
    employees: {
      type: Array,
      required: true,
    },
    levels: {
      type: Array,
      required: true,
    },
    errorsCount: {
      type: Number,
      required: false,
      default: 0,
    },
    isAllowChanges: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      sort: {},
    };
  },
  setup(props) {
    const getLevelName = (level) => {
      return getLevelNameById(level, props.levels);
    };
    return {
      getLevelName,
    };
  },
  computed: {
    isShowErrors() {
      return this.$route.name == "import";
    },
    sortEmployees() {
      if (!this.sort.by) {
        return this.employees;
      }
      const employees = this.employees.concat();
      const sortBy = this.sort.by;
      if (this.sort.order === "asc") {
        return employees.sort((a, b) => (sortBy === "id" ? a[sortBy] - b[sortBy] : a[sortBy] > b[sortBy] ? 1 : -1));
      } else {
        return employees.sort((a, b) => (sortBy === "id" ? b[sortBy] - a[sortBy] : b[sortBy] > a[sortBy] ? 1 : -1));
      }
    },
  },
  methods: {
    editEmployee(id) {
      this.$emit("editEmployee", id);
    },
    deleteEmployee(id) {
      this.$emit("removeEmployee", id);
    },
    setSort(e) {
      const by = e.target.dataset.sort;
      let order = "asc";
      if (this.sort.by === by && this.sort.order === "asc") {
        order = "desc";
      }
      this.sort = { by, order };
    },
  },
};
</script>
