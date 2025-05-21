import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { format } from 'date-fns';
import RatingRadioGroupField from '../form/rating-radio-group-field';
import { useFormContext } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { DescriptionField } from '../form/text-area-field';

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
            <RatingRadioGroupField />
            <DescriptionField />
        </div>
    );
}

export function DairyEntryFormFooter({ onCancel }: { onCancel: () => void }) {
    const { formState } = useFormContext();

    return (
        <DialogFooter>
            <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
            >
                Cancel
            </Button>
            <Button
                disabled={formState.isSubmitting}
                type="submit"
                className="w-24 bg-amber-500 text-white hover:bg-amber-600"
            >
                {formState.isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    'Save'
                )}
            </Button>
        </DialogFooter>
    );
}
