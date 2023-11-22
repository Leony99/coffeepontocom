import React, { useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import { Appbar, RadioButton, Text, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cartListClear } from '../storage/CartList';
import { getOrders, ordersAdd } from '../storage/Orders';
import { getClients, clientsAdd, updateClients } from '../storage/Clients';

export function ConfirmOrder() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;
  const [paymentOption, setPaymentOption] = useState('dinheiro');
  const [cpf, setCpf] = useState('');

  const handlePaymentOptionChange = (value) => {
    setPaymentOption(value);
  };

  const handleSubmit = () => {
    if (cpf.length !== 11 || isNaN(Number(cpf))) {
      Alert.alert('', 'CPF inválido.');
      return;
    }

    const orders = getOrders();
    if (orders.some(order => order.clientCPF === cpf)) {
    }

    order.paymentOption = paymentOption;
    order.clientCPF = cpf;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    order.date = formattedDate;
    ordersAdd(order);

    const clients = getClients();
    const client = {};
    if (clients.some(checkedClient => checkedClient.cpf === cpf)) {
      updateClients(clients.map(checkedClient => {
        if (checkedClient.cpf === cpf) {
          return {
            ...checkedClient,
            points: checkedClient.points + order.totalPrice * 0.05,
          };
        }
        return checkedClient;
      }));
    } else {
      client.cpf = cpf;
      client.points = order.totalPrice * 0.05;
      clientsAdd(client)
    }

    cartListClear();
    console.log(getOrders())
    console.log(getClients())
    Alert.alert('', 'Pedido enviado.');
    navigation.navigate('BottomNav');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} mode='center-aligned'>
        <Appbar.BackAction onPress={() => navigation.navigate('BottomNav')} />
        <Appbar.Content title="Confirmar Pedido" />
      </Appbar.Header>

      <ScrollView style={styles.orderData}>
        {order.products.map((item) => (
          <View style={styles.productsData}>
            <Text style={styles.orderDataText}>{item.quantity}x {item.name}</Text>
            <Text style={styles.orderDataText}>Valor: R${item.price}</Text>
            <Text style={styles.orderDataText}>Subtotal: R${item.price * item.quantity}</Text>
          </View>

        ))}

        <View style={styles.summary}>
          <Text style={styles.orderDataText}>Preço total: R${order.totalPrice}</Text>
          <Text style={styles.orderDataText}>Observação: {order.observation !== "" ? order.observation : "Nenhuma"}</Text>
          <Text style={styles.orderDataText}>Mesa: {order.table}</Text>
        </View>
      </ScrollView>

      <View style={styles.clientData}>
        <Text style={styles.label}>
            Opção de pagamento:
        </Text>

        <View style={styles.radioButtonContainer}>
            <RadioButton.Group onValueChange={handlePaymentOptionChange} value={paymentOption}>
                <RadioButton.Item label="Dinheiro" value="dinheiro"></RadioButton.Item>
                <RadioButton.Item label="Cartão" value="cartão"></RadioButton.Item>
                <RadioButton.Item label="Pix" value="pix"></RadioButton.Item>
            </RadioButton.Group>
        </View>

        <Text style={styles.label}>
            Informe seu CPF (somente números):
        </Text>

        <TextInput
            style={styles.input}
            placeholder='Insira seu CPF aqui!'
            keyboardType='numeric'
            value={cpf}
            onChangeText={(text) => setCpf(text.replace(/[^0-9]/g, ''))}
        />

        <Button
            mode="contained"
            style={styles.button}
            onPress={handleSubmit}
        >
            Confirmar Pedido
        </Button>
      </View>
    </View>
  );
};

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
  },
  appBar: {
    backgroundColor: palette.darkGrey,
  },
  orderData: {
    backgroundColor: palette.lightGrey,
  },
  productsData: {
    marginBottom: 16,
  },
  clientData: {
    paddingHorizontal: 16,
    backgroundColor: palette.darkGrey,
  },
  label: {
    marginTop: 16,
    fontSize: 16,
  },
  radioButtonContainer: {
    marginTop: 8,
    marginLeft: 0,
  },
  input: {
    marginTop: 16,
    minHeight: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.yellow,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: palette.white,
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    height: 40,
    borderRadius: 5,
    backgroundColor: palette.yellow,
  },
});