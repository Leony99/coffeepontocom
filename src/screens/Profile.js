import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Button, List, IconButton, Appbar, TouchableRipple } from 'react-native-paper';

//Conectar cpf ao perfil no database
//Fazer páginas dos botões

export function Profile() {
  const [usable, setUsable] = React.useState(false);

  const toggleUsable = () => {
    setUsable(!usable);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} mode='center-aligned'>
        <Appbar.Content title="Meu perfil" />
      </Appbar.Header>

      <View style={styles.pointsBox}>
        <Text style={styles.pointsText}>Pontuação: 0</Text>
      </View>

      <TextInput
        style={styles.cpfInput}
        selectionColor={palette.yellow}
        placeholder='Insira seu CPF'
      />

      <Button
        style={styles.cpfConnect}
        mode="contained"
        onPress={toggleUsable}
      >
        Conferir meu perfil
      </Button>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ rowGap: 3 }}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        {[
          { title: 'Resgatar prêmios', icon: 'gift-outline', usable:false },
          { title: 'Meus pedidos', icon: 'clipboard-outline', usable:usable},
          { title: 'Formas de pagamento', icon: 'credit-card-outline', usable:usable },
          { title: 'Desconectar', icon: 'logout', usable:usable },
        ].map((item, index) => (item.usable ? (
            <TouchableRipple
              key={index}
              style={styles.buttonContainer}
              onPress={() => console.log(item.title)}
            >
              <List.Item
                style={styles.buttonItem}
                title={item.title}
                left={() => <List.Icon icon={item.icon} />}
                right={() => <IconButton icon={'chevron-right'}/>}
              />
            </TouchableRipple>
          ) : (
            <View
              key={index}
              style={styles.buttonContainer}
            >
              <List.Item
                style={styles.buttonItem}
                title={item.title}
                left={() => <List.Icon icon={item.icon} />}
                right={() => <IconButton disabled={!item.usable} icon={'lock'}/>}
              />
            </View>
          )
        ))}
      </ScrollView>
    </View>
  );
}

const palette = {
  darkGrey: '#323433', // Primary
  lightGrey: '#414141', // Secondary
  white: '#ffffff', // Text
  yellow: '#ffb738', // Details
  brown: '#8a4f12', // Details
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.darkGrey,
  },
  appBar: {
    height: 0,
    backgroundColor: palette.darkGrey,
  },
  pointsBox: {
    marginTop: 8,
    marginHorizontal: 16,
    height: 40,
    backgroundColor: palette.lightGrey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    fontWeight: 'bold',
  },
  cpfInput: {
    marginTop: 8,
    marginHorizontal: 16,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.yellow,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: palette.white,
    color: palette.white,
  },
  cpfConnect: {
    marginTop: 8,
    marginHorizontal: 16,
    height: 40,
    borderRadius: 5,
    backgroundColor: palette.yellow,
  },
  scrollView: {
    marginTop: 8,
    backgroundColor: palette.darkGrey,
  },
  buttonContainer: {
    backgroundColor: palette.lightGrey,
  },
  buttonItem: {
    paddingVertical: 0,
    paddingLeft: 16,
    paddingRight: 0,
  },
});
