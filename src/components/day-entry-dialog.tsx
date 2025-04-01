"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function DayEntryDialog() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!score) {
      toast.error("Please select a score for your day");
      return;
    }

    setIsSubmitting(true);
    try {
      // await addDayEntry({
      //   date: new Date(),
      //   score: Number.parseInt(score),
      //   description,
      // });

      toast.success("Your day entry has been saved");

      // Reset form and close dialog
      setScore("");
      setDescription("");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to save your day entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Record Today</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How was your day?</DialogTitle>
          <DialogDescription>
            Rate your day and add a description of what happened.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Score your day</h4>
            <RadioGroup
              value={score}
              onValueChange={setScore}
              className="flex justify-between"
            >
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem
                  value="-2"
                  id="score-minus-2"
                  className="sr-only"
                />
                <Label
                  htmlFor="score-minus-2"
                  className={`cursor-pointer h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                    score === "-2" ? "bg-red-500 text-white" : "bg-red-100"
                  }`}
                  onClick={() => setScore("-2")}
                >
                  -2
                </Label>
                <span className="text-xs">Terrible</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem
                  value="-1"
                  id="score-minus-1"
                  className="sr-only"
                />
                <Label
                  htmlFor="score-minus-1"
                  className={`cursor-pointer h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                    score === "-1"
                      ? "bg-orange-400 text-white"
                      : "bg-orange-100"
                  }`}
                  onClick={() => setScore("-1")}
                >
                  -1
                </Label>
                <span className="text-xs">Bad</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="0" id="score-0" className="sr-only" />
                <Label
                  htmlFor="score-0"
                  className={`cursor-pointer h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                    score === "0" ? "bg-yellow-300" : "bg-yellow-100"
                  }`}
                  onClick={() => setScore("0")}
                >
                  0
                </Label>
                <span className="text-xs">Okay</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="1" id="score-1" className="sr-only" />
                <Label
                  htmlFor="score-1"
                  className={`cursor-pointer h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                    score === "1" ? "bg-green-400 text-white" : "bg-green-100"
                  }`}
                  onClick={() => setScore("1")}
                >
                  1
                </Label>
                <span className="text-xs">Good</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="2" id="score-2" className="sr-only" />
                <Label
                  htmlFor="score-2"
                  className={`cursor-pointer h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                    score === "2" ? "bg-green-600 text-white" : "bg-green-200"
                  }`}
                  onClick={() => setScore("2")}
                >
                  2
                </Label>
                <span className="text-xs">Great</span>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write about your day..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
