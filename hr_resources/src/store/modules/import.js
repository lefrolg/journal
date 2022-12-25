export default {
  mutations: {
    setImportEmployees(state, importData) {
      importData.employees = importData.employees.map((employee, i) => {
        employee.id = i + 1;
        return employee;
      });
      const employeeIndex = state.importEmployees.findIndex(
        (i) => i.companyId === importData.companyId
      );
      if (employeeIndex == -1) {
        state.importEmployees.push(importData);
      } else {
        state.importEmployees[employeeIndex] = importData;
      }
    },
    changeImportEmployees(state, { employees, companyId, date }) {
      const companyEmployeesI = state.importEmployees.findIndex(
        (i) => i.companyId == companyId
      );
      if (companyEmployeesI > -1) {
        if (employees) {
          employees = employees.map((employee, i) => {
            employee.id = i;
            return employee;
          });
          state.importEmployees[companyEmployeesI].employees = employees;
        }
        if (date) {
          state.importEmployees[companyEmployeesI].date = date;
        }
      }
    },
    cleanImportEmployees(state) {
      state.importEmployees = [];
    },
  },
  state: {
    importEmployees: [],
  },
  getters: {
    importsEmployees(state) {
      return state.importEmployees;
    },
  },
};
