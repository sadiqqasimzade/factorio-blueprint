import { createContext, ReactNode, useContext, useState } from 'react';

type ColorContextType = {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextType | null>(null);

export function ColorProvider({ children, initialColor }: { children: ReactNode; initialColor: string }) {
    const [selectedColor, setSelectedColor] = useState(initialColor);

    return (
        <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
            {children}
        </ColorContext.Provider>
    );
}

export function useColor() {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColor must be used within a ColorProvider');
    }
    return context;
} 