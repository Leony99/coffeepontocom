let cartList = [];

export function getCartList() {
  return cartList;
}

export function cartListAdd(product) {
  cartList.push(product);
}

export function cartListExclude(index) {
  if (index >= 0 && index < cartList.length) {
    cartList.splice(index, 1);
  }
}