import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../screens/profile/types';

const USER_KEY = 'user';

export const saveUser = async (user: User) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const loginUser = async (username: string, phone: string) => {
  const existing = await getUser();
  if (existing && existing.username === username && existing.phone === phone) {
    const updated = { ...existing, loggedIn: true };
    await saveUser(updated);
    return updated;
  }
  const newUser: User = {
    username,
    phone,
    loggedIn: true,
  };
  await saveUser(newUser);
  return newUser;
};

export const logoutUser = async () => {
  const existing = await getUser();
  if (existing) {
    const updated = { ...existing, loggedIn: false };
    await saveUser(updated);
    return updated;
  }
  return null;
};
