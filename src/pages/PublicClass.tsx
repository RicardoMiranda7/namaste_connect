import {useLoaderData} from "react-router";
import {ClassLesson} from "../services/mockApi";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui";
import {BRAND} from "../constants/brand.ts";

export function PublicClass() {
  const {classData} = useLoaderData() as { classData: ClassLesson };

  return (
      <div className="min-h-screen bg-muted/20 px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8 pb-12">
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative shadow-sm border border-border bg-background reveal-up">
            <img
                src={classData.photo}
                alt={classData.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <Card className="gallery-panel reveal-up reveal-delay-1">
              <CardHeader>
                <CardTitle className="font-serif text-3xl">{classData.title}</CardTitle>
                <p className="text-muted-foreground">{classData.date} at {classData.time}</p>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed text-lg">{classData.description}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-muted px-3 py-1">
                    {classData.attendees.length}/{classData.maxAttendees} spots filled
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1">
                    {classData.status}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="gallery-panel reveal-up reveal-delay-2">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="rounded-lg border border-border bg-background/70 p-3 text-foreground/80">
                    Public online booking is not enabled yet.
                  </p>
                  <p>
                    To reserve a place, contact {BRAND.founder} directly via {BRAND.contact.instagramHandle} or {BRAND.contact.email}.
                  </p>
                  <a
                      href={BRAND.contact.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-primary font-semibold hover:underline"
                  >
                    Open Instagram profile
                  </a>
                  <p>
                    Current availability: {classData.attendees.length}/{classData.maxAttendees} spots filled.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
