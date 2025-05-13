import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

const options = [
    {
        value: '-2',
        label: 'Terrible',
        bgColor: 'bg-amber-900',
        ringColor: 'ring-amber-900',
        textColor: 'text-white',
    },
    {
        value: '-1',
        label: 'Bad',
        bgColor: 'bg-amber-600',
        ringColor: 'ring-amber-600',
        textColor: 'text-white',
    },
    {
        value: '0',
        label: 'Okay',
        bgColor: 'bg-amber-400',
        ringColor: 'ring-amber-400',
        textColor: 'text-black',
    },
    {
        value: '1',
        label: 'Good',
        bgColor: 'bg-yellow-300',
        ringColor: 'ring-yellow-300',
        textColor: 'text-black',
    },
    {
        value: '2',
        label: 'Great',
        bgColor: 'bg-yellow-300',
        ringColor: 'ring-yellow-300',
        textColor: 'text-black',
    },
];

const RatingRadioGroup = () => {
    return (
        <div>
            <Label htmlFor="score" className="text-amber-800">
                Rate your day (-2 to 2)
            </Label>
            <RadioGroup.Root
                id="rating"
                name="rating"
                defaultValue={options[2].value}
                className="mt-2 flex justify-between"
            >
                {options.map((option) => (
                    <div
                        className="flex flex-col items-center"
                        key={option.value}
                    >
                        <RadioGroup.Item
                            value={option.value}
                            className={cn(
                                `mb-1 h-12 w-12 items-center rounded-full ${option.textColor} ${option.bgColor}/70`,
                                // Checked state
                                `data-[state=checked]:${option.bgColor} data-[state=checked]:ring-2 data-[state=checked]:${option.ringColor} data-[state=checked]:ring-offset-2`,
                            )}
                        >
                            <Label
                                htmlFor={`rating-${option.value}`}
                                className="flex cursor-pointer flex-col items-center"
                            >
                                <div className={`flex`}>{option.value}</div>
                            </Label>
                        </RadioGroup.Item>
                        <span className="text-amber-800">{option.label}</span>
                    </div>
                ))}
            </RadioGroup.Root>
        </div>
    );
};

export default RatingRadioGroup;
