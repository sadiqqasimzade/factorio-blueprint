import { Versions } from "../consts/enums";
import Blueprint from "./Blueprint";

export default class BlueprintBook {
    blueprint_book: {
        blueprints: {
            blueprint: Blueprint
            index: number
        }[]
    }
    item: string
    active_index: number
    version: number
    constructor(blueprints: Blueprint[]) {
        this.item = "blueprint-book";
        this.version = Versions.LATEST;
        this.active_index = 1
        this.blueprint_book = {
            blueprints: (() => {
                const obj: {
                    blueprint: Blueprint
                    index: number
                }[] = []
                blueprints.forEach((blueprint, index) =>
                    obj.push({ blueprint: blueprint, index: index })
                )
                return obj
            })()
        }
    }
}
