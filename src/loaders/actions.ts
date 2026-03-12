import {ActionFunctionArgs, redirect} from "react-router";
import {api} from "../services/mockApi.ts";
import {ROUTES} from "../constants/routes.ts";

export async function classAction({request, params}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "cancel_class") {
    await api.cancelClass(params.id!);
  } else if (intent === "add_attendee") {
    await api.addAttendee(params.id!, formData.get("name") as string, formData.get("email") as string);
  } else if (intent === "remove_attendee") {
    await api.removeAttendee(params.id!, formData.get("attendeeId") as string);
  }
  return null;
}

export async function newClassAction({request}: any) {
  const formData = await request.formData();

  await api.addClass({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    maxAttendees: Number(formData.get("maxAttendees")),
    photo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80" // Placeholder
  });
  return redirect(ROUTES.DASHBOARD);
}