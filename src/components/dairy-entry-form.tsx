import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { format } from 'date-fns';
import RatingRadioGroup from './form/rating-radio-group';

export function DairyEntryFormHeader({ date }: { date: Date }) {
    return (
        <DialogHeader>
            <DialogTitle className="flex gap-2 text-xl text-amber-800">
                How was your day on {format(date, 'MMMM d, yyyy')}?
            </DialogTitle>
        </DialogHeader>
    );
}

export function DairyEntryFormBody() {
    return (
        <div className="grid gap-6 py-4">
            <RatingRadioGroup />

            <div className="space-y-2">
                <Label htmlFor="description" className="text-amber-800">
                    Description
                </Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="How was your day? What happened?"
                    rows={5}
                    className="border-amber-200 bg-white focus-visible:ring-amber-400"
                />
            </div>
        </div>
    );
}

export function DairyEntryFormFooter({ onClose }: { onClose: () => void }) {
    return (
        <DialogFooter>
            <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
            >
                Cancel
            </Button>
            {/* TODO: Add loading state when form is submitting */}
            <Button
                type="submit"
                className="bg-amber-500 text-white hover:bg-amber-600"
            >
                Save
            </Button>
        </DialogFooter>
    );
}
