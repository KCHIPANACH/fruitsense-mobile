import React from 'react';
import { Pressable, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { AppText } from './AppText';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

// Atomo boton con gradiente verde -> naranja (identidad FruitSense).
export const AppButton: React.FC<Props> = ({ title, onPress, loading, disabled, style }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    style={({ pressed }) => [{ opacity: pressed || disabled ? 0.8 : 1 }, style]}
  >
    <LinearGradient
      colors={[colors.green, colors.orange]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.btn}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <AppText variant="button" color={colors.white}>
          {title}
        </AppText>
      )}
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
});
