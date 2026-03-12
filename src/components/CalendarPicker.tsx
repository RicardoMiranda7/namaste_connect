import {useState} from "react";
import {DayPicker} from "react-day-picker";
import {format} from "date-fns";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "./ui";
import "react-day-picker/dist/style.css";

export function CalendarPicker({value, onChange}: { value?: Date; onChange: (date?: Date) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className="relative">
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
              />
            </div>
        )}
      </div>
  );
}