import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Logo } from "../atoms/Logo";
import { AppText } from "../atoms/AppText";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

// Template: layout general (header + contenido + disclaimer).
export const MainTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <SafeAreaView style={styles.safe}>
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Logo />
        <AppText color={colors.textMuted}>
          Tu fruta esta fresca? Descubrelo con IA
        </AppText>
      </View>

      {children}

      <AppText
        variant="caption"
        color={colors.textMuted}
        style={styles.disclaimer}
      >
        Herramienta academica. No reemplaza la inspeccion profesional de
        alimentos.
      </AppText>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, gap: spacing.xl, paddingBottom: spacing.xxl },
  header: { alignItems: "center", gap: spacing.xs, marginTop: spacing.md },
  disclaimer: { textAlign: "center", marginTop: spacing.md },
});
