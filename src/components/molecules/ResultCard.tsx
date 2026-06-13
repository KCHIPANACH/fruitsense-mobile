import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../atoms/Card';
import { AppText } from '../atoms/AppText';
import { Prediction } from '../../services/prediction';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';

// Molecula: muestra el resultado (fruta + estado + confianza) o el aviso
// de baja confianza cuando el modelo no reconoce una fruta con seguridad.
export const ResultCard: React.FC<{ result: Prediction }> = ({ result }) => {
  const pct = Math.round(result.confidence * 100);

  // Caso: el modelo no esta seguro (probablemente no es una fruta)
  if (result.lowConfidence) {
    return (
      <Card style={[styles.card, { borderColor: colors.orange }]}>
        <AppText variant="h1">🤔</AppText>
        <AppText variant="h2" color={colors.orange}>No estoy seguro</AppText>
        <AppText color={colors.textMuted} style={styles.center}>
          No reconozco una fruta con seguridad. Probá con una foto más clara y de cerca 📸
        </AppText>
        <AppText variant="caption" color={colors.textMuted}>Confianza: {pct}%</AppText>
      </Card>
    );
  }

  const accent = result.apta ? colors.healthy : colors.rotten;
  return (
    <Card style={[styles.card, { borderColor: accent }]}>
      <View style={[styles.iconCircle, { backgroundColor: accent }]}>
        <AppText variant="h1" color={colors.white}>{result.apta ? '✓' : '✕'}</AppText>
      </View>

      <AppText variant="h2">{result.fruta}</AppText>
      <AppText variant="h2" color={accent}>{result.estado}</AppText>
      <AppText color={colors.textMuted}>
        {result.apta ? 'Apta para comer' : 'No apta para comer'}
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
  center: { textAlign: 'center' },
  iconCircle: {
    width: 72, height: 72, borderRadius: radius.pill,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs,
  },
  barBg: {
    width: '100%', height: 10, borderRadius: radius.pill,
    backgroundColor: colors.border, overflow: 'hidden', marginTop: spacing.sm,
  },
  barFill: { height: '100%', borderRadius: radius.pill },
});
