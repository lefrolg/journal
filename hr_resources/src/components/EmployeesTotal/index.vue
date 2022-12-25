<template>
  <div class="total">
    <div class="total__header">{{ $t("Total.total") }}</div>
    <ul class="total__list">
      <li v-for="(summary, level) in total" :key="level + Math.random">{{ getLevelName(level) }}: {{ summary }}</li>
    </ul>
    <div class="total__amount">{{ $t("Total.amount", { n: employees.length }) }}</div>
  </div>
</template>
<script>
import { getLevelNameById } from "@/utils/getLevelName";

export default {
  name: "EmployeesTotal",
  props: {
    employees: {
      type: Array,
      required: true,
    },
    levels: {
      type: Object,
      required: true,
    },
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
    total() {
      return this.employees.reduce((total, employee) => {
        if (employee.level) {
          if (total[employee.level]) {
            total[employee.level]++;
          } else {
            total[employee.level] = 1;
          }
        }
        return total;
      }, {});
    },
  },
};
</script>
<style src="./index.scss" lang="scss"></style>
