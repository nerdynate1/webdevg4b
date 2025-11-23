"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
  disabled?: boolean;
};

export function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  className,
  disabled,
}: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className={cn("fixed inset-0 z-50", className)} role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60" onClick={disabled ? undefined : onCancel} aria-hidden />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg">
          <div className="px-4 py-3 border-b">
            <h3 className="text-base font-semibold">{title}</h3>
          </div>
          <div className="px-4 py-4">
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <div className="flex items-center justify-end gap-2 px-4 py-3 border-t">
            <Button variant="outline" onClick={onCancel} disabled={!!disabled}>
              {cancelLabel}
            </Button>
            <Button onClick={onConfirm} disabled={!!disabled}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
