"use client";

import { Printer } from "lucide-react";
import { Button } from "@portfolio/ui/components/button";

export function PrintButton() {
  return (
    <Button type="button" variant="secondary" size="sm" onClick={() => window.print()}>
      <Printer className="size-4" aria-hidden="true" />
      Imprimir
    </Button>
  );
}
