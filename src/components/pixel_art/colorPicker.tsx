type Props = {
    selectedColor: string,
    setColor: React.Dispatch<React.SetStateAction<string>>,
    colors: string[]
}

export default function ColorPicker({ selectedColor, setColor, colors }: Props) {
    return (
        <div className="flex place-content-center flex-wrap gap-5 mt-5 bg-gray-600 bg-opacity-60 p-5 rounded-2xl">
            {colors.map((color, index) =>
                <div className={`w-8 h-8 rounded-full cursor-pointer transition-all outline hover:outline-white hover:outline-4 ${color === selectedColor && 'outline-4 scale-150 outline-white'}`} style={{ backgroundColor: `#${color}` }} key={index}
                    onClick={() => { color !== selectedColor && setColor(color) }}>
                </div>
            )}
        </div>
    )
}
