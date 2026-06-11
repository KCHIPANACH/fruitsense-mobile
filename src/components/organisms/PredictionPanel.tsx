import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePickerCard } from '../molecules/ImagePickerCard';
import { ResultCard } from '../molecules/ResultCard';
import { AppButton } from '../atoms/AppButton';
import { AppText } from '../atoms/AppText';
import { usePrediction } from '../../hooks/usePrediction';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

// Organismo: orquesta seleccion de imagen + analisis + resultado.
export const PredictionPanel: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { loading, result, error, analyze, reset } = usePrediction();

  const onPick = (uri: string) => {
    setImageUri(uri);
    reset();
  };

  return (
    <View style={styles.container}>
      <ImagePickerCard imageUri={imageUri} onPick={onPick} />

      <AppButton
        title={result ? 'Analizar otra vez' : 'Analizar fruta'}
        onPress={() => imageUri && analyze(imageUri)}
        loading={loading}
        disabled={!imageUri}
      />

      {error && <AppText color={colors.rotten}>{error}</AppText>}
      {result && <ResultCard result={result} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
});
