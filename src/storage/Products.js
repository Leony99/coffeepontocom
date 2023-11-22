const products = [
    {
      name: 'Produto 1',
      description: 'Descrição do Produto 1',
      category: 'Pratos Principais',
      price: 5.99,
      image: require('../../assets/cafe.jpg'),
    },
    {
      name: 'Produto 2',
      description: 'Descrição do Produto 2',
      category: 'Pratos Principais',
      price: 9.99,
      image: require('../../assets/cafe.jpg'),
    },
    {
      name: 'Produto 3',
      description: 'Descrição do Produto 3',
      category: 'Sobremesas',
      price: 4.99,
      image: require('../../assets/cafe.jpg'),
    },
    {
      name: 'Produto 4',
      description: 'Descrição do Produto 4',
      category: 'Bebidas',
      price: 2.99,
      image: require('../../assets/cafe.jpg'),
    },
    {
      name: 'Produto 5',
      description: 'Descrição do Produto 5',
      category: 'Cafés/Cappuccinos',
      price: 3.99,
      image: require('../../assets/cafe.jpg'),
    },
];

export function getProducts() {
    return products;
}