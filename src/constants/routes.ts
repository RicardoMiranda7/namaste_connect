export const ROUTE_PREFIX = import.meta.env.VITE_ROUTE_PREFIX || "";
export const ROUTES = {
  PUBLIC_HOME: `${ROUTE_PREFIX}/`,
  PUBLIC_CLASS: `${ROUTE_PREFIX}/class/`,
  ADMIN_LOGIN: `${ROUTE_PREFIX}/admin/login`,
  ADMIN_HOME: `${ROUTE_PREFIX}/admin`,
  ADMIN_CLASS: `${ROUTE_PREFIX}/admin/class/`,
  ADMIN_NEW_CLASS: `${ROUTE_PREFIX}/admin/class/new`,
  ADMIN_ATTENDEES: `${ROUTE_PREFIX}/admin/attendees`,
  LOGIN: `${ROUTE_PREFIX}/admin/login`,
  DASHBOARD: `${ROUTE_PREFIX}/admin`,
  CLASS: `${ROUTE_PREFIX}/admin/class/`,
  NEW_CLASS: `${ROUTE_PREFIX}/admin/class/new`,
  ATTENDEES: `${ROUTE_PREFIX}/admin/attendees`,
};
