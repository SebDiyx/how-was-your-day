'use client';

import type React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { MinDairyEntry } from '@/components/diary-entry-modal/types';
import { DairyEntryForm, DairyEntryFormHeader } from './dairy-entry-form';

export interface DairyEntryModalProps {
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
}: DairyEntryModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DairyEntryFormHeader date={date} />
                <DairyEntryForm
                    date={date}
                    initialData={initialData}
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}
