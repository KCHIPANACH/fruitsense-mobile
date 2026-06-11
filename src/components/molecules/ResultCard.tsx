import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../atoms/Card';
import { AppText } from '../atoms/AppText';
import { Prediction } from '../../services/prediction';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';

// Molecula: muestra el resultado con color, icono y barra de confianza.
export const ResultCard: React.FC<{ result: Prediction }> = ({ result }) => {
  const healthy = result.label === 'Saludable';
  const accent = healthy ? colors.healthy : colors.rotten;
  const pct = Math.round(result.confidence * 100);

  return (
    <Card style={[styles.card, { borderColor: accent }]}>
      <View style={[styles.iconCircle, { backgroundColor: accent }]}>
        <AppText variant="h1" color={colors.white}>{healthy ? '✓' : '✕'}</AppText>
      </View>

      <AppText variant="h2" color={accent}>{result.label}</AppText>
      <AppText color={colors.textMuted}>
        {healthy ? 'Apta para comer' : 'No apta para comer'}
      </AppText>

      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: accent }]} />
      </View>
      <AppText variant="caption" color={colors.textMuted}>Confianza: {pct}%</AppText>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: spacing.sm, borderWidth: 2 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  barBg: {
    width: '100%',
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  barFill: { height: '100%', borderRadius: radius.pill },
});
