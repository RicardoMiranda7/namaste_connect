export const ROUTE_PREFIX = import.meta.env.VITE_ROUTE_PREFIX || "";
export const ROUTES = {
  LOGIN: `${ROUTE_PREFIX}/login`,
  DASHBOARD: `${ROUTE_PREFIX}/`,
  CLASS: `${ROUTE_PREFIX}/class/`,
  NEW_CLASS: `${ROUTE_PREFIX}/class/new`,
  ATTENDEES: `${ROUTE_PREFIX}/attendees`,
};
