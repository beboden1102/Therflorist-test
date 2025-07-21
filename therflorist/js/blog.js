// Đăng ký các module mở rộng cho Quill
if (window.Quill && window.Quill.imports && window.Quill.imports['modules/imageResize']) {
    Quill.register('modules/imageResize', window.Quill.imports['modules/imageResize']);
}

// Khởi tạo Quill editor cho crblog.html
$(function() {
    // Khởi tạo Quill một lần duy nhất khi trang load
    let quill = new Quill('#editor', {
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            imageResize: {
                modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            }
        },
        theme: 'snow'
    });

    // Mở modal tạo mới
    $('#open-create-blog').on('click', function() {
        $('#createBlogModal').modal('show');
        quill.setContents([]); // reset nội dung
        $('#blog-title').val('');
        $('#blog-subtitle').val('');
        $('#blog-category').val('');
        $('#blog-image').val('');
        $('#save-blog').off('click').on('click', saveNewBlog);
    });

    // Hàm lưu mới
    function saveNewBlog() {
        const title = $('#blog-title').val().trim();
        const subtitle = $('#blog-subtitle').val().trim();
        const category = $('#blog-category').val();
        const image = $('#blog-image').val();
        const content = quill.root.innerHTML;
        if (!title || !content || !category) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const id = Date.now();
        blogs.unshift({ id, title, subtitle, content, category, image, createdAt: new Date().toLocaleString() });
        localStorage.setItem('blogs', JSON.stringify(blogs));
        $('#createBlogModal').modal('hide');
        renderBlogList();
    }

    // Hàm chỉnh sửa bài viết
    window.editBlog = function(id) {
        let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        let blog = blogs.find(b => b.id === id);
        if (!blog) return;
        $('#createBlogModal').modal('show');
        $('#blog-title').val(blog.title);
        $('#blog-subtitle').val(blog.subtitle);
        $('#blog-category').val(blog.category);
        $('#blog-image').val(blog.image);
        quill.root.innerHTML = blog.content;
        $('#save-blog').off('click').on('click', function() {
            blog.title = $('#blog-title').val().trim();
            blog.subtitle = $('#blog-subtitle').val().trim();
            blog.category = $('#blog-category').val();
            blog.image = $('#blog-image').val();
            blog.content = quill.root.innerHTML;
            localStorage.setItem('blogs', JSON.stringify(blogs));
            $('#createBlogModal').modal('hide');
            renderBlogList();
            $('#save-blog').off('click').on('click', saveNewBlog);
        });
    };

    // Hiển thị danh sách bài viết
    function renderBlogList() {
        let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        let html = '';
        if (blogs.length === 0) {
            html = '<div class="text-center mt-4">Chưa có bài viết nào.</div>';
        } else {
            html = blogs.map(blog => `
    <div class="card mb-3 shadow-sm">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${blog.image || '../img/nen/hoadep.jpg'}"
                     class="img-fluid rounded-start"
                     style="width:100%;height:120px;object-fit:cover;">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <span class="badge bg-light text-dark">${blog.category || ''}</span>
                    <h5 class="card-title fw-bold">
                        <a href="blogtt.html?id=${blog.id}" style="text-decoration:none;color:#222;">
                            ${blog.title}
                        </a>
                    </h5>
                    <p class="card-text">${blog.subtitle || ''}</p>
                    <div class="mb-2"><small>${blog.createdAt}</small></div>
                    <button class="btn btn-danger btn-sm" onclick="deleteBlog(${blog.id})">Xóa</button>
                    <button class="btn btn-warning btn-sm" onclick="changeCategory(${blog.id})">Chuyển danh mục</button>
                    <button class="btn btn-info btn-sm" onclick="editBlog(${blog.id})">Chỉnh sửa</button>
                </div>
            </div>
        </div>
    </div>
`).join('');
        }
        $('#blog-list').html(html);
    }

    // Xóa bài viết
    window.deleteBlog = function(id) {
        if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
        let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        blogs = blogs.filter(b => b.id !== id);
        localStorage.setItem('blogs', JSON.stringify(blogs));
        renderBlogList();
    };

    // Chuyển danh mục
    window.changeCategory = function(id) {
        let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        let blog = blogs.find(b => b.id === id);
        if (!blog) return;
        const newCat = prompt('Nhập danh mục mới (Hoa sinh nhật, Hoa khai trương, Hoa cưới):', blog.category);
        if (!newCat) return;
        blog.category = newCat;
        localStorage.setItem('blogs', JSON.stringify(blogs));
        renderBlogList();
    };

    // Hiển thị danh sách khi vào trang
    renderBlogList();
});

// Hiển thị danh sách bài viết ở blog.html
if (window.location.pathname.includes('blog.html')) {
    $(function() {
        let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        // Lấy từ khóa tìm kiếm từ URL
        const params = new URLSearchParams(window.location.search);
        const keyword = (params.get('keyword') || '').toLowerCase();

        // Nếu có từ khóa, lọc theo tên hoặc danh mục
        if (keyword) {
            blogs = blogs.filter(b =>
                (b.title && b.title.toLowerCase().includes(keyword)) ||
                (b.category && b.category.toLowerCase().includes(keyword))
            );
        }

        // Đếm số bài theo danh mục hoa
        let countSinhnhat = blogs.filter(b => b.category === 'Hoa sinh nhật').length;
        let countKhaitruong = blogs.filter(b => b.category === 'Hoa khai trương').length;
        let countCuoi = blogs.filter(b => b.category === 'Hoa cưới').length;
        $('#count-sinhnhat').text(`${countSinhnhat} bài viết`);
        $('#count-khaitruong').text(`${countKhaitruong} bài viết`);
        $('#count-cuoi').text(`${countCuoi} bài viết`);

        // Đếm số bài theo danh mục khác
        let countChonhoa = blogs.filter(b => b.category === 'Cách chọn hoa').length;
        let countChamsoc = blogs.filter(b => b.category === 'Chăm sóc hoa').length;
        let countDoisong = blogs.filter(b => b.category === 'Chia sẻ về đời sống').length;
        $('#count-chonhoa').text(`${countChonhoa} bài viết`);
        $('#count-chamsoc').text(`${countChamsoc} bài viết`);
        $('#count-doisong').text(`${countDoisong} bài viết`);

        // Bài viết nổi bật (bài đầu tiên)
        if (blogs.length > 0) {
            let featured = blogs[0];
            $('#featured-blog').html(`
                <div class="card mb-3 shadow">
                    <img src="${featured.image || '../img/nen/hoadep.jpg'}" class="card-img-top" style="height:300px;object-fit:cover;">
                    <div class="card-body">
                        <span class="badge bg-secondary">${featured.category || ''}</span>
                        <h3 class="card-title mt-2 fw-bold">
                            <a href="blogtt.html?id=${featured.id}" style="text-decoration:none;color:#222;">${featured.title}</a>
                        </h3>
                        <p class="card-text">${featured.subtitle || ''}</p>
                    </div>
                </div>
            `);
        }

        // Các bài viết nhỏ bên phải (tối đa 5 bài tiếp theo)
        let sideBlogs = blogs.slice(1, 6).map(blog => `
            <div class="mb-3 border-bottom pb-2">
                <span class="badge bg-light text-dark">${blog.category || ''}</span>
                <a href="blogtt.html?id=${blog.id}" style="text-decoration:none;color:#222;">
                    <div class="fw-bold">${blog.title}</div>
                </a>
            </div>
        `).join('');
        $('#side-blogs').html(sideBlogs);

        // Danh sách bài viết còn lại
        let listBlogs = blogs.slice(6).map(blog => `
            <div class="card mb-3 shadow-sm">
                <div class="row g-0">
                    <div class="col-md-3">
                        <a href="blogtt.html?id=${blog.id}">
                            <img src="${blog.image || '../img/nen/hoadep.jpg'}"
                                 class="img-fluid rounded-start"
                                 style="width:100%;height:120px;object-fit:cover;object-position:center;">
                        </a>
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <span class="badge bg-light text-dark">${blog.category || ''}</span>
                            <h5 class="card-title fw-bold">${blog.title}</h5>
                            <p class="card-text">${blog.subtitle || ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        $('#list-blogs').html(listBlogs);
    });
}

// Hiển thị chi tiết bài viết ở blogtt.html
if (window.location.pathname.includes('blogtt.html')) {
    $(function() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const blog = blogs.find(b => b.id == id);

        let detailHtml = '';
        if (!blog) {
            detailHtml = '<div class="text-center mt-4">Bài viết không tồn tại.</div>';
        } else {
            detailHtml = `
            <div class="mt-4">
                <h2 class="fw-bold text-center" style="font-size:2rem;">${blog.title}</h2>
                <h5 class="text-muted text-center mb-3">${blog.subtitle || ''}</h5>
                <div class="text-center mb-2">
                    <span class="badge bg-success" style="font-size:1rem;">${blog.category || ''}</span>
                    <span class="ms-2 text-secondary"><small>${blog.createdAt}</small></span>
                </div>
                <div class="text-center mb-4">
                    <img src="${blog.image || '../img/nen/hoadep.jpg'}" alt="Ảnh bài viết" class="blogtt-detail-img">
                </div>
                <div class="blog-content" style="font-size:1.1rem;line-height:1.8;">
                    ${blog.content}
                </div>
                <div class="text-center mt-4">
                    <a href="blog.html" class="btn btn-secondary">Quay lại danh sách</a>
                </div>
            </div>`;
        }
        $('#blog-detail').html(detailHtml);

        // Hiển thị danh sách bài viết mới
        let recentHtml = blogs.slice(0, 5).map(b => `
            <div class="blogtt-sidebar-row">
                <a href="blogtt.html?id=${b.id}">
                    <img src="${b.image || '../img/nen/hoadep.jpg'}" alt="" class="blogtt-sidebar-img">
                </a>
                <div style="flex:1; min-width:0;">
                    <a href="blogtt.html?id=${b.id}" class="blogtt-sidebar-title">${b.title}</a>
                    <div class="blogtt-sidebar-date">${b.createdAt}</div>
                </div>
            </div>
        `).join('');
        $('#recent-blogs').html(recentHtml);
    });
}

// Tìm kiếm bài viết ngay trên crblog.html
if (window.location.pathname.includes('crblog.html')) {
    $(function() {
        $('#search-box').on('input', function() {
            const keyword = $(this).val().toLowerCase();
            let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
            let filtered = blogs.filter(b =>
                (b.title && b.title.toLowerCase().includes(keyword)) ||
                (b.category && b.category.toLowerCase().includes(keyword))
            );
            let html = '';
            if (filtered.length === 0) {
                html = '<div class="text-center mt-4">Không tìm thấy bài viết nào.</div>';
            } else {
                html = filtered.map(blog => `
                    <div class="card mb-3 shadow-sm">
                        <div class="row g-0">
                            <div class="col-md-3">
                                <img src="${blog.image || '../img/nen/hoadep.jpg'}"
                                     class="img-fluid rounded-start"
                                     style="width:100%;height:120px;object-fit:cover;">
                            </div>
                            <div class="col-md-9">
                                <div class="card-body">
                                    <span class="badge bg-light text-dark">${blog.category || ''}</span>
                                    <h5 class="card-title fw-bold">
                                        <a href="blogtt.html?id=${blog.id}" style="text-decoration:none;color:#222;">
                                            ${blog.title}
                                        </a>
                                    </h5>
                                    <p class="card-text">${blog.subtitle || ''}</p>
                                    <div class="mb-2"><small>${blog.createdAt}</small></div>
                                    <button class="btn btn-danger btn-sm" onclick="deleteBlog(${blog.id})">Xóa</button>
                                    <button class="btn btn-warning btn-sm" onclick="changeCategory(${blog.id})">Chuyển danh mục</button>
                                    <button class="btn btn-info btn-sm" onclick="editBlog(${blog.id})">Chỉnh sửa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            $('#blog-list').html(html);
        });
    });
}

// Ví dụ render từng blog:
html += `
  <div class="blog-item">
    <a href="blogtt.html?id=${blog.id}" class="blog-link">
      <h3>${blog.title}</h3>
      <p>${blog.summary}</p>
    </a>
  </div>
`;
$(document).ready(function() {
    let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    let html = '';
    blogs.forEach(blog => {
        html += `
        <div class="blog-item mb-3">
            <a href="blogtt.html?id=${blog.id}" class="blog-link" style="text-decoration:none; color:inherit;">
                <h3>${blog.title}</h3>
                <p>${blog.summary || ''}</p>
            </a>
        </div>
        `;
    });
    $('#list-blogs').html(html);
});