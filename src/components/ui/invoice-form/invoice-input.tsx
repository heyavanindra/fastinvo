import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface InvoiceInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeHolder?: string;
  className?: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InvoiceInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  placeHolder,
  className,
  type = "text",
  field,
  onChange,
}: InvoiceInputProps<TFieldValues, TName>) => {
  return (
    <input
      type={type}
      value={field.value ?? ""}
      onChange={onChange}
      className={cn(
        "w-full rounded-lg border border-neutral-200 dark:border-neutral-700",
        "bg-white dark:bg-neutral-900",
        "px-3.5 py-2.5",
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
        className,
      )}
      placeholder={placeHolder}
    />
  );
};

export default InvoiceInput;