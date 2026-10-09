"use client";

import { Printer } from "lucide-react";
import { Button } from "@portfolio/ui/components/button";

interface PrintButtonProps {
  readonly label: string;
}

export function PrintButton({ label }: PrintButtonProps) {
  return (
    <Button type="button" variant="secondary" size="sm" onClick={() => window.print()}>
      <Printer className="size-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
