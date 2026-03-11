import { useLoaderData, Link } from "react-router";
import { api, ClassSession } from "../services/mockApi";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui";

export async function dashboardLoader() {
  const classes = await api.getClasses();
  return { classes };
}

export function Dashboard() {
  const { classes } = useLoaderData() as { classes: ClassSession[] };

  const upcoming = classes.filter(c => c.status === "scheduled");
  const past = classes.filter(c => c.status === "completed" || c.status === "cancelled");

  const ClassCard = ({ c }: { c: ClassSession }) => (
      <Link to={`/class/${c.id}`}>
        <Card className="hover:border-primary transition-colors cursor-pointer h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{c.title}</CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'cancelled' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
              {c.status}
            </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{c.date} at {c.time}</p>
              <p>{c.attendees.length} / {c.maxAttendees} Attendees</p>
            </div>
          </CardContent>
        </Card>
      </Link>
  );

  return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Upcoming Classes</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map(c => <ClassCard key={c.id} c={c} />)}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Past & Cancelled</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {past.map(c => <ClassCard key={c.id} c={c} />)}
          </div>
        </div>
      </div>
  );
}