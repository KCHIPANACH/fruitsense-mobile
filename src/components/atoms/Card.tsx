import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';

// Atomo contenedor con sombra suave y bordes redondeados.
export const Card: React.FC<ViewProps> = ({ style, ...rest }) => (
  <View {...rest} style={[styles.card, style]} />
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: '#1E2A16',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
});
