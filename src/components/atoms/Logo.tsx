import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { colors } from '../../theme/colors';

// Atomo del logotipo: 'Fruit' verde + 'Sense' naranja + hoja.
export const Logo: React.FC = () => (
  <View style={styles.row}>
    <AppText variant="h1" color={colors.green}>Fruit</AppText>
    <AppText variant="h1" color={colors.orange}>Sense</AppText>
    <AppText variant="h1" color={colors.green}>{'  '}</AppText>
    <AppText variant="h1">🍃</AppText>
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
