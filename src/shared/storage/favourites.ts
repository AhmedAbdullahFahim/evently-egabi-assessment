import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'favourite_events';

export async function getFavourites(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function isFavourite(eventId: string): Promise<boolean> {
  const list = await getFavourites();
  return list.includes(eventId);
}

export async function toggleFavourite(eventId: string): Promise<boolean> {
  const list = await getFavourites();
  const idx = list.indexOf(eventId);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(eventId);
  }
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
  return list.includes(eventId);
}




