const orders = [];

export function getOrders() {
    return orders;
}

export function ordersAdd(order) {
    orders.push(order);
}