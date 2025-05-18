import React from 'react';
import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem } from '../ui/form';
import { useFormContext } from 'react-hook-form';
import { RadioGroup } from '../ui/radio-group';
import * as UnstyledRadioGroup from '@radix-ui/react-radio-group';
import { Label } from '../ui/label';

export const ratingValues = ['-2', '-1', '0', '1', '2'] as const;
export type RatingValue = (typeof ratingValues)[number];

type RatingFormValues = {
    rating: string;
};

const RatingRadioGroupField = () => {
    const { control } = useFormContext<RatingFormValues>();

    return (
        <FormField
            control={control}
            name="rating"
            defaultValue="0"
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor="score" className="text-amber-800">
                        Rate your day (-2 to 2)
                    </Label>
                    <FormControl>
                        <RadioGroup
                            {...field}
                            onValueChange={field.onChange}
                            className="mt-1 flex justify-between"
                        >
                            {/* -2 */}
                            <div className="flex flex-col items-center">
                                <UnstyledRadioGroup.Item
                                    value="-2"
                                    id="rating--2"
                                    className={cn(
                                        `mb-1 h-12 w-12 items-center rounded-full bg-amber-900/70 text-white`,
                                        // Checked state
                                        `data-[state=checked]:bg-amber-900 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-900 data-[state=checked]:ring-offset-2`,
                                    )}
                                >
                                    <Label
                                        htmlFor="rating--2"
                                        className="flex cursor-pointer flex-col items-center"
                                    >
                                        <div className={`flex`}>-2</div>
                                    </Label>
                                </UnstyledRadioGroup.Item>
                                <span className="text-amber-800">Terrible</span>
                            </div>

                            {/* -1 */}
                            <div className="flex flex-col items-center">
                                <UnstyledRadioGroup.Item
                                    value="-1"
                                    id="rating--1"
                                    className={cn(
                                        `mb-1 h-12 w-12 items-center rounded-full bg-amber-600/70 text-white`,
                                        // Checked state
                                        `data-[state=checked]:bg-amber-600 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-600 data-[state=checked]:ring-offset-2`,
                                    )}
                                >
                                    <Label
                                        htmlFor="rating--1"
                                        className="flex cursor-pointer flex-col items-center"
                                    >
                                        <div className={`flex`}>-1</div>
                                    </Label>
                                </UnstyledRadioGroup.Item>
                                <span className="text-amber-800">Bad</span>
                            </div>

                            {/* 0 */}
                            <div className="flex flex-col items-center">
                                <UnstyledRadioGroup.Item
                                    value="0"
                                    id="rating-0"
                                    className={cn(
                                        `mb-1 h-12 w-12 items-center rounded-full bg-amber-400/70 text-black`,
                                        // Checked state
                                        `data-[state=checked]:bg-amber-400 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-400 data-[state=checked]:ring-offset-2`,
                                    )}
                                >
                                    <Label
                                        htmlFor="rating-0"
                                        className="flex cursor-pointer flex-col items-center"
                                    >
                                        <div className={`flex`}>0</div>
                                    </Label>
                                </UnstyledRadioGroup.Item>
                                <span className="text-amber-800">Okay</span>
                            </div>

                            {/* 1 */}
                            <div className="flex flex-col items-center">
                                <UnstyledRadioGroup.Item
                                    value="1"
                                    id="rating-1"
                                    className={cn(
                                        `mb-1 h-12 w-12 items-center rounded-full bg-yellow-300/70 text-black`,
                                        // Checked state
                                        `data-[state=checked]:bg-yellow-300 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-300 data-[state=checked]:ring-offset-2`,
                                    )}
                                >
                                    <Label
                                        htmlFor="rating-1"
                                        className="flex cursor-pointer flex-col items-center"
                                    >
                                        <div className={`flex`}>1</div>
                                    </Label>
                                </UnstyledRadioGroup.Item>
                                <span className="text-amber-800">Good</span>
                            </div>

                            {/* 2 */}
                            <div className="flex flex-col items-center">
                                <UnstyledRadioGroup.Item
                                    value="2"
                                    id="rating-2"
                                    className={cn(
                                        `mb-1 h-12 w-12 items-center rounded-full bg-yellow-300/70 text-black`,
                                        // Checked state
                                        `data-[state=checked]:bg-yellow-300 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-300 data-[state=checked]:ring-offset-2`,
                                    )}
                                >
                                    <Label
                                        htmlFor="rating-2"
                                        className="flex cursor-pointer flex-col items-center"
                                    >
                                        <div className={`flex`}>2</div>
                                    </Label>
                                </UnstyledRadioGroup.Item>
                                <span className="text-amber-800">Great</span>
                            </div>
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default RatingRadioGroupField;
