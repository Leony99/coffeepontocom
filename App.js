import { Splash } from './screens/Splash';
import { Home } from './screens/Home';
import { hideAsync } from 'expo-splash-screen';
import { useState } from 'react';

hideAsync();

export default function App() {
  const [splashComplete, setSplashComplete] = useState(false);

  return (
    splashComplete ? <Home></Home> : <Splash onComplete = {setSplashComplete}></Splash>
  );
}