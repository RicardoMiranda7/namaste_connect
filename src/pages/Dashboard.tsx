import {Link, useLoaderData, useOutletContext} from "react-router";
import {ClassLesson} from "../services/mockApi";
import {Button} from "../components/ui";
import {ROUTES} from "../constants/routes.ts";
import {CSSProperties} from "react";
import ClassCard from "../components/ClassCard.tsx";

export function Dashboard() {
  const {isMobileMenuOpen} = useOutletContext<{ isMobileMenuOpen: boolean }>();
  const {lessons} = useLoaderData() as { lessons: ClassLesson[] };

  const upcoming = lessons.filter(c => c.status === "scheduled");
  const past = lessons.filter(c => c.status === "completed" || c.status === "cancelled");

  return (
      <div className="space-y-12">
        {/* Upcoming Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-serif font-semibold text-foreground">Upcoming Classes</h2>

            {/*
            Responsive Button Positioning:
            - Mobile (default): fixed to bottom-right, floating, high z-index
            - md+: static (flows naturally next to the title)
          */}
            <Link viewTransition
                  to={ROUTES.NEW_CLASS}
                  className={`${isMobileMenuOpen ? 'hidden' : 'fixed'} bottom-6 right-6 z-30 md:static transition-transform duration-100 active:scale-95`}
                  style={{viewTransitionName: 'new-class-button'} as CSSProperties}
            >
              <Button className="rounded-full md:rounded-md h-14 w-14 md:h-10 md:w-auto p-0 md:px-4">
                <span className="hidden md:inline">+ New Class</span>
                <span className="md:hidden text-2xl font-light">+</span>
              </Button>
            </Link>
          </div>
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