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
        "rounded-md outline-none focus:outline-none focus:ring-0 py-1 dark:text-neutral-200 focus:border-neutral-900 px-3 hover:bg-neutral-200 bg-neutral-100 dark:bg-neutral-800 focus:dark:bg-neutral-700 transition-colors duration-200 ease-in-out",
        className,
      )}
      placeholder={placeHolder}
    />
  );
};

export default InvoiceInput;
