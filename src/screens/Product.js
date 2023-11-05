import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Title, Paragraph, Button, IconButton, Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

//Pegar dados do produto
//Criar funcionalidade de adicionar ao carrinho

export function Product() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  
  const [price, setPrice] = useState(parseFloat(item.price));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setPrice(parseFloat(item.price) * quantity);
  }, [quantity]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} mode='center-aligned'>
        <Appbar.BackAction onPress={() => navigation.navigate('BottomNav')} />
      </Appbar.Header>
      <View style={styles.productCard} elevation={3}>
        <Image source={item.image} style={styles.productImage} />
        <Title style={styles.productName}>
          {item.name}
        </Title>
        <Paragraph style={styles.productDescription}>
          {item.description}
        </Paragraph>
        <Paragraph style={styles.productPrice}>
          R$ {price.toFixed(2)}
        </Paragraph>
      </View>

      <View style={styles.quantityContainer}>
        <IconButton
          mode='outlined'
          icon='minus'
          iconColor='white'
          size={16}
          onPress={decreaseQuantity}
        />
        <Title style={styles.quantity}>{quantity}</Title>
        <IconButton
          mode='outlined'
          icon='plus'
          iconColor='white'
          size={16}
          onPress={increaseQuantity}
        />
      </View>

      <Button
        mode='contained'
        style={styles.addToCartButton}
        labelStyle={{fontSize: 18}}
        textColor='white'
        onPress={() => {
          // Ação ao adicionar ao carrinho
        }}
      >
        Adicionar ao carrinho
      </Button>

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
    display: 'flex',
    justifyContent: 'flex-start',
  },
  appBar: {
    height: 'min-content',
    height: 44,
    paddingVertical: 8,
    backgroundColor: palette.darkGrey,
  },
  productCard: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: palette.lightGrey,
    borderRadius: 20,
    justifyContent: 'flex-start',
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  productName: {
    marginTop: 30,
    marginHorizontal: 30,
    fontSize: 28,
    lineHeight: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: palette.white,

  },
  productDescription: {
    marginVertical: 30,
    marginHorizontal: 30,
    fontSize: 18,
    lineHeight: 18,
    color: palette.white,
  },
  productPrice: {
    marginBottom: 30,
    marginHorizontal: 30,
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: palette.white,
  },
  quantityContainer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginVertical: 0,
    marginHorizontal: 24,
    fontSize: 24,
    color: palette.white,
  },
  addToCartButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginHorizontal: 16,
    borderRadius: 5,
    backgroundColor: palette.yellow,
  },
});
