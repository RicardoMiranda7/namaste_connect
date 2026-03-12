import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "./ui";
import "react-day-picker/dist/style.css"; // Required styles

export function CalendarPicker({ value, onChange }: { value?: Date; onChange: (date?: Date) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className="relative">
        <Button
            type="button"
            variant="outline"
            className="w-full h-10 justify-start text-left font-normal"
            onClick={() => setIsOpen(!isOpen)}
        >
          {value ? format(value, "PPP") : "Pick a date"}
        </Button>

        {isOpen && (
            <div className="absolute top-12 z-50 bg-background border border-border shadow-lg rounded-md p-2">
              <DayPicker
                  mode="single"
                  selected={value}
                  onSelect={(date) => {
                    onChange(date);
                    setIsOpen(false);
                  }}
              />
            </div>
        )}
      </div>
  );
}