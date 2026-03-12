import { Form, redirect, useNavigate } from "react-router";
import { api } from "../services/mockApi";
import { Button, Input, Card, CardContent } from "../components/ui";
import {ROUTES} from "../constants/routes.ts";

export async function newClassAction({ request }: any) {
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

export function NewClass() {
  const navigate = useNavigate();
  return (
      <div className="max-w-xl mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <Form method="post" className="space-y-4">
              <Input name="title" placeholder="Class Title" required />
              <Input name="description" placeholder="Description" required />
              <div className="grid grid-cols-2 gap-4">
                <Input name="date" type="date" required />
                <Input name="time" type="time" required />
              </div>
              <Input name="maxAttendees" type="number" placeholder="Max Attendees" required />
              <Input type="file" accept="image/*" /> {/* Future integration point */}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full">Cancel</Button>
                <Button type="submit" className="w-full">Create Class</Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}