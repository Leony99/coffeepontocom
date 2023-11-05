import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput } from 'react-native';
import { Title, Paragraph, Button, Appbar, TouchableRipple } from 'react-native-paper';

//Fazer card clicável => Abir janela para editar quantidade ou excluir produto.

const cartItems = [
  {
    name: 'Produto 1',
    description: 'Descrição do Produto 1',
    price: 5.99,
    quantity: 2,
    image: require('../../assets/cafe.jpg'),
  },
  {
    name: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 9.99,
    quantity: 1,
    image: require('../../assets/cafe.jpg'),
  },
  {
    name: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 9.99,
    quantity: 1,
    image: require('../../assets/cafe.jpg'),
  },
  {
    name: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 9.99,
    quantity: 1,
    image: require('../../assets/cafe.jpg'),
  },
  {
    name: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 9.99,
    quantity: 1,
    image: require('../../assets/cafe.jpg'),
  },
  {
    name: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 9.99,
    quantity: 1,
    image: require('../../assets/cafe.jpg'),
  },
  {
    name: 'Produto 2',
    description: 'Descrição do Produto 2 Descrição do Produto 2 Descrição do Produto 2 Descrição do Produto 2',
    price: 9.99,
    quantity: 1,
    image: require('../../assets/cafe.jpg'),
  },
  // Adicione mais itens ao carrinho conforme necessário
];

export function Cart() {
  const [observation, setObservation] = useState('');

  // Função para calcular o valor total dos itens no carrinho
  const calculateTotal = () => {
    if(cartItems.length == 0) {
      return (0).toFixed(2);
    }
    else {
      return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} mode='center-aligned'>
        <Appbar.Content title="Carrinho"/>
      </Appbar.Header>

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total: R${calculateTotal()}</Text>
      </View>

      <TextInput
        style={styles.observationInput}
        selectionColor={palette.yellow}
        placeholder='Adicione suas observações aqui!'
        multiline={true}
        value={observation}
        onChangeText={(text) => setObservation(text)}
      />

      <Button
        mode="contained"
        style={styles.checkoutButton}
        onPress={() => {}}
      >
        Finalizar Pedido
      </Button>

      {cartItems.length > 0 ? (
        <ScrollView style={styles.scrollView}
        contentContainerStyle={{rowGap: 3}}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
        >
          {cartItems.map((item, index) => (
            <TouchableRipple key={index} style={styles.card} onPress={() => console.log(item.name)}>
              <View style={styles.cardContent}>
                <Image
                  source={item.image}
                  style={styles.image}
                />
                <View style={styles.cardInfo}>
                  <Title style={styles.title} numberOfLines={1}>{item.name}</Title>
                  <Paragraph style={styles.description} numberOfLines={3}>{item.description}</Paragraph>
                  <View style={styles.priceBox}>
                    <Paragraph style={styles.price}>{`R$${item.price.toFixed(2)}`}</Paragraph>
                    <Paragraph style={styles.quantity}>{`Quant: ${item.quantity}`}</Paragraph>
                  </View>
                </View>
              </View>
            </TouchableRipple>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyCartText}>O carrinho está vazio!</Text>
      )}

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
  totalBox: {
    marginTop: 8,
    marginHorizontal: 16,
    height: 40,
    backgroundColor: palette.lightGrey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontWeight: 'bold',
  },
  observationInput: {
    marginTop: 8,
    marginHorizontal: 16,
    minHeight: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.yellow,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: palette.white,
    color: palette.white,
  },
  checkoutButton: {
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
  card: {
    padding: 16,
    borderRadius: 0,
    height: 132,
    backgroundColor: palette.lightGrey,
  },
  cardContent: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  cardInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: 16,
    flex: 1,
  },
  title: {
    marginVertical: 0,
    fontSize: 20,
    lineHeight: 20,
    color: palette.white,
  },
  description: {
    marginVertical: 0,
    marginTop: 4,
    fontSize: 14,
    lineHeight: 14,
    color: palette.white,
  },
  priceBox: {
    marginVertical: 0,
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    marginVertical: 0,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
  },
  quantity: {
    marginVertical: 0,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
  },
  emptyCartText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});
