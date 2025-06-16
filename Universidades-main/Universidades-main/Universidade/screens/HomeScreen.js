import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveFavorite } from '../storage';
import UniversityItem from '../components/UniversityItem';

export default function HomeScreen() {
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [universities, setUniversities] = useState([]);
  const navigation = useNavigation();

  const fetchUniversities = async () => {
    if (!country && !name) return;
    const url = `http://universities.hipolabs.com/search?${country ? `country=${country}` : ''}${country && name ? '&' : ''}${name ? `name=${name}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    setUniversities(data);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome do País" value={country} onChangeText={setCountry} />
      <TextInput style={styles.input} placeholder="Nome da Universidade" value={name} onChangeText={setName} />
      <View style={styles.buttonRow}>
        <Button title="PESQUISAR" onPress={fetchUniversities} />
        <Button title="FAVORITOS" onPress={() => navigation.navigate('Favorites')} />
      </View>
      <FlatList
        data={universities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <UniversityItem
            name={item.name}
            onPress={() => {
              if (item.web_pages?.length) {
                saveFavorite({ name: item.name, url: item.web_pages[0] });
                navigation.navigate('Favorites');
              }
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
});