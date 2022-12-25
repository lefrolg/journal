import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    name: "import",
    path: "/portal/employee/list/:companyId/import",
    components: {
      sidebar: () => import("../components/CompaniesNav"),
      user: () => import("../components/UserCard"),
      default: () => import("../pages/ManageImportErrors"),
    },
    props: {
      sidebar: true,
      user: false,
      default: true,
    },
  },
  {
    name: "companies",
    path: "/portal/employee/list/:companyId",
    components: {
      sidebar: () => import("../components/CompaniesNav"),
      user: () => import("../components/UserCard"),
      default: () => import("../pages/ManageEmployees"),
    },
    props: {
      sidebar: true,
      user: false,
      default: true,
    },
  },
  {
    name: "home",
    path: "/portal/employee/list/",
    components: {
      sidebar: () => import("../components/CompaniesNav"),
      user: () => import("../components/UserCard"),
      default: () => import("../pages/ManageEmployees"),
    },
  },
  {
    name: "login",
    path: "/portal/login",
    components: {
      sidebar: {},
      user: {},
      default: () => import("../pages/UserLogin"),
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
