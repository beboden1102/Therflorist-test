
function searchRedirect() {
    const keyword = document.getElementById('search-box').value.trim();
    if (keyword) {
        window.location.href = `timkiem.html?keyword=${encodeURIComponent(keyword)}`;
    }
    return false; // Ngăn submit form reload trang
}

    // Danh sách sản phẩm mẫu, bạn có thể thay đổi cho phù hợp
    const products = [
        { id: "hoatinhyeu", name: "Hoa Tình Yêu", price: "350.000đ", img: "../img/hoatuoi/nam.jpg" },
        { id: "hoahoacuc", name: "Hoa Hoa Cúc", price: "350.000đ", img: "../img/hoatuoi/sau.jpg" },
        { id: "hoamauhong", name: "Hoa Màu Hồng", price: "350.000đ", img: "../img/hoatuoi/bay.jpg" },
        { id: "hoacodon", name: "Hoa Cô Đơn", price: "350.000đ", img: "../img/hoatuoi/tam.jpg" },
        { id: "hoahongdo", name: "Hoa Hồng Đỏ", price: "250.000đ", img: "../img/hoatuoi/mot.jpg" },
        { id: "hoacamchuong", name: "Hoa Cẩm Chướng", price: "200.000đ", img: "../img/hoatuoi/hai.jpg" },
        { id: "hoalanhodiep", name: "Hoa Lan Hồ Điệp", price: "350.000đ", img: "../img/hoatuoi/ba.jpg" },
        { id: "hoacamtucau", name: "Hoa Cẩm Tú Cầu", price: "350.000đ", img: "../img/hoatuoi/bon.jpg" }
    ];

    // Lấy từ khóa từ URL
    function getParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name) || '';
    }

    $(document).ready(function () {
        const keyword = getParam('keyword').toLowerCase().trim();
        if (keyword) {
            $('#search-title').text('Kết quả tìm kiếm: "' + keyword + '"');
        }
        const result = products.filter(p => p.name.toLowerCase().includes(keyword));
        let html = '';
        if (result.length > 0) {
            html = result.map(product => `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card" style="width: 16rem;">
                        <img src="${product.img}" class="card-img-top" alt="${product.name}">
                        <div class="card-body text-center">
                            <h5 class="card-title" style="font-size: 16px;">${product.name}</h5>
                            <p class="card-text" style="color: #ff69b4; font-weight: bold;">${product.price}</p>
                            <a href="chitiet.html?id=${product.id}" class="btn btn-pink" style="background:#ff69b4;color:#fff;">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            html = '<div class="col-12 text-center text-danger">Không tìm thấy sản phẩm phù hợp.</div>';
        }
        $('#timkiem').html(html);
    });
   