'use client';

import type React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { MinDairyEntry } from '@/app/page';
import { DairyEntryFormBody, DairyEntryFormFooter } from './dairy-entry-form';
import { DairyEntryFormHeader } from './dairy-entry-form';
import { toast } from 'sonner';
import { api } from '@/trpc/react';
import { format } from 'date-fns';

export interface DayModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date;
    initialData?: MinDairyEntry;
}

export function DairyEntryModal({
    isOpen,
    onClose,
    date,
    initialData,
}: DayModalProps) {
    const utils = api.useUtils();
    const createDairyEntryMutation = api.dairyEntry.upsert.useMutation({
        onSuccess: async () => {
            await utils.dairyEntry.getMany.invalidate();
            toast.success('Dairy entry created');
            onClose();
        },
        onError: () => {
            toast.error('Failed to create dairy entry');
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                aria-description={`Dairy Entry Form for ${format(date, 'MMMM d, yyyy')}`}
            >
                <form
                    action={async (formData) => {
                        const rating = formData.get('rating');
                        const description = formData.get('description');

                        await createDairyEntryMutation.mutateAsync({
                            rating: parseInt(rating as string),
                            description: description as string,
                            date: date,
                            id: initialData?.id,
                        });
                    }}
                >
                    <DairyEntryFormHeader date={date} />
                    <DairyEntryFormBody />
                    <DairyEntryFormFooter onClose={onClose} />
                </form>
            </DialogContent>
        </Dialog>
    );
}
