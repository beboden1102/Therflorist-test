function renderOrders() {
    const keyword = $('#search-box').val()?.trim().toLowerCase() || '';
    const orders = getOrders();
    // Nhóm theo ngày
    const grouped = {};
    orders.forEach(o => {
        // Lọc theo tên người nhận, người gửi, SĐT người nhận, SĐT người gửi
        const receiverName = (o.receiverName || '').toLowerCase();
        const senderName = (o.senderName || '').toLowerCase();
        const senderPhone = (o.senderPhone || '').toLowerCase();
        const receiverPhone = (o.receiverPhone || '').toLowerCase();
        if (
            !keyword ||
            receiverName.includes(keyword) ||
            senderName.includes(keyword) ||
            senderPhone.includes(keyword) ||
            receiverPhone.includes(keyword)
        ) {
            if (!grouped[o.createdAt]) grouped[o.createdAt] = [];
            grouped[o.createdAt].push(o);
        }
    });
    let html = '';
    Object.keys(grouped).sort((a,b) => b.localeCompare(a)).forEach(date => {
        html += `<h3 class="text-center">${date}</h3>
        <div class="d-flex justify-content-center">
        <table border="1" cellpadding="6" style="width:100%;margin-bottom:20px;" class="table table-bordered table-striped text-center align-middle mx-auto">
            <tr>
                <th>Người gửi</th>
                <th>Điện thoại</th>
                <th>Người nhận</th>
                <th>Địa chỉ</th>
                <th>Tên SP</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thao tác</th>
            </tr>`;
        grouped[date].forEach(o => {
            html += `<tr>
                <td>${o.senderName}</td>
                <td>${o.senderPhone}</td>
                <td>${o.receiverName}</td>
                <td>${o.address}</td>
                <td>${o.productName || ''}</td>
                <td>${o.productPrice || ''}</td>
                <td>${o.productQuantity || ''}</td>
                <td class="d-flex gap-1 justify-content-center">
                      <button class="btn btn-success btn-sm" onclick="markAsConsulted('${o.id}');renderOrders();">Đã tư vấn</button>
                    <button class="btn btn-warning btn-sm" onclick="showCancelModal('${o.id}');">Cancel</button>
                    <button class="btn btn-info btn-sm" onclick="showOrderDetail('${o.id}');">Thông tin chi tiết</button>
                </td>
            </tr>`;
        });
        html += `</table></div>`;
    });
    $('#orders-list').html(html || '<i>Không có đơn hàng nào.</i>');
}