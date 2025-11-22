import { cn } from "@/lib/utils";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface InvoiceDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeHolder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InvoiceDatePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  placeHolder = "Select date",
  className,
  field,
  onChange,
}: InvoiceDatePickerProps<TFieldValues, TName>) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const formatDateForInput = (date: Date | null | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="relative w-full">
      <input
        type="date"
        
        value={formatDateForInput(field.value)}
        onChange={handleDateChange}
        className={cn(
          "w-full rounded-lg border border-neutral-200 dark:border-neutral-700",
          "bg-white dark:bg-neutral-900",
          "px-3.5 py-2.5 pr-10",
          "text-sm font-medium text-neutral-900 dark:text-neutral-100",
          "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
          "outline-none ring-0",
          "transition-all duration-200 ease-in-out",
          "hover:border-neutral-300 dark:hover:border-neutral-600",
          "hover:bg-neutral-50 dark:hover:bg-neutral-800",
          "focus:border-neutral-900 dark:focus:border-neutral-400",
          "focus:bg-white dark:focus:bg-neutral-900",
          "focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-400/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-calendar-picker-indicator]:opacity-0",
          "[&::-webkit-calendar-picker-indicator]:absolute",
          "[&::-webkit-calendar-picker-indicator]:right-0",
          "[&::-webkit-calendar-picker-indicator]:w-full",
          "[&::-webkit-calendar-picker-indicator]:h-full",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
          className,
        )}
        placeholder={placeHolder}
      />
      <CalendarIcon 
        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" 
      />
    </div>
  );
};

export default InvoiceDatePicker;