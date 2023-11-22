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

export function cartListEditQuantity(index, newQuantity) {
  if (index >= 0 && index < cartList.length) {
    newQuantity = Math.max(0, newQuantity);
    cartList[index].quantity = newQuantity;
  }
}

export function cartListClear() {
  cartList = [];
}