'use client';

import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { format } from 'date-fns';
import RatingRadioGroupField, {
    type RatingValue,
} from '../form/rating-radio-group-field';
import { useForm, useFormContext } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { DescriptionField } from '../form/text-area-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { getVisibleRange } from '../calendar/utils';
import { api } from '@/trpc/react';
import type { MinDairyEntry } from './types';
import { Form } from '../ui/form';

const formSchema = z.object({
    // Note: radio button values must be strings
    rating: z.enum(['-2', '-1', '0', '1', '2']),
    description: z
        .string()
        .min(1, { message: 'Description is required' })
        .max(1024, {
            message: 'Description must be less than 1024 characters',
        }),
});

export interface DairyEntryFormProps {
    date: Date;
    initialData?: MinDairyEntry;
    onCancel?: () => void;
}

export function DairyEntryForm({
    date,
    initialData,
    onCancel,
}: DairyEntryFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: (initialData?.rating.toString() ?? '0') as RatingValue,
            description: initialData?.description ?? '',
        },
    });

    const utils = api.useUtils();
    const createDairyEntryMutation = api.dairyEntry.upsert.useMutation({
        onSuccess: async () => {
            const visibleRange = getVisibleRange(date);
            await utils.dairyEntry.getMany.invalidate({
                startDate: visibleRange.start,
                endDate: visibleRange.end,
            });
            toast.success(
                `Dairy entry ${initialData?.id ? 'updated' : 'created'}`,
            );
            // TODO: make this a new prop called onSave
            onCancel?.();
        },
        onError: () => {
            toast.error('Failed to create dairy entry');
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createDairyEntryMutation.mutateAsync({
            rating: parseInt(values.rating),
            description: values.description,
            date: date,
            id: initialData?.id,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <DairyEntryFormBody />
                <DairyEntryFormFooter onCancel={onCancel} />
            </form>
        </Form>
    );
}

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

export function DairyEntryFormFooter({ onCancel }: { onCancel?: () => void }) {
    const { formState } = useFormContext();

    return (
        <DialogFooter>
            {onCancel && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                >
                    Cancel
                </Button>
            )}
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
