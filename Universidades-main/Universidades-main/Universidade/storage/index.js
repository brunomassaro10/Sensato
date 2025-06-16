import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorite = async (university) => {
  const current = await getFavorites();
  const updated = [...current, university];
  await AsyncStorage.setItem('favorites', JSON.stringify(updated));
};

export const getFavorites = async () => {
  const data = await AsyncStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
};

export const removeFavorite = async (url) => {
  const current = await getFavorites();
  const updated = current.filter(item => item.url !== url);
  await AsyncStorage.setItem('favorites', JSON.stringify(updated));
};