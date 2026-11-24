import {ActionFunctionArgs, redirect} from "react-router";
import {api} from "../services/mockApi.ts";
import {ROUTES} from "../constants/routes.ts";

export async function classAction({request, params}: ActionFunctionArgs) {
  if (!api.isAuthenticated()) {
    throw redirect(ROUTES.ADMIN_LOGIN);
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "update_session") {
    const imageFile = formData.get("image") as File | null;
    const existingPhoto = formData.get("existingPhoto") as string;
    const photoUrl = imageFile && imageFile.size > 0
        ? await api.createImageUrl(imageFile)
        : existingPhoto;

    await api.updateClass(params.id!, {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      maxAttendees: Number(formData.get("maxAttendees")),
      photo: photoUrl,
    });
  } else if (intent === "cancel_class") {
    await api.cancelClass(params.id!);
  } else if (intent === "add_attendee") {
    await api.addAttendee(params.id!, formData.get("name") as string, formData.get("email") as string);
  } else if (intent === "remove_attendee") {
    await api.removeAttendee(params.id!, formData.get("attendeeId") as string);
  }
  return null;
}

export async function publicClassAction({request, params}: ActionFunctionArgs) {
  void request;
  void params;
  throw new Response("Public booking is disabled for phase 1.", {status: 403});
}

export async function newClassAction({request}: any) {
  if (!api.isAuthenticated()) {
    throw redirect(ROUTES.ADMIN_LOGIN);
  }

  const formData = await request.formData();
  const imageFile = formData.get("image") as File;

  // Create a local URL for the file to store in the mock data
  const photoUrl = imageFile && imageFile.size > 0
  ? await api.createImageUrl(imageFile)
      : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80";

  await api.addClass({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    maxAttendees: Number(formData.get("maxAttendees")),
    photo: photoUrl
  });
  return redirect(ROUTES.ADMIN_HOME);
}