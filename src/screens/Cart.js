import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { Title, Paragraph, Button, Appbar, TouchableRipple, Modal, Portal, IconButton } from 'react-native-paper';
import { getCartList, cartListExclude, cartListEditQuantity } from '../storage/CartList';
import { useNavigation } from '@react-navigation/native';

export function Cart() {
  const navigation = useNavigation();
  const [observation, setObservation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const calculateTotal = () => {
    if(getCartList().length == 0) {
      return (0).toFixed(2);
    }
    else {
      return getCartList().reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  };

  const openModal = (index) => {
    setModalVisible(true);
    setSelectedItemIndex(index);
    setQuantity(getCartList()[index].quantity);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItemIndex(null);
    setQuantity(null);
  };

  const decreaseQuantity = () => {
    if (selectedItemIndex !== null) {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const increaseQuantity = () => {
    if (selectedItemIndex !== null) {
      setQuantity(quantity + 1);
    }
  };

  const editItemQuantity = () => {
    if (selectedItemIndex !== null) {
      cartListEditQuantity(selectedItemIndex, quantity);
      closeModal();
    }
  }

  const removeItemFromCart = () => {
    if (selectedItemIndex !== null) {
      cartListExclude(selectedItemIndex);
      closeModal();
    }
  };

  const handleCheckout = () => {
    if (getCartList().length === 0) {
      Alert.alert('', 'O carrinho está vazio.');
    } else {
      const order = {
        products: getCartList(),
        totalPrice: calculateTotal(),
        observation: observation,
      };
      //Correct = navigation.navigate('QRScan', { order });
      navigation.navigate('ConfirmOrder', { order });
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
        onPress={() => {handleCheckout()}}
      >
        Finalizar Pedido
      </Button>

      {getCartList().length > 0 ? (
        <ScrollView style={styles.scrollView}
        contentContainerStyle={{rowGap: 3}}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
        >
          {getCartList().map((item, index) => (
            <TouchableRipple key={index} style={styles.card} onPress={() => openModal(index)}>
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

      <Portal>
        <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
          <Title style={styles.modalTitle}>{selectedItemIndex !== null ? getCartList()[selectedItemIndex].name : ''}</Title>
          <View style={styles.modalLine}></View>
          <View style={styles.modalQuantityContainer}>
            <IconButton
              mode='outlined'
              icon='minus'
              iconColor='white'
              size={16}
              onPress={decreaseQuantity}
            />
            <Title style={styles.modalQuantity}>{quantity}</Title>
            <IconButton
              mode='outlined'
              icon='plus'
              iconColor='white'
              size={16}
              onPress={increaseQuantity}
            />
          </View>
          <Button mode="contained" style={styles.modalBtn} onPress={editItemQuantity}>Alterar quantidade</Button>
          <View style={styles.modalLine}></View>
          <Button mode="contained" style={{...styles.modalBtn, backgroundColor: '#FF0000'}} onPress={removeItemFromCart}>Remover do carrinho</Button>
        </Modal>
      </Portal>

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
    backgroundColor: palette.lightGrey,
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
  modalContainer: {
    margin: 50,
    backgroundColor: palette.lightGrey,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalTitle: {
    marginVertical: 16,
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalLine: {
    height: 1,
    backgroundColor: palette.white,
    alignSelf: 'stretch',
  },
  modalQuantityContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalQuantity: {
    marginVertical: 0,
    marginHorizontal: 24,
    fontSize: 24,
    color: palette.white,
  },
  modalBtn: {
    marginVertical: 16,
    width: "100%",
    height: 40,
    borderRadius: 5,
    color: palette.white,
    backgroundColor: '#ffb738',
  },
});
