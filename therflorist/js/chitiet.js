function getAllProducts() {
    let all = JSON.parse(localStorage.getItem('all_products') || '[]');
    if (!all.length) {
        all = [
            {
                id: "hoatinhyeu",
                name: "Hoa Tình Yêu",
                price: "350.000đ",
                img: "../img/hoatuoi/nam.jpg"
            },
            {
                id: "hoahoacuc",
                name: "Hoa Hoa Cúc",
                price: "350.000đ",
                img: "../img/hoatuoi/sau.jpg"
            },
            {
                id: "hoamauhong",
                name: "Hoa Màu Hồng",
                price: "350.000đ",
                img: "../img/hoatuoi/bay.jpg"
            },
            {
                id: "hoacodon",
                name: "Hoa Cô Đơn",
                price: "350.000đ",
                img: "../img/hoatuoi/tam.jpg"
            },
            {
                id: "hoahongdo",
                name: "Hoa Hồng Đỏ",
                price: "250.000đ",
                img: "../img/hoatuoi/mot.jpg"
            },
            {
                id: "hoacamchuong",
                name: "Hoa Cẩm Chướng",
                price: "200.000đ",
                img: "../img/hoatuoi/hai.jpg"
            },
            {
                id: "hoalanhodiep",
                name: "Hoa Lan Hồ Điệp",
                price: "350.000đ",
                img: "../img/hoatuoi/ba.jpg"
            },
            {
                id: "hoacamtucau",
                name: "Hoa Cẩm Tú Cầu",
                price: "350.000đ",
                img: "../img/hoatuoi/bon.jpg"
            }
        ];
    }
    return all;
}

function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

$(document).ready(function () {
    const id = getParam('id');
    const products = getAllProducts();
    const product = products.find(p => p.id === id);
    const related = products.filter(p => p.id !== id);

    if (product) {
        $('#product-detail').html(`
      <div class="row g-4 align-items-start" style="margin-bottom:40px;">
        <div class="col-md-6 text-center">
          <div style="width:420px;height:420px;display:flex;align-items:center;justify-content:center;border:2px solid #eee;border-radius:16px;background:#fff;margin:auto;">
            <img src="${product.img}" alt="${product.name}" style="max-width:97%;max-height:97%;object-fit:cover;border-radius:12px;">
          </div>
        </div>
        <div class="col-md-6">
          <div style="border-bottom:2px solid #ff69b4;padding-bottom:14px;margin-bottom:18px;">
            <h2 class="mb-1" style="font-size:2rem;display:inline-block;">${product.name}</h2>
            <span class="fw-bold" style="font-size: 2rem; float:right; color:#d0021b;">
                ${
                    product.discount
                        ? `<span style="text-decoration:line-through;color:#888;">${product.price}</span> <span style="color:#ff69b4;">${product.discount}</span>`
                        : product.price
                }
            </span>
            <div style="clear:both"></div>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label for="soluong" class="me-2 mb-0 fw-semibold" style="font-size:1.1rem;">Số lượng:</label>
            <input type="number" id="soluong" min="1" value="1" class="form-control" style="width:90px;">
          </div>
          <div class="mb-3 d-flex gap-2">
          <button class="btn" style="background:#ff9800;color:#fff;font-weight:600;width:120px;" data-bs-toggle="modal" data-bs-target="#orderModal">ĐẶT HÀNG</button>
            <a href="https://www.messenger.com/t/105154285853407/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0" target="_blank" class="btn" style="background:#2196f3;color:#fff;font-weight:600;width:120px;text-decoration:none;">TƯ VẤN</a>
          </div>
          <div class="mb-3 d-flex align-items-center gap-3">
            <div style="color:#ff9800;font-size:1.2rem;"><i class="bi bi-clock"></i> Giao NHANH trong 60 phút</div>
            <div style="color:#ff69b4;font-size:1.2rem;"><i class="bi bi-gift"></i> Tặng miễn phí thiệp</div>
          </div>
          <div class="mt-4">
            <h5 style="border-bottom:1.5px solid #eee;padding-bottom:8px;margin-bottom:18px;font-weight:600;">Mô tả sản phẩm</h5>
            <div style="font-size:1.08rem;line-height:1.7;color:#444;">${product.desc || ""}</div>
          </div>
        </div>
      </div>
      <div class="mt-5" id="splienquan-container"></div>
    `);
        // Gọi hàm render splienquan nếu có
        // renderSplienquan(products, id);
    } else {
        $('#product-detail').html('<div class="alert alert-danger">Không tìm thấy sản phẩm!</div>');
    }
});

$(document).on('click', '[data-bs-target="#orderModal"]', function() {
    const name = $('.col-md-6 h2.mb-1').first().text().trim();
    const price = $('.fw-bold').first().text().trim();
    const qty = $('#soluong').val();
    $('#productName').val(name);
    $('#productPrice').val(price);
    $('#productQuantity').val(qty);
});