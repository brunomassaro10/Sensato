import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getFavorites, removeFavorite } from '../storage';
import { useIsFocused } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getFavorites().then(setFavorites);
    }
  }, [isFocused]);

  const handleRemove = async (url) => {
    await removeFavorite(url);
    setFavorites(await getFavorites());
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemove(item.url)} style={styles.item}>
            <Text>{item.url}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { borderWidth: 1, padding: 10, marginVertical: 5 },
});