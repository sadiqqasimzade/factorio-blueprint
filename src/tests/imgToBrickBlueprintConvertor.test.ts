import { tileColorsArr } from "../consts/colorsEnum"
import imgToBrickBlueprintConvertor from "../utils/convertors/imgToBrickBlueprintConvertor"

describe('imgToBrick test', () => {
    test('imgToBrick', () => {
        expect(JSON.parse(JSON.stringify(imgToBrickBlueprintConvertor(Array<string[]>(5).fill(Array<string>(5).fill(tileColorsArr[0])))))).toEqual(
            {
                "icons": [
                    {
                        "signal": {
                            "type": "virtual",
                            "name": "signal-white"
                        },
                        "index": 1
                    }
                ],
                "entities": [],
                "tiles": [
                    {
                        "position": {
                            "x": 0,
                            "y": 0
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 1,
                            "y": 0
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 2,
                            "y": 0
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 3,
                            "y": 0
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 4,
                            "y": 0
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 0,
                            "y": 1
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 1,
                            "y": 1
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 2,
                            "y": 1
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 3,
                            "y": 1
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 4,
                            "y": 1
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 0,
                            "y": 2
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 1,
                            "y": 2
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 2,
                            "y": 2
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 3,
                            "y": 2
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 4,
                            "y": 2
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 0,
                            "y": 3
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 1,
                            "y": 3
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 2,
                            "y": 3
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 3,
                            "y": 3
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 4,
                            "y": 3
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 0,
                            "y": 4
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 1,
                            "y": 4
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 2,
                            "y": 4
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 3,
                            "y": 4
                        },
                        "name": "concrete"
                    },
                    {
                        "position": {
                            "x": 4,
                            "y": 4
                        },
                        "name": "concrete"
                    }
                ],
                "item": "blueprint",
                "version": 281479276527617
            }
        )
    })
})