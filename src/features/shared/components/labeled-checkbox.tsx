"use client";

import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LabeledCheckboxProps {
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function LabeledCheckbox({
  label,
  checked = false,
  onCheckedChange,
  disabled = false,
  className = "",
}: LabeledCheckboxProps) {
  const id = useId();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <Label
        htmlFor={id}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
      >
        {label}
      </Label>
    </div>
  );
}
