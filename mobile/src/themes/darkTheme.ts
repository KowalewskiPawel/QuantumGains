import {
    MD3LightTheme as DefaultTheme,
  } from 'react-native-paper';

const QuantumGainsDarkScheme = {
    "colors": {
      "primary": "rgb(99, 211, 255)",
      "onPrimary": "rgb(0, 53, 69)",
      "primaryContainer": "rgb(0, 77, 99)",
      "onPrimaryContainer": "rgb(188, 233, 255)",
      "secondary": "rgb(99, 211, 255)",
      "onSecondary": "rgb(0, 53, 69)",
      "secondaryContainer": "rgb(0, 77, 99)",
      "onSecondaryContainer": "rgb(188, 233, 255)",
      "tertiary": "rgb(99, 211, 255)",
      "onTertiary": "rgb(0, 53, 69)",
      "tertiaryContainer": "rgb(0, 77, 99)",
      "onTertiaryContainer": "rgb(188, 233, 255)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(25, 28, 30)",
      "onBackground": "rgb(225, 226, 228)",
      "surface": "rgb(25, 28, 30)",
      "onSurface": "rgb(225, 226, 228)",
      "surfaceVariant": "rgb(64, 72, 76)",
      "onSurfaceVariant": "rgb(192, 200, 205)",
      "outline": "rgb(138, 146, 151)",
      "outlineVariant": "rgb(64, 72, 76)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(225, 226, 228)",
      "inverseOnSurface": "rgb(46, 49, 50)",
      "inversePrimary": "rgb(0, 103, 131)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(29, 37, 41)",
        "level2": "rgb(31, 43, 48)",
        "level3": "rgb(33, 48, 55)",
        "level4": "rgb(34, 50, 57)",
        "level5": "rgb(35, 54, 62)"
      },
      "surfaceDisabled": "rgba(225, 226, 228, 0.12)",
      "onSurfaceDisabled": "rgba(225, 226, 228, 0.38)",
      "backdrop": "rgba(42, 50, 53, 0.4)"
    }
  };
  
  export const darkTheme = {
    ...DefaultTheme,
    colors: QuantumGainsDarkScheme.colors,
  };