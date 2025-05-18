import { FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useFormContext } from 'react-hook-form';

export function DescriptionField() {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor="description" className="text-amber-800">
                        Description
                    </Label>
                    <FormControl>
                        <Textarea
                            {...field}
                            placeholder="How was your day? What happened?"
                            rows={5}
                            className="border-amber-200 bg-white focus-visible:ring-amber-400"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
