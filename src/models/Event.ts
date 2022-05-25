export default interface LocalEvent {
  date: Date;
  image: ImageInfo;
  info: string;
  name: string;
  priceMax: number;
  priceMin: number;
  timezone: string;
  url: string;
  venue: Venue;
}

interface ImageInfo {
  height: number;
  ratio: string;
  url: string;
  width: number;
}

interface Venue {
  name: string;
  cityAndState: string;
}

export const mapTicketmasterEventToLocalEvent = (
  ticketmasterEvent: any
): LocalEvent => {
  const image: ImageInfo = {
    height: ticketmasterEvent.images[0].height,
    ratio: ticketmasterEvent.images[0].ratio,
    url: ticketmasterEvent.images[0].url,
    width: ticketmasterEvent.images[0].width,
  };

  const venue: Venue = {
    name: ticketmasterEvent._embedded.venues[0].name,
    cityAndState: `${ticketmasterEvent._embedded.venues[0].city.name}, ${ticketmasterEvent._embedded.venues[0].state.stateCode}`,
  };

  return {
    date: ticketmasterEvent.dates.start.dateTime,
    image,
    info: ticketmasterEvent.info,
    name: ticketmasterEvent.name,
    priceMax: ticketmasterEvent.priceRanges?.[0]?.max ?? 0,
    priceMin: ticketmasterEvent.priceRanges?.[0]?.min ?? 0,
    timezone: ticketmasterEvent.dates.timezone,
    url: ticketmasterEvent.url,
    venue,
  };
};
