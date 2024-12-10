import { PropsWithChildren, useState } from "react";
import SettingsContext from "./settingsContext";
import { signal_priority } from "@/src/consts/signalsEnum";

const SettingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isAllowedRefinedTiles, setIsAllowedRefinedTiles] = useState<boolean>(true);
    const [quality, setQuality] = useState<number>(1);
    const [blackLampsAllowed, setBlackLampsAllowed] = useState<boolean>(true);
    const [skipInput, setSkipInput] = useState<boolean>(false);
    const [convertTo, setConvertTo] = useState<'lamp' | 'tile'>('lamp');
    const maxWidth = 500;
    const maxWidthForVideo = 200;
    const maxHeight = 500;
    const maxHeightForLamps = signal_priority.length;
    const minWidth = 5;
    const minHeight = 5;
    return (
        <SettingsContext.Provider value={{
            isAllowedRefinedTiles, setIsAllowedRefinedTiles,
            quality, setQuality,
            blackLampsAllowed, setBlackLampsAllowed,
            skipInput, setSkipInput,
            convertTo, setConvertTo,
            maxWidth, maxWidthForVideo, maxHeight, maxHeightForLamps, minWidth, minHeight
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export default SettingProvider;