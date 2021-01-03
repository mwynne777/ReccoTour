export default interface LocalEvent {
    date: Date,
    image: ImageInfo,
    info: string,
    name: string,
    priceMax: number,
    priceMin: number,
    timezone: string,
    url: string,
    venue: string
};

interface ImageInfo {
    height: number,
    ratio: string,
    url: string,
    width: number
}

export const mapTicketmasterEventToLocalEvent = (ticketmasterEvent: any): LocalEvent => {
    const imageInfo: ImageInfo = {
        height: ticketmasterEvent.images[0].height,
        ratio: ticketmasterEvent.images[0].ratio,
        url: ticketmasterEvent.images[0].url,
        width: ticketmasterEvent.images[0].width
    };

    return {
        date: ticketmasterEvent.dates.start.dateTime,
        image: imageInfo,
        info: ticketmasterEvent.info,
        name: ticketmasterEvent.name,
        priceMax: ticketmasterEvent.priceRanges[0].max,
        priceMin: ticketmasterEvent.priceRanges[0].min,
        timezone: ticketmasterEvent.dates.timezone,
        url: ticketmasterEvent.url,
        venue: ticketmasterEvent._embedded.venues[0].name
    };
};