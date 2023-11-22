import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from './src/screens/Splash';
import { BottomNav } from './src/components/BottomNav';
import { Product } from './src/screens/Product';
import { QRCodeScanner } from './src/screens/QRCodeScanner';
import { ConfirmOrder } from './src/screens/ConfirmOrder';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    primary: "#323433",
    onPrimary: '#ffffff',
    primaryContainer: '#ffffff',
    onPrimaryContainer: '#ffffff',
    secondary: "#414141",
    onSecondary: "#ffffff",
    secondaryContainer: "#414141",
    onSecondaryContainer: "#ffffff",
    tertiary: "#ffb738",
    onTertiary: "#ffffff",
    tertiaryContainer: "#ffffff",
    onTertiaryContainer: "#ffffff",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 27)",
    onBackground: "rgb(224, 227, 225)",
    surface: "rgb(25, 28, 27)",
    onSurface: "rgb(224, 227, 225)",
    surfaceVariant: "rgb(63, 73, 70)",
    onSurfaceVariant: "rgb(190, 201, 197)",
    outline: "rgb(137, 147, 143)",
    outlineVariant: "rgb(63, 73, 70)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(224, 227, 225)",
    inverseOnSurface: "rgb(46, 49, 48)",
    inversePrimary: "rgb(0, 107, 91)",
    elevation: {
      level0: "transparent",
      level1: "rgb(28, 38, 35)",
      level2: "rgb(30, 43, 40)",
      level3: "rgb(32, 49, 45)",
      level4: "rgb(33, 51, 47)",
      level5: "rgb(34, 55, 50)"
    },
    surfaceDisabled: "rgba(224, 227, 225, 0.12)",
    onSurfaceDisabled: "rgba(224, 227, 225, 0.38)",
    backdrop: "rgba(41, 50, 48, 0.4)"
  }
};

export default function App() {

  const [showHome, setShowHome] = useState(false);

  function handleSplashComplete() {
    setShowHome(true);
  }

  return showHome
  ?
  <PaperProvider theme={theme}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }}/>
          <Stack.Screen name="Product" component={Product} options={{ headerShown: false }}/>
          <Stack.Screen name="QRScan" component={QRCodeScanner} options={{ headerShown: false }}/>
          <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </PaperProvider>
  : <Splash onComplete={handleSplashComplete} />;
}