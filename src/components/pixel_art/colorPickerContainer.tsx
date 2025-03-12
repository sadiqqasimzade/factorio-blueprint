import { useColor } from '@/src/contexts/pixelArt/colorContext';
import { memo, useMemo } from 'react';
import { ColorPicker, ColorService, IColor } from 'react-color-palette';
import "react-color-palette/css";
import CustomColorPicker from './colorPicker';

type Props = {
    convertTo: "tile" | "lamp" | "platform";
    colors: string[];
};

function ColorPickerContainer({ convertTo, colors }: Props) {
    const { selectedColor, setSelectedColor } = useColor();
    // Use useMemo to derive paletteColor from selectedColor
    const paletteColor = useMemo(() => ColorService.convert("hex", "#" + selectedColor), [selectedColor]);

    if (convertTo === "tile") {
        return (
            <CustomColorPicker 
                selectedColor={selectedColor} 
                setColor={setSelectedColor} 
                colors={colors} 
            />
        );
    }

    return (
        <ColorPicker
            color={paletteColor}
            onChange={(color: IColor) => setSelectedColor(color.hex.substring(1))}
            hideAlpha
        />
    );
}

export default memo(ColorPickerContainer); 