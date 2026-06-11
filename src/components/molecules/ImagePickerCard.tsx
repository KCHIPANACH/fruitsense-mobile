import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card } from '../atoms/Card';
import { AppText } from '../atoms/AppText';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';

interface Props {
  imageUri: string | null;
  onPick: (uri: string) => void;
}

// Molecula: tarjeta para elegir/tomar la foto y previsualizarla.
export const ImagePickerCard: React.FC<Props> = ({ imageUri, onPick }) => {
  const fromGallery = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled) onPick(res.assets[0].uri);
  };

  const fromCamera = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;
    const res = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!res.canceled) onPick(res.assets[0].uri);
  };

  return (
    <Card style={styles.card}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <AppText variant="h1">🍎🥦🍓</AppText>
          <AppText color={colors.textMuted}>Elige o toma una foto de la fruta</AppText>
        </View>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={fromCamera}>
          <AppText variant="button" color={colors.green}>📷 Camara</AppText>
        </Pressable>
        <Pressable style={styles.action} onPress={fromGallery}>
          <AppText variant="button" color={colors.orange}>🖼️ Galeria</AppText>
        </Pressable>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  preview: { width: '100%', height: 260, borderRadius: radius.md },
  placeholder: {
    height: 260,
    borderRadius: radius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  action: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
});
