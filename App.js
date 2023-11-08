import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from './src/screens/Splash';
import { BottomNav } from './src/components/BottomNav';
import { Product } from './src/screens/Product';

const Stack = createStackNavigator();

export default function App() {

  const [showHome, setShowHome] = useState(false);

  function handleSplashComplete() {
    setShowHome(true);
  }

  return showHome
  ?
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }}/>
        <Stack.Screen name="Product" component={Product} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  : <Splash onComplete={handleSplashComplete} />;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }}/>
          <Stack.Screen name="Product" component={Product} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>)
}