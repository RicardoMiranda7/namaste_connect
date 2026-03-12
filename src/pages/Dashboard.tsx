import {Link, useLoaderData} from "react-router";
import {api, ClassLesson} from "../services/mockApi";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui";
import {ROUTES} from "../constants/routes.ts";

export async function dashboardLoader() {
  const lessons = await api.getClasses();
  return {lessons};
}

export function Dashboard() {
  const {lessons} = useLoaderData() as { lessons: ClassLesson[] };

  const upcoming = lessons.filter(c => c.status === "scheduled");
  const past = lessons.filter(c => c.status === "completed" || c.status === "cancelled");

  const ClassCard = ({lesson}: { lesson: ClassLesson }) => (
      <Link to={ROUTES.CLASS + lesson.id} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-border/60">
          {/* Photo at the top */}
          <div className="h-48 w-full overflow-hidden bg-muted">
            <img
                src={lesson.photo}
                alt={lesson.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
              {/* Serif font title */}
              <CardTitle className="font-serif text-xl leading-snug">{lesson.title}</CardTitle>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-bold shrink-0 ${
                  lesson.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                      lesson.status === 'completed' ? 'bg-muted text-muted-foreground' :
                          'bg-primary/10 text-primary'
              }`}>
              {lesson.status}
            </span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {/* Truncated description */}
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-xs font-semibold text-foreground">
                {lesson.date} • {lesson.time}
              </span>
                <span className="text-xs text-muted-foreground font-medium">
                {lesson.attendees.length} / {lesson.maxAttendees} spots
              </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
  );

  return (
      <div className="space-y-12">
        {/* Upcoming Section */}
        <section>
          <h2 className="text-3xl font-serif font-semibold mb-8 text-foreground">Upcoming Classes</h2>
          {upcoming.length === 0 ? (
              <p className="text-muted-foreground italic">No upcoming classes scheduled.</p>
          ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.map(c => <ClassCard key={c.id} lesson={c}/>)}
              </div>
          )}
        </section>

        {/* Past/Cancelled Section */}
        <section>
          <h2 className="text-3xl font-serif font-semibold mb-8 text-foreground">History</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {past.map(c => <ClassCard key={c.id} lesson={c}/>)}
          </div>
        </section>
      </div>
  );
}