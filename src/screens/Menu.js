import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Searchbar, Title, Paragraph, Chip, Appbar, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getCategories } from '../storage/Categories';
import { getProducts } from '../storage/Products';

const categories = getCategories();
const Products = getProducts();

export function Menu() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tudo');

  const filteredMenu = Products.filter((item) => {
    const title = item.name.toLowerCase();

    return (
      (item.category === selectedCategory || selectedCategory === 'Tudo') &&
      (title.includes(searchText.toLowerCase()) || searchText === '')
    );
  });

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar} mode='center-aligned'>
        <Appbar.Content title="Cardápio"/>
      </Appbar.Header>

      <Searchbar
        placeholder="Pesquisar"
        onChangeText={(query) => setSearchText(query)}
        value={searchText}
        style={styles.searchBar}
        iconColor={palette.white}
        color={palette.white}
        inputStyle={{height:40, minHeight: 0}}
      />

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryTag}
          >
            {category}
          </Chip>
        ))}
      </View>

      <ScrollView style={styles.scrollView}
      contentContainerStyle={{rowGap: 3}}
      showsVerticalScrollIndicator={false}
      overScrollMode='never'
      >
        {filteredMenu.map((item) => (
          <TouchableRipple key={item.name} style={styles.card}
          onPress={() => navigation.navigate('Product', {item})}>
            <View style={styles.cardContent}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.cardText}>
                <Title style={styles.title} numberOfLines={1}>
                  {item.name}
                </Title>
                <Paragraph style={styles.description} numberOfLines={3}>
                  {item.description}
                </Paragraph>
                <Paragraph style={styles.price}>{`R$${item.price.toFixed(2)}`}</Paragraph>
              </View>
            </View>
          </TouchableRipple>
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
  searchBar: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: palette.lightGrey,
    borderRadius: 5,
    height: 40,
  },
  categoriesContainer: {
    marginTop: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  categoryTag: {
    backgroundColor: palette.lightGrey,
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
  cardText: {
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
  price: {
    fontWeight: 'bold',
    marginVertical: 0,
    marginTop: 'auto',
    fontSize: 16,
    lineHeight: 16,
    color: palette.white,
  },
});