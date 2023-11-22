import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';
import { Button, List, IconButton, Appbar, TouchableRipple } from 'react-native-paper';
import { getClients } from '../storage/Clients';

export function Profile() {
  const [usable, setUsable] = useState(false);
  const [cpf, setCpf] = useState('');
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    if (!usable) {
      setClientData(null);
    }
  }, [usable]);

  const connect = async () => {
    try {
      const clients = await getClients();
      const client = clients.find((c) => c.cpf === cpf);

      if (client) {
        setUsable(true);
        setClientData(client);
      } else {
        Alert.alert('', 'Cliente não encontrado.');
        setUsable(false);
        setClientData(null);
      }
    } catch (error) {
      console.error('Erro ao obter dados do cliente:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} mode='center-aligned'>
        <Appbar.Content title="Meu perfil" />
      </Appbar.Header>

      <View style={styles.pointsBox}>
        <Text style={styles.pointsText}>Pontuação: {clientData?.points.toFixed(1) || 0}</Text>
      </View>

      <TextInput
        style={styles.cpfInput}
        selectionColor={palette.yellow}
        keyboardType='numeric'
        placeholder='Insira seu CPF'
        value={cpf}
        onChangeText={(text) => setCpf(text.replace(/[^0-9]/g, ''))}
        editable={!usable}
      />

      <Button
        style={styles.cpfConnect}
        mode="contained"
        onPress={connect}
      >
        Conferir minha pontuação
      </Button>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ rowGap: 3 }}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        {[
          { title: 'Resgatar prêmios', icon: 'gift-outline', usable: false },
          { title: 'Meus pedidos', icon: 'clipboard-outline', usable: false },
          { title: 'Desconectar', icon: 'logout', usable: usable },
        ].map((item, index) => (
          <TouchableRipple
            key={index}
            style={styles.buttonContainer}
            onPress={() => {
              if (item.usable && item.title === 'Desconectar') {
                setUsable(false);
                setCpf('');
                setClientData(null);
              }
            }}
          >
            <List.Item
              style={styles.buttonItem}
              title={item.title}
              left={() => <List.Icon icon={item.icon} />}
              right={() => <IconButton
                icon={item.usable ? '' : 'lock'}
              />}
            />
          </TouchableRipple>
        ))}
      </ScrollView>
    </View>
  );
}

// Restante do código...


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
    backgroundColor: palette.lightGrey,
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
