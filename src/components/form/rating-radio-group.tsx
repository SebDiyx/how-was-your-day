import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

const RatingRadioGroup = () => {
    return (
        <div>
            <Label htmlFor="score" className="text-amber-800">
                Rate your day (-2 to 2)
            </Label>
            <RadioGroup.Root
                id="rating"
                name="rating"
                defaultValue={'0'}
                className="mt-2 flex justify-between"
            >
                {/* -2 */}
                <div className="flex flex-col items-center">
                    <RadioGroup.Item
                        value="-2"
                        className={cn(
                            `mb-1 h-12 w-12 items-center rounded-full bg-amber-900/70 text-white`,
                            // Checked state
                            `data-[state=checked]:bg-amber-900 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-900 data-[state=checked]:ring-offset-2`,
                        )}
                    >
                        <Label
                            htmlFor={`rating--2`}
                            className="flex cursor-pointer flex-col items-center"
                        >
                            <div className={`flex`}>-2</div>
                        </Label>
                    </RadioGroup.Item>
                    <span className="text-amber-800">Terrible</span>
                </div>

                {/* -1 */}
                <div className="flex flex-col items-center">
                    <RadioGroup.Item
                        value="-1"
                        className={cn(
                            `mb-1 h-12 w-12 items-center rounded-full bg-amber-600/70 text-white`,
                            // Checked state
                            `data-[state=checked]:bg-amber-600 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-600 data-[state=checked]:ring-offset-2`,
                        )}
                    >
                        <Label
                            htmlFor={`rating--2`}
                            className="flex cursor-pointer flex-col items-center"
                        >
                            <div className={`flex`}>-1</div>
                        </Label>
                    </RadioGroup.Item>
                    <span className="text-amber-800">Bad</span>
                </div>

                {/* 0 */}
                <div className="flex flex-col items-center">
                    <RadioGroup.Item
                        value="0"
                        className={cn(
                            `mb-1 h-12 w-12 items-center rounded-full bg-amber-400/70 text-black`,
                            // Checked state
                            `data-[state=checked]:bg-amber-400 data-[state=checked]:ring-2 data-[state=checked]:ring-amber-400 data-[state=checked]:ring-offset-2`,
                        )}
                    >
                        <Label
                            htmlFor={`rating-0`}
                            className="flex cursor-pointer flex-col items-center"
                        >
                            <div className={`flex`}>0</div>
                        </Label>
                    </RadioGroup.Item>
                    <span className="text-amber-800">Okay</span>
                </div>

                {/* 1 */}
                <div className="flex flex-col items-center">
                    <RadioGroup.Item
                        value="1"
                        className={cn(
                            `mb-1 h-12 w-12 items-center rounded-full bg-yellow-300/70 text-black`,
                            // Checked state
                            `data-[state=checked]:bg-yellow-300 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-300 data-[state=checked]:ring-offset-2`,
                        )}
                    >
                        <Label
                            htmlFor={`rating-1`}
                            className="flex cursor-pointer flex-col items-center"
                        >
                            <div className={`flex`}>1</div>
                        </Label>
                    </RadioGroup.Item>
                    <span className="text-amber-800">Good</span>
                </div>

                {/* 2 */}
                <div className="flex flex-col items-center">
                    <RadioGroup.Item
                        value="2"
                        className={cn(
                            `mb-1 h-12 w-12 items-center rounded-full bg-yellow-300/70 text-black`,
                            // Checked state
                            `data-[state=checked]:bg-yellow-300 data-[state=checked]:ring-2 data-[state=checked]:ring-yellow-300 data-[state=checked]:ring-offset-2`,
                        )}
                    >
                        <Label
                            htmlFor={`rating-2`}
                            className="flex cursor-pointer flex-col items-center"
                        >
                            <div className={`flex`}>2</div>
                        </Label>
                    </RadioGroup.Item>
                    <span className="text-amber-800">Great</span>
                </div>
            </RadioGroup.Root>
        </div>
    );
};

export default RatingRadioGroup;
