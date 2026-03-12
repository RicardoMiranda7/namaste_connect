import {useEffect, useRef, useState} from "react";
import {DayPicker} from "react-day-picker";
import {format} from "date-fns";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "./ui";
import "react-day-picker/dist/style.css";

export function CalendarPicker({value, onChange}: { value?: Date; onChange: (date?: Date) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the click is outside the container, close the calendar
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
      <div className="relative" ref={containerRef}>
        <Button
            type="button"
            variant="outline"
            className="w-full h-10 justify-start text-left font-normal focus:ring-2 focus:ring-emerald-800"
            onClick={() => setIsOpen(!isOpen)}
        >
          {value ? format(value, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
        </Button>

        {isOpen && (
            <div className="absolute top-12 left-0 z-50 bg-white border border-stone-200 shadow-xl rounded-xl p-4">
              <DayPicker
                  mode="single"
                  selected={value}
                  onSelect={(date) => {
                    onChange(date);
                    setIsOpen(false);
                  }}
                  className="m-0"
                  components={{
                    Chevron: (props) => (
                        props.orientation === "left"
                            ? <ChevronLeft className="h-4 w-4 text-emerald-800"/>
                            : <ChevronRight className="h-4 w-4 text-emerald-800"/>
                    ),
                  }}
                  // TODO: not sure if really necessary
                  classNames={{
                    months: "flex flex-col",
                    month: "space-y-4",
                    caption: "flex justify-between items-center font-serif text-sm font-bold text-stone-800",
                    // nav: "flex gap-2", //Makes the nav icons be in the same row as the month-year
                    table: "w-full border-collapse",
                    head_row: "flex w-full justify-between mb-2",
                    head_cell: "text-stone-400 w-9 text-center text-[0.7rem] uppercase font-normal",
                    row: "flex w-full justify-between mt-1",
                    cell: "h-9 w-9 text-center text-sm flex items-center justify-center",
                    day: "h-9 w-9 rounded-full text-stone-600 hover:bg-stone-100 transition-all",
                    day_selected: "bg-emerald-800 text-white hover:bg-emerald-900",
                    day_today: "text-emerald-700 font-bold",
                  }}
              />
            </div>
        )}
      </div>
  );
}