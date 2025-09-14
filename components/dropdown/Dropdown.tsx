import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export interface DropdownOption {
  value: string | number;
  label: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  className?: string;
  imageBasePath?: string;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  value,
  onChange,
  label,
  className = '',
  imageBasePath = '',
  disabled = false
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-xl font-bold text-gray-200 mb-1">
          {label}
        </label>
      )}
      <div className={`relative ${className}`}>
        <button
          type="button"
          className={`relative w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-left cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 cursor-pointer'}
            focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <div className="flex items-center">
            {selectedOption?.imageSrc && (
              <div className="shrink-0 mr-2 relative w-6 h-6">
                <Image
                  src={`${imageBasePath}${selectedOption.imageSrc}`}
                  alt={selectedOption.imageAlt || selectedOption.label}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="block truncate">{selectedOption?.label}</span>
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
            <ul
              role="listbox"
              className="max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-700
                    ${option.value === value ? 'bg-gray-700' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex items-center">
                    {option.imageSrc && (
                      <div className="shrink-0 mr-2 relative w-6 h-6">
                        <Image
                          src={`${imageBasePath}${option.imageSrc}`}
                          alt={option.imageAlt || option.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className={`block truncate ${option.value === value ? 'font-semibold' : 'font-normal'}`}>
                      {option.label}
                    </span>
                  </div>

                  {option.value === value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-400">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown; 