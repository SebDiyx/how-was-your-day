'use client';

import type React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { MinDairyEntry } from '@/app/page';
import { DairyEntryFormBody, DairyEntryFormFooter } from './dairy-entry-form';
import { DairyEntryFormHeader } from './dairy-entry-form';
import { toast } from 'sonner';
import { api } from '@/trpc/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './ui/form';
import { getVisibleRange } from './calendar/utils';
import { type RatingValue } from './form/rating-radio-group-field';

export interface DayModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date;
    initialData?: MinDairyEntry;
}

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

export function DairyEntryModal({
    isOpen,
    onClose,
    date,
    initialData,
}: DayModalProps) {
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
            onClose();
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DairyEntryFormHeader date={date} />
                        <DairyEntryFormBody />
                        <DairyEntryFormFooter onCancel={onClose} />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
