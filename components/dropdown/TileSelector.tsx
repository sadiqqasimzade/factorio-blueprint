import { TileNames } from '@/consts/enums';
import Dropdown, { DropdownOption } from './Dropdown';

interface TileSelectorProps {
  value: TileNames | null;
  onChange: (value: TileNames | null) => void;
  disabled?: boolean;
  className?: string;
}

// Map enum values to more readable display names
const displayNames: Record<TileNames, string> = {
  [TileNames.CONCRETE]: 'Concrete',
  [TileNames.STONE_PATH]: 'Stone Path',
  [TileNames.HAZARD_CONCRETE_LEFT]: 'Hazard Concrete',
  [TileNames.REFINED_CONCRETE]: 'Refined Concrete',
  [TileNames.REFINED_HAZARD_CONCRETE_LEFT]: 'Refined Hazard Concrete',
  [TileNames.SPACE_PLATFORM_FOUNDATION]: 'Space Platform'
};

// Map enum values to image filenames
const imageNames: Record<TileNames, string> = {
  [TileNames.CONCRETE]: 'concrete.webp',
  [TileNames.STONE_PATH]: 'stone-path.webp',
  [TileNames.HAZARD_CONCRETE_LEFT]: 'hazard-concrete.webp',
  [TileNames.REFINED_CONCRETE]: 'refined-concrete.webp',
  [TileNames.REFINED_HAZARD_CONCRETE_LEFT]: 'refined-hazard-concrete.webp',
  [TileNames.SPACE_PLATFORM_FOUNDATION]: 'space-platform.webp'
};

const tileOptions: DropdownOption[] = [
  {
    value: 'none',
    label: 'No Background',
    imageAlt: 'No Background'
  },
  ...Object.values(TileNames).map(tile => ({
    value: tile,
    label: displayNames[tile],
    imageSrc: imageNames[tile],
    imageAlt: `${displayNames[tile]} Tile`
  }))
];

const TileSelector = ({
  value,
  onChange,
  disabled,
  className
}: TileSelectorProps) => {
  return (
    <Dropdown
      options={tileOptions}
      value={value === null ? 'none' : value}
      onChange={(val) => onChange(val === 'none' ? null : val as TileNames)}
      label="Background Tile"
      imageBasePath="/imgs/tiles/"
      disabled={disabled}
      className={className}
    />
  );
};

export default TileSelector; 