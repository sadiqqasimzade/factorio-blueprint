import Dropdown, { DropdownOption } from './Dropdown';

interface QualitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const qualityOptions: DropdownOption[] = Array.from({ length: 6 }, (_, i) => ({
  value: i,
  label: `Quality ${i}`,
  imageSrc: `quality ${i}.webp`,
  imageAlt: `Quality Level ${i}`
}));

const QualitySelector = ({
  value,
  onChange,
  disabled,
  className
}: QualitySelectorProps) => {
  return (
    <Dropdown
      options={qualityOptions}
      value={value}
      onChange={(val) => onChange(Number(val))}
      label="Quality Level"
      imageBasePath="/imgs/entities/"
      disabled={disabled}
      className={className}
    />
  );
};

export default QualitySelector; 