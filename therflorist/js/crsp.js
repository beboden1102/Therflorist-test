$(document).ready(function() {
    renderProductList();
});

$('#open-create-product').on('click', function() {
    $('#createProductModal').modal('show');
});

// Lưu sản phẩm vào localStorage theo danh mục
$('#save-product').on('click', function() {
    const name = $('#product-name').val().trim();
    const price = $('#product-price').val().trim();
    const discount = $('#product-discount').val().trim();
    const img = $('#product-img').val().trim();
    const desc = $('#product-desc').val().trim();
    const categories = $('.productCategory:checked').map(function(){return this.value}).get();
    if (!name || !price || !img || !categories.length) {
        alert('Vui lòng nhập đầy đủ thông tin và chọn danh mục!');
        return;
    }
    const id = 'sp' + Date.now();
    // Luôn lưu vào tổng hợp (sanpham.js, sanphamlienquan.js)
    let allProducts = JSON.parse(localStorage.getItem('all_products') || '[]');
    allProducts.push({ id, name, price, discount, img, desc });
    localStorage.setItem('all_products', JSON.stringify(allProducts));
    // Lưu vào từng danh mục
    if (categories.includes('all')) {
        ['giam30', 'datnhieu'].forEach(cat => {
            let key = cat === 'giam30' ? 'giam30_products' : 'datnhieu_products';
            let arr = JSON.parse(localStorage.getItem(key) || '[]');
            arr.push({ id, name, price, discount, img, desc });
            localStorage.setItem(key, JSON.stringify(arr));
        });
    } else {
        categories.forEach(cat => {
            let key = cat === 'giam30' ? 'giam30_products' : 'datnhieu_products';
            let arr = JSON.parse(localStorage.getItem(key) || '[]');
            arr.push({ id, name, price, discount, img, desc });
            localStorage.setItem(key, JSON.stringify(arr));
        });
    }
    $('#createProductModal').modal('hide');
    alert('Tạo sản phẩm thành công!');
    $('#product-name, #product-price, #product-discount, #product-img, #product-desc').val('');
    $('.productCategory').prop('checked', false);
    renderProductList();
});

// Hiển thị danh sách sản phẩm, lấy từ khóa từ #search-box
function renderProductList() {
    const keyword = $('#search-box').val();
    let products = JSON.parse(localStorage.getItem('all_products') || '[]');
    if (keyword) {
        products = products.filter(p => p.name && p.name.toLowerCase().includes(keyword.toLowerCase()));
    }
    let html = '';
    if (!products.length) {
        html = '<div class="text-center mt-4">Chưa có sản phẩm nào.</div>';
    } else {
        html = products.map(product => `
            <div class="card mb-3 shadow-sm">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${product.img || '../img/nen/hoadep.jpg'}"
                             class="img-fluid rounded-start"
                             style="width:100%;height:120px;object-fit:cover;">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${product.name}</h5>
                            <p class="card-text">${product.desc || ''}</p>
                            <div class="mb-2">
                                <span class="badge bg-light text-dark">${getProductCategories(product.id).join(', ')}</span>
                                <span class="ms-2 text-secondary">${product.price}${product.discount ? ' - ' + product.discount : ''}</span>
                            </div>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Xóa</button>
                            <button class="btn btn-warning btn-sm" onclick="changeProductCategory('${product.id}')">Chuyển danh mục</button>
                            <button class="btn btn-info btn-sm" onclick="editProduct('${product.id}')">Chỉnh sửa</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    $('#product-list').html(html);
}

// Lấy danh mục của sản phẩm theo id
function getProductCategories(id) {
    let cats = [];
    let giam30 = JSON.parse(localStorage.getItem('giam30_products') || '[]');
    let datnhieu = JSON.parse(localStorage.getItem('datnhieu_products') || '[]');
    if (giam30.find(p => p.id === id)) cats.push('Hoa sinh nhật');
    if (datnhieu.find(p => p.id === id)) cats.push('Hoa tốt nghiệp');
    if (cats.length === 2) cats.push('Tất cả');
    return cats;
}

// Xóa sản phẩm
window.deleteProduct = function(id) {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    // Xóa khỏi all_products
    let all = JSON.parse(localStorage.getItem('all_products') || '[]').filter(p => p.id !== id);
    localStorage.setItem('all_products', JSON.stringify(all));
    // Xóa khỏi từng danh mục
    ['giam30_products', 'datnhieu_products'].forEach(key => {
        let arr = JSON.parse(localStorage.getItem(key) || '[]').filter(p => p.id !== id);
        localStorage.setItem(key, JSON.stringify(arr));
    });
    renderProductList();
};

// Chỉnh sửa sản phẩm
window.editProduct = function(id) {
    let all = JSON.parse(localStorage.getItem('all_products') || '[]');
    let product = all.find(p => p.id === id);
    if (!product) return;
    $('#edit-product-id').val(product.id);
    $('#edit-product-name').val(product.name);
    $('#edit-product-price').val(product.price);
    $('#edit-product-discount').val(product.discount);
    $('#edit-product-img').val(product.img);
    $('#edit-product-desc').val(product.desc);
    // Set danh mục
    let cats = getProductCategories(product.id);
    $('.editProductCategory').prop('checked', false);
    if (cats.includes('Hoa sinh nhật')) $('.editProductCategory[value="giam30"]').prop('checked', true);
    if (cats.includes('Hoa tốt nghiệp')) $('.editProductCategory[value="datnhieu"]').prop('checked', true);
    if (cats.includes('Tất cả')) $('.editProductCategory[value="all"]').prop('checked', true);
    $('#editProductModal').modal('show');
};

// Lưu chỉnh sửa
$('#save-edit-product').on('click', function() {
    const id = $('#edit-product-id').val();
    const name = $('#edit-product-name').val().trim();
    const price = $('#edit-product-price').val().trim();
    const discount = $('#edit-product-discount').val().trim();
    const img = $('#edit-product-img').val().trim();
    const desc = $('#edit-product-desc').val().trim();
    const categories = $('.editProductCategory:checked').map(function(){return this.value}).get();
    if (!name || !price || !img || !categories.length) {
        alert('Vui lòng nhập đầy đủ thông tin và chọn danh mục!');
        return;
    }
    // Cập nhật all_products
    let all = JSON.parse(localStorage.getItem('all_products') || '[]');
    let idx = all.findIndex(p => p.id === id);
    if (idx !== -1) all[idx] = { id, name, price, discount, img, desc };
    localStorage.setItem('all_products', JSON.stringify(all));
    // Xóa khỏi tất cả danh mục trước
    ['giam30_products', 'datnhieu_products'].forEach(key => {
        let arr = JSON.parse(localStorage.getItem(key) || '[]').filter(p => p.id !== id);
        localStorage.setItem(key, JSON.stringify(arr));
    });
    // Lưu lại vào danh mục đã chọn
    if (categories.includes('all')) {
        ['giam30', 'datnhieu'].forEach(cat => {
            let key = cat === 'giam30' ? 'giam30_products' : 'datnhieu_products';
            let arr = JSON.parse(localStorage.getItem(key) || '[]');
            arr.push({ id, name, price, discount, img, desc });
            localStorage.setItem(key, JSON.stringify(arr));
        });
    } else {
        categories.forEach(cat => {
            let key = cat === 'giam30' ? 'giam30_products' : 'datnhieu_products';
            let arr = JSON.parse(localStorage.getItem(key) || '[]');
            arr.push({ id, name, price, discount, img, desc });
            localStorage.setItem(key, JSON.stringify(arr));
        });
    }
    $('#editProductModal').modal('hide');
    renderProductList();
});

// Đổi danh mục nhanh
window.changeProductCategory = function(id) {
    let cats = prompt('Nhập danh mục mới (giam30, datnhieu, all):\n- giam30: Hoa sinh nhật\n- datnhieu: Hoa tốt nghiệp\n- all: Tất cả', '');
    if (!cats) return;
    cats = cats.split(',').map(c => c.trim()).filter(Boolean);
    // Xóa khỏi tất cả danh mục trước
    ['giam30_products', 'datnhieu_products'].forEach(key => {
        let arr = JSON.parse(localStorage.getItem(key) || '[]').filter(p => p.id !== id);
        localStorage.setItem(key, JSON.stringify(arr));
    });
    // Lưu lại vào danh mục đã chọn
    let all = JSON.parse(localStorage.getItem('all_products') || '[]');
    let product = all.find(p => p.id === id);
    if (!product) return;
    if (cats.includes('all')) {
        ['giam30', 'datnhieu'].forEach(cat => {
            let key = cat === 'giam30' ? 'giam30_products' : 'datnhieu_products';
            let arr = JSON.parse(localStorage.getItem(key) || '[]');
            arr.push(product);
            localStorage.setItem(key, JSON.stringify(arr));
        });
    } else {
        cats.forEach(cat => {
            let key = cat === 'giam30' ? 'giam30_products' : 'datnhieu_products';
            let arr = JSON.parse(localStorage.getItem(key) || '[]');
            arr.push(product);
            localStorage.setItem(key, JSON.stringify(arr));
        });
    }
    renderProductList();
};

// Gán sự kiện tìm kiếm cho thanh tìm kiếm trên cùng
$('#search-box').on('input', function() {
    renderProductList();
});