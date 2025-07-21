$(document).ready(function () {
    // Xóa sản phẩm đã lưu trong localStorage
    //localStorage.removeItem('all_products');
    //localStorage.removeItem('giam30_products');
    //localStorage.removeItem('datnhieu_products');

    // Lấy sản phẩm từ localStorage nếu có, nếu không thì dùng mảng mặc định
    let products = JSON.parse(localStorage.getItem('datnhieu_products') || '[]');
    if (!products.length) {
        products = [
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

    const productList = document.getElementById('datnhieu');
    productList.classList.add('justify-content-center');

    products.forEach((product) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center';
        col.innerHTML = `
            <div class="card" style="width: 16rem;">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title" style="font-size: 16px;">${product.name}</h5>
                    <p class="card-text" style="color: #ff69b4; font-weight: bold;">
                        ${
                            product.discount
                                ? `<span style="text-decoration:line-through;color:#888;">${product.price}</span> <span style="color:#ff69b4;">${product.discount}</span>`
                                : product.price
                        }
                    </p>
                    <a href="../html/chitiet.html?id=${product.id}" class="btn btn-pink" style="background:#ff69b4;color:#fff;">Đặt mua</a>
                </div>
            </div>
        `;
        productList.appendChild(col);
    });

    // Xử lý sự kiện khi chọn loại sản phẩm
    $('.productCategory').change(function () {
        const selectedValues = $('.productCategory:checked').map(function () {
            return this.value;
        }).get();

        // Hiển thị lại sản phẩm dựa trên lựa chọn
        productList.innerHTML = '';
        products.forEach((product) => {
            if (selectedValues.includes('giam30') && !product.discount) return;
            if (selectedValues.includes('datnhieu') && product.discount) return;

            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center';
            col.innerHTML = `
                <div class="card" style="width: 16rem;">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title" style="font-size: 16px;">${product.name}</h5>
                        <p class="card-text" style="color: #ff69b4; font-weight: bold;">
                            ${
                                product.discount
                                    ? `<span style="text-decoration:line-through;color:#888;">${product.price}</span> <span style="color:#ff69b4;">${product.discount}</span>`
                                    : product.price
                            }
                        </p>
                        <a href="../html/chitiet.html?id=${product.id}" class="btn btn-pink" style="background:#ff69b4;color:#fff;">Đặt mua</a>
                    </div>
                </div>
            `;
            productList.appendChild(col);
        });
    });

    // Lưu sản phẩm vào localStorage khi chọn loại sản phẩm
    $('.productCategory').change(function () {
        const categories = $('.productCategory:checked').map(function(){return this.value}).get();
        categories.forEach(category => {
            let key = category === 'giam30' ? 'giam30_products' : 'datnhieu_products';
            let products = JSON.parse(localStorage.getItem(key) || '[]');
            products.push({ id, name, price, discount, img, desc });
            localStorage.setItem(key, JSON.stringify(products));
        });
    });
});

