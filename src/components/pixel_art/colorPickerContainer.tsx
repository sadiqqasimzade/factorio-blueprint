import { useColor } from '@/src/contexts/pixelArt/colorContext';
import { memo } from 'react';
import { ColorPicker, IColor } from 'react-color-palette';
import CustomColorPicker from './colorPicker';

type Props = {
    convertTo: "tile" | "lamp" | "platform";
    colors: string[];
};

function ColorPickerContainer({ convertTo, colors }: Props) {
    const { selectedColor, setSelectedColor } = useColor();

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
            color={{ hex: selectedColor } as IColor}
            onChange={(color: IColor) => setSelectedColor(color.hex)}
            hideInput
            hideAlpha
        />
    );
}

export default memo(ColorPickerContainer); 