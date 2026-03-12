import {type ActionFunctionArgs, Form, useLoaderData} from "react-router";
import {api, ClassLesson} from "../services/mockApi";
import {Button, Card, CardContent, CardHeader, CardTitle, Input} from "../components/ui";

export async function classLoader({params}: any) {
  const classData = await api.getClass(params.id);
  if (!classData) throw new Response("Not Found", {status: 404});
  return {classData};
}

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

export function ClassDetails() {
  const {classData} = useLoaderData() as { classData: ClassLesson };
console.log(classData);
  return (
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Hero Image */}
        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative shadow-sm border border-border">
          <img
              src={classData.photo}
              alt={classData.title}
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Header & Description */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-4xl font-serif font-semibold text-foreground">
                {classData.title}
              </h1>
              <div className="flex items-center gap-3 mt-3 text-muted-foreground">
                <span>{classData.date} at {classData.time}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    classData.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                        classData.status === 'completed' ? 'bg-muted text-muted-foreground' :
                            'bg-primary/10 text-primary'
                }`}>
                {classData.status.charAt(0).toUpperCase() + classData.status.slice(1)}
              </span>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed text-lg">
              {classData.description}
            </p>
          </div>

          {/* Actions */}
          {classData.status === "scheduled" && (
              <Form method="post" className="shrink-0 w-full md:w-auto">
                <input type="hidden" name="intent" value="cancel_class"/>
                <Button variant="destructive" type="submit" className="w-full md:w-auto">
                  Cancel Class
                </Button>
              </Form>
          )}
        </div>

        {/* Management Cards */}
        <div className="grid gap-6 md:grid-cols-2 pt-4">
          {/* Add Attendee Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Add Attendee</CardTitle>
            </CardHeader>
            <CardContent>
              <Form method="post" className="space-y-4">
                <input type="hidden" name="intent" value="add_attendee"/>
                <Input
                    name="name"
                    placeholder="Full Name"
                    required
                    disabled={classData.status !== "scheduled"}
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    disabled={classData.status !== "scheduled"}
                />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={classData.status !== "scheduled"}
                >
                  Add Manually
                </Button>
              </Form>
            </CardContent>
          </Card>

          {/* Attendees List Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">
                Attendees ({classData.attendees.length}/{classData.maxAttendees})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {classData.attendees.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No attendees yet.</p>
              ) : (
                  <ul className="space-y-3">
                    {classData.attendees.map(a => (
                        <li key={a.id}
                            className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
                          <div className="text-sm">
                            <p className="font-medium">{a.name}</p>
                            <p className="text-muted-foreground">{a.email}</p>
                          </div>
                          <Form method="post">
                            <input type="hidden" name="intent" value="remove_attendee"/>
                            <input type="hidden" name="attendeeId" value={a.id}/>
                            <Button
                                variant="outline"
                                type="submit"
                                className="h-8 px-3 text-xs text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              Remove
                            </Button>
                          </Form>
                        </li>
                    ))}
                  </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
  );
}