const products = [
    { id: "hoatinhyeu", name: "Hoa Tình Yêu", price: "350.000đ", img: "../img/hoatuoi/nam.jpg", desc: "Hoa tặng người yêu lãng mạn." },
    { id: "hoahoacuc", name: "Hoa Hoa Cúc", price: "350.000đ", img: "../img/hoatuoi/sau.jpg", desc: "Hoa cúc tươi tắn, ý nghĩa." },
    { id: "hoamauhong", name: "Hoa Màu Hồng", price: "350.000đ", img: "../img/hoatuoi/bay.jpg", desc: "Hoa màu hồng nhẹ nhàng." },
    { id: "hoacodon", name: "Hoa Cô Đơn", price: "350.000đ", img: "../img/hoatuoi/tam.jpg", desc: "Hoa dành cho những tâm hồn cô đơn." },
    { id: "hoahongdo", name: "Hoa Hồng Đỏ", price: "250.000đ", img: "../img/hoatuoi/mot.jpg", desc: "Hoa hồng đỏ truyền thống." },
    { id: "hoacamchuong", name: "Hoa Cẩm Chướng", price: "200.000đ", img: "../img/hoatuoi/hai.jpg", desc: "Hoa cẩm chướng tươi lâu." },
    { id: "hoalanhodiep", name: "Hoa Lan Hồ Điệp", price: "350.000đ", img: "../img/hoatuoi/ba.jpg", desc: "Hoa lan sang trọng." },
    { id: "hoacamtucau", name: "Hoa Cẩm Tú Cầu", price: "350.000đ", img: "../img/hoatuoi/bon.jpg", desc: "Hoa cẩm tú cầu đẹp mắt." }
];
$(document).ready(function() {
    let products = JSON.parse(localStorage.getItem('all_products') || '[]');
    if (!products.length) {
        products = [
            { id: "hoatinhyeu", name: "Hoa Tình Yêu", price: "350.000đ", img: "../img/hoatuoi/nam.jpg", desc: "Hoa tặng người yêu lãng mạn." },
            { id: "hoahoacuc", name: "Hoa Hoa Cúc", price: "350.000đ", img: "../img/hoatuoi/sau.jpg", desc: "Hoa cúc tươi tắn, ý nghĩa." },
            { id: "hoamauhong", name: "Hoa Màu Hồng", price: "350.000đ", img: "../img/hoatuoi/bay.jpg", desc: "Hoa màu hồng nhẹ nhàng." },
            { id: "hoacodon", name: "Hoa Cô Đơn", price: "350.000đ", img: "../img/hoatuoi/tam.jpg", desc: "Hoa dành cho những tâm hồn cô đơn." },
            { id: "hoahongdo", name: "Hoa Hồng Đỏ", price: "250.000đ", img: "../img/hoatuoi/mot.jpg", desc: "Hoa hồng đỏ truyền thống." },
            { id: "hoacamchuong", name: "Hoa Cẩm Chướng", price: "200.000đ", img: "../img/hoatuoi/hai.jpg", desc: "Hoa cẩm chướng tươi lâu." },
            { id: "hoalanhodiep", name: "Hoa Lan Hồ Điệp", price: "350.000đ", img: "../img/hoatuoi/ba.jpg", desc: "Hoa lan sang trọng." },
            { id: "hoacamtucau", name: "Hoa Cẩm Tú Cầu", price: "350.000đ", img: "../img/hoatuoi/bon.jpg", desc: "Hoa cẩm tú cầu đẹp mắt." }
        ];
    }
    let html = products.map(product => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div class="card" style="width: 16rem;">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title" style="font-size: 16px;">${product.name}</h5>
                    <p class="card-text" style="color: #ff69b4; font-weight: bold;">
                        ${product.discount ? `<span style="text-decoration:line-through;color:#888;">${product.price}</span> <span style="color:#ff69b4;">${product.discount}</span>` : product.price}
                    </p>
                    <a href="chitiet.html?id=${product.id}" class="btn btn-pink" style="background:#ff69b4;color:#fff;">Đặt mua</a>
                </div>
            </div>
        </div>
    `).join('');
    $('#vuonhoaxinh').html(html);
});