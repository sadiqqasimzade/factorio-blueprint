import { useState } from 'react';

type Props<T extends string | number> = {
    options: T[];
    selectedOption: T;
    setSelectedOption: (option: T) => void;
}

export default function Dropdown<T extends string | number>({ options, selectedOption, setSelectedOption }: Props<T>) {
    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: T) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="flex justify-center min-h-screen">
            <div className="relative inline-block text-left">
                <button
                    type="button"
                    className="inline-flex justify-center w-full
                               rounded-md border border-gray-300
                               shadow-sm px-4 py-2 bg-white text-sm
                               font-medium text-black hover:bg-gray-50"
                    onClick={toggleDropdown}
                >
                    {selectedOption}
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute
                                    right-0 mt-2 w-56 rounded-md
                                    shadow-lg bg-white ring-1 ring-black
                                    ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {options.map((option, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="block px-4 py-2
                                               text-sm text-black
                                               hover:bg-gray-100"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}