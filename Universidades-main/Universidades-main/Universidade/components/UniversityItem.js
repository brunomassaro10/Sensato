import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function UniversityItem({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: { borderWidth: 1, padding: 10, marginVertical: 5 },
});