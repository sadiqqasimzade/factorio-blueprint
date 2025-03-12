
import { createContext } from 'react';

type SettingsContextProps = {
    isAllowedRefinedTiles: boolean;
    setIsAllowedRefinedTiles: (value: boolean) => void;
    quality: number;
    setQuality: (value: number) => void;
    blackLampsAllowed: boolean;
    setBlackLampsAllowed: (value: boolean) => void;
    skipInput: boolean;
    setSkipInput: (value: boolean) => void;
    convertTo: 'lamp' | 'tile' | 'platform';
    setConvertTo: (value: 'lamp' | 'tile' | 'platform') => void;
    maxWidth: number;
    maxWidthForVideo: number;
    maxHeight: number;
    maxHeightForLamps: number;
    minWidth: number;
    minHeight: number;
};

const SettingsContext = createContext<SettingsContextProps>({
    isAllowedRefinedTiles: true,
    setIsAllowedRefinedTiles: () => { },
    quality: 1,
    setQuality: () => { },
    blackLampsAllowed: true,
    setBlackLampsAllowed: () => { },
    skipInput: false,
    setSkipInput: () => { },
    convertTo: 'lamp',
    setConvertTo: () => { },
    maxWidth: 500,
    maxWidthForVideo: 200,
    maxHeight: 500,
    maxHeightForLamps: 100,
    minWidth: 5,
    minHeight: 5,
});

export default SettingsContext;
