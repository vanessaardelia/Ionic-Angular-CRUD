export interface Items {
    id: string;
    category: string;
    model: string;
    brand: string;
    image: string[];
    price: number;
    stock: number;
}

export interface Cpu extends Items {
    baseClock: number;
    boostClock: number;
    coreCount: number;
    threadCount: number;
}

export interface Ram extends Items {
    speed: number;
    size: number;
}

export interface Motherboard extends Items {
    chipset: string;
    processor: string;
}