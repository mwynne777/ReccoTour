export interface Event {
    date: Date,
    image: imageInfo,
    info: string,
    name: string,
    priceMax: number,
    priceMin: number,
    timezone: string,
    url: string
};

interface imageInfo {
    height: number,
    ratio: string,
    url: string,
    width: number
}