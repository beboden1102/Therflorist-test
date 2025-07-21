function submitOrder() {
    const order = {
        id: 'order_' + Date.now(),
        senderName: $('#senderName').val(),
        senderPhone: $('#senderPhone').val(),
        senderEmail: $('#senderEmail').val(),
        receiverName: $('#receiverName').val(),
        receiverPhone: $('#receiverPhone').val(),
        address: $('#address').val(),
        city: $('#city').val(),
        district: $('#district').val(),
        date: $('#date').val(),
        time: $('#time').val(),
        note: $('#note').val(),
        request: $('#request').val(),
        hideSender: $('#hideSender').is(':checked'),
        vat: $('#vat').is(':checked'),
        staffCode: $('#staffCode').val(),
        createdAt: new Date().toISOString().slice(0,10),
        // Thông tin sản phẩm
        productName: $('#productName').val(),
        productPrice: $('#productPrice').val(),
        productQuantity: $('#productQuantity').val(),
        receiverName: $('#receiverName').val(),
        receiverPhone: $('#receiverPhone').val(),
        address: $('#address').val(),
        date: $('#date').val(),
        senderName: $('#senderName').val(),
        senderPhone: $('#senderPhone').val()
    };
    saveOrder(order);
    return order; // trả về object để dùng cho PDF
}