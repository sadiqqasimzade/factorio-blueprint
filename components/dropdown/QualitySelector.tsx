import { QUALITY_TIERS } from '@/consts/videoConverter';
import Dropdown, { DropdownOption } from './Dropdown';

interface QualitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const qualityOptions: DropdownOption[] = QUALITY_TIERS.map((tier, i) => ({
  value: i,
  label: tier.label,
  imageSrc: tier.imagePath.replace('/imgs/entities/', ''), // Dropdown appends basePath
  imageAlt: tier.label
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