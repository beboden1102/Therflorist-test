// Lưu đơn hàng mới
function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Lấy tất cả đơn hàng
function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

// Xóa đơn hàng theo id
function removeOrder(id) {
    let orders = getOrders().filter(o => o.id !== id);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Chuyển đơn hàng sang đã tư vấn
function markAsConsulted(id) {
    let orders = getOrders();
    let order = orders.find(o => o.id === id);
    if (order) {
        removeOrder(id);
        let consulted = JSON.parse(localStorage.getItem('consultedOrders') || '[]');
        consulted.push(order);
        localStorage.setItem('consultedOrders', JSON.stringify(consulted));
    }
}

// Lấy đơn hàng đã tư vấn
function getConsultedOrders() {
    return JSON.parse(localStorage.getItem('consultedOrders') || '[]');
}


