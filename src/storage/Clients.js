let clients = [];

export function getClients() {
    return clients;
}

export function clientsAdd(client) {
    clients.push(client);
}

export function updateClients(updatedClients) {
    clients = updatedClients;
}