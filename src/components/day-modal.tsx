"use client";

import type React from "react";

import { useEffect, useState, forwardRef } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { DayEntry } from "@/app/page";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (score: number, description: string) => void;
  date: Date | null;
  initialData?: DayEntry;
}

const DialogContentCustom = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl border-amber-200 bg-gradient-to-b from-amber-50 to-white",
      className
    )}
    {...props}
  >
    {children}
    <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1.5 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-amber-100 data-[state=open]:text-amber-800 hover:bg-amber-100">
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
));
DialogContentCustom.displayName = DialogPrimitive.Content.displayName;

export function DayModal({
  isOpen,
  onClose,
  onSave,
  date,
  initialData,
}: DayModalProps) {
  const [score, setScore] = useState<number>(initialData?.score || 0);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  useEffect(() => {
    if (initialData) {
      setScore(initialData.score);
      setDescription(initialData.description);
    } else {
      setScore(0);
      setDescription("");
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    onSave(score, description);
  };

  if (!date) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentCustom className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-amber-800 flex gap-2 text-xl">
            How was your day on {format(date, "MMMM d, yyyy")}?
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="score" className="text-amber-800">
              Rate your day (-2 to 2)
            </Label>
            <RadioGroup
              id="score"
              value={score.toString()}
              onValueChange={(value) => setScore(Number.parseInt(value))}
              className="flex justify-between"
            >
              <div className="flex flex-col items-center">
                <RadioGroupItem
                  value="-2"
                  id="score-minus-2"
                  className="sr-only"
                />
                <Label
                  htmlFor="score-minus-2"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-1 ${
                      score === -2
                        ? "bg-amber-900 ring-2 ring-offset-2 ring-amber-900"
                        : "bg-amber-900/70"
                    }`}
                  >
                    -2
                  </div>
                  <span className="text-amber-800">Terrible</span>
                </Label>
              </div>

              <div className="flex flex-col items-center">
                <RadioGroupItem
                  value="-1"
                  id="score-minus-1"
                  className="sr-only"
                />
                <Label
                  htmlFor="score-minus-1"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-1 ${
                      score === -1
                        ? "bg-amber-600 ring-2 ring-offset-2 ring-amber-600"
                        : "bg-amber-600/70"
                    }`}
                  >
                    -1
                  </div>
                  <span className="text-amber-800">Bad</span>
                </Label>
              </div>

              <div className="flex flex-col items-center">
                <RadioGroupItem value="0" id="score-0" className="sr-only" />
                <Label
                  htmlFor="score-0"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-black mb-1 ${
                      score === 0
                        ? "bg-amber-400 ring-2 ring-offset-2 ring-amber-400"
                        : "bg-amber-400/70"
                    }`}
                  >
                    0
                  </div>
                  <span className="text-amber-800">Okay</span>
                </Label>
              </div>

              <div className="flex flex-col items-center">
                <RadioGroupItem value="1" id="score-1" className="sr-only" />
                <Label
                  htmlFor="score-1"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-black mb-1 ${
                      score === 1
                        ? "bg-yellow-300 ring-2 ring-offset-2 ring-yellow-300"
                        : "bg-yellow-300/70"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-amber-800">Good</span>
                </Label>
              </div>

              <div className="flex flex-col items-center">
                <RadioGroupItem value="2" id="score-2" className="sr-only" />
                <Label
                  htmlFor="score-2"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-black mb-1 ${
                      score === 2
                        ? "bg-yellow-300 ring-2 ring-offset-2 ring-yellow-300"
                        : "bg-yellow-300/70"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-amber-800">Great</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-amber-800">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="How was your day? What happened?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="border-amber-200 focus-visible:ring-amber-400"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-amber-500 text-white hover:bg-amber-600"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContentCustom>
    </Dialog>
  );
}
