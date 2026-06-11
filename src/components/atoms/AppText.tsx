import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Variant = keyof typeof typography;

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
}

// Atomo de texto: centraliza tipografia y color.
export const AppText: React.FC<Props> = ({
  variant = 'body',
  color = colors.text,
  style,
  ...rest
}) => <Text {...rest} style={[typography[variant], { color }, style]} />;
