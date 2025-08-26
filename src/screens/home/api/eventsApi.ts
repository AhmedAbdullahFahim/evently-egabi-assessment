export type SearchParams = { keyword: string; city: string };

const TICKETMASTER_API_KEY = 'FRAAZedtkO10jbB1S4Aozq2B7p3sw1Ib';

export const buildSearchUrl = ({ keyword, city }: SearchParams) => {
  const url = new URL(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}`,
  );
  if (keyword) url.searchParams.append('keyword', keyword);
  if (city) url.searchParams.append('city', city);
  // Limit size to keep results predictable
  url.searchParams.append('size', '30');
  return url.toString();
};

const mapTicketmaster = (e: any) => {
  const venue = e._embedded?.venues?.[0];
  const image = e.images?.[0]?.url;
  const lat = venue?.location?.latitude
    ? Number(venue.location.latitude)
    : venue?.latitude
    ? Number(venue.latitude)
    : undefined;
  const lon = venue?.location?.longitude
    ? Number(venue.location.longitude)
    : venue?.longitude
    ? Number(venue.longitude)
    : undefined;
  return {
    id: e.id,
    title: e.name,
    datetime_utc: e.dates?.start?.dateTime,
    venue: {
      name: venue?.name,
      city: venue?.city?.name,
      location: { lat, lon },
    },
    performers: [],
    location: { lat, lon },
    url: e.url,
    type: e.type,
    short_title: e.name,
    stats: undefined,
    description: e.info || e.pleaseNote || '',
    images: image ? [image] : [],
  };
};

export async function searchEvents(
  params: SearchParams,
): Promise<any[] | undefined> {
  try {
    const response = await fetch(buildSearchUrl(params));
    if (!response.ok) throw response;
    const json = await response.json();
    console.log('json', json);
    const events = json._embedded?.events || [];
    return events.map(mapTicketmaster);
  } catch (err: any) {
    console.log('error', err);
  }
}

export async function fetchEventById(
  eventId: string,
): Promise<any | undefined> {
  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${TICKETMASTER_API_KEY}`;
    const response = await fetch(url);
    console.log('event id', eventId);
    if (!response.ok) throw response;
    const json = await response.json();
    console.log('event json', json);

    return mapTicketmaster(json);
  } catch (e) {
    console.log('error', e);
  }
}
