import {ClassLesson} from "../services/mockApi.ts";
import {ROUTES} from "../constants/routes.ts";
import {Link} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "./ui.tsx";

export default function ClassCard({lesson}: { lesson: ClassLesson }) {
  return (
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
      </Link>)
}