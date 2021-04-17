import * as React from 'react';
import { transparentize } from 'polished';
import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColorBase = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultTextInput
      style={[{
        backgroundColor: transparentize(0.8, backgroundColorBase),
        color,
        marginVertical: 7,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
      }, style]}
      placeholderTextColor={color}
      {...otherProps}
    />
  );
}
