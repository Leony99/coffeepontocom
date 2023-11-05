import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

import { Menu } from '../screens/Menu';
import { Cart } from '../screens/Cart';
import { Profile } from '../screens/Profile';

export function BottomNav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'menu', title: 'Cardápio', unfocusedIcon: 'clipboard-text-outline', focusedIcon: 'clipboard-text' },
    { key: 'cart', title: 'Carrinho', unfocusedIcon: 'cart-outline', focusedIcon: 'cart' },
    { key: 'profile', title: 'Meu perfil', unfocusedIcon: 'account-outline', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    menu: () => <Menu></Menu>,
    cart: () => <Cart></Cart>,
    profile: () => <Profile></Profile>,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{backgroundColor: '#323433'}}
    />
  );
};