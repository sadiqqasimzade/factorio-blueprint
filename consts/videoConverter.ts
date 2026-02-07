export type QualityTier = {
    name: string;
    value: number;
    imagePath: string;
    label: string;
};

export const QUALITY_TIERS: QualityTier[] = [
    { name: "none", value: 0, imagePath: "/imgs/entities/quality 0.webp", label: "Quality 0" },
    { name: "common", value: 18, imagePath: "/imgs/entities/quality 1.webp", label: "Quality 1" },
    { name: "uncommon", value: 20, imagePath: "/imgs/entities/quality 2.webp", label: "Quality 2" },
    { name: "rare", value: 22, imagePath: "/imgs/entities/quality 3.webp", label: "Quality 3" },
    { name: "epic", value: 24, imagePath: "/imgs/entities/quality 4.webp", label: "Quality 4" },
    { name: "legendary", value: 28, imagePath: "/imgs/entities/quality 5.webp", label: "Quality 5" }
];
