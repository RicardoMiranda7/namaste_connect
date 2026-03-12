import {api} from "../services/mockApi.ts";

export async function dashboardLoader() {
  const lessons = await api.getClasses();
  return {lessons};
}

export async function classLoader({params}: any) {
  const classData = await api.getClass(params.id);
  if (!classData) throw new Response("Not Found", {status: 404});
  return {classData};
}