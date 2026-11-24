import {Form, useLoaderData} from "react-router";
import {ClassLesson} from "../services/mockApi";
import {Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea} from "../components/ui";
import {ROUTES} from "../constants/routes.ts";
import {useState} from "react";

export function ClassDetails() {
  const {classData} = useLoaderData() as { classData: ClassLesson };
  const publicUrl = `${ROUTES.PUBLIC_CLASS}${classData.id}`;
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${publicUrl}` : publicUrl;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

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

          <div className="shrink-0 w-full md:w-80 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">Public Class Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input readOnly value={shareUrl}/>
                  <Button type="button" variant="outline" className="w-full" onClick={handleCopyLink}>
                    {copied ? "Copied" : "Copy Link"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Share this URL so users can view class details.
                  </p>
                </div>
              </CardContent>
            </Card>

            {classData.status === "scheduled" && (
                <Form method="post" className="shrink-0 w-full md:w-auto">
                  <input type="hidden" name="intent" value="cancel_class"/>
                  <Button variant="destructive" type="submit" className="w-full md:w-auto">
                    Cancel Session
                  </Button>
                </Form>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl">Edit Session</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" encType="multipart/form-data" className="space-y-4">
              <input type="hidden" name="intent" value="update_session"/>
              <input type="hidden" name="existingPhoto" value={classData.photo}/>
              <Input name="title" placeholder="Class Title" required defaultValue={classData.title}/>
              <div className="grid grid-cols-2 gap-4">
                <Input name="date" type="date" required defaultValue={classData.date}/>
                <Input name="time" type="time" step="60" required defaultValue={classData.time}/>
              </div>
              <Input name="maxAttendees" type="number" required defaultValue={classData.maxAttendees}/>
              <Textarea name="description" placeholder="Description" required defaultValue={classData.description}/>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Class Photo</label>
                <Input name="image" type="file" accept="image/*"/>
              </div>
              <Button type="submit">Save Changes</Button>
            </Form>
          </CardContent>
        </Card>

        {/* Management Cards */}
        <div className="grid gap-6 md:grid-cols-2 pt-4">
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
                            {a.email && <p className="text-muted-foreground">{a.email}</p>}
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