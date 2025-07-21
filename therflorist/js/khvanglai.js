$('.modal-content').on('submit', function(e) {
    e.preventDefault();
    const phone = $('#modalPhone').val().trim();
    const event = $('#modalEvent').val();
    if (!phone || !event) return;
    // Lưu vào localStorage
    let vanglai = JSON.parse(localStorage.getItem('vanglai') || '[]');
    vanglai.push({
        id: Date.now(),
        phone,
        event,
        status: 'pending' // chưa xử lý
    });
    localStorage.setItem('vanglai', JSON.stringify(vanglai));
    // alert('Cảm ơn quý khách đã để lại thông tin!');
    var toast = new bootstrap.Toast(document.getElementById('successToast'));
    toast.show();
    $('#hoamodal').modal('hide');
    this.reset();
});



function renderVangLai() {
    let vanglai = JSON.parse(localStorage.getItem('vanglai') || '[]');
    const keyword = $('#search-box').val()?.trim().toLowerCase() || '';
    let html = '';
    vanglai
        .filter(item =>
            !keyword ||
            (item.phone && item.phone.toLowerCase().includes(keyword))
        )
        .forEach(item => {
            html += `<tr>
                <td>${item.phone}</td>
                <td>${item.event}</td>
                <td>
                    <span class="badge ${item.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}">
                        ${item.status === 'pending' ? 'Chưa xử lý' : 'Đã xử lý'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="updateStatus(${item.id})">Cập nhật trạng thái</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteVangLai(${item.id})">Xóa</button>
                </td>
            </tr>`;
        });
    $('#vanglaiTable tbody').html(html || '<tr><td colspan="4">Không có dữ liệu</td></tr>');
}

function updateStatus(id) {
    let vanglai = JSON.parse(localStorage.getItem('vanglai') || '[]');
    vanglai = vanglai.map(item => {
        if (item.id === id) item.status = (item.status === 'pending' ? 'done' : 'pending');
        return item;
    });
    localStorage.setItem('vanglai', JSON.stringify(vanglai));
    renderVangLai();
}

function deleteVangLai(id) {
    const pass = prompt('Nhập mật khẩu để xóa:');
    if (pass !== '150924') { // thay bằng mật khẩu thật
        alert('Sai mật khẩu!');
        return;
    }
    let vanglai = JSON.parse(localStorage.getItem('vanglai') || '[]');
    vanglai = vanglai.filter(item => item.id !== id);
    localStorage.setItem('vanglai', JSON.stringify(vanglai));
    renderVangLai();
}

function filterVangLaiByPhone() {
    let vanglai = JSON.parse(localStorage.getItem('vanglai') || '[]');
    const keyword = $('#search-box').val()?.trim().toLowerCase() || '';
    let html = '';
    vanglai
        .filter(item =>
            !keyword ||
            (item.phone && item.phone.toLowerCase().includes(keyword))
        )
        .forEach(item => {
            html += `<tr>
                <td>${item.phone}</td>
                <td>${item.event}</td>
                <td>
                    <span class="badge ${item.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}">
                        ${item.status === 'pending' ? 'Chưa xử lý' : 'Đã xử lý'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="updateStatus(${item.id})">Cập nhật trạng thái</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteVangLai(${item.id})">Xóa</button>
                </td>
            </tr>`;
        });
    $('#vanglaiTable tbody').html(html || '<tr><td colspan="4">Không có dữ liệu</td></tr>');
}

// Gọi hàm này khi nhập vào ô tìm kiếm
$('#search-box').on('input', renderVangLai);

// Gọi lại khi trang load để hiển thị tất cả
$(document).ready(renderVangLai);
