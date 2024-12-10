// // Lấy danh sách sản phẩm từ localStorage
// function getProductList() {
//     return JSON.parse(localStorage.getItem("listProduct")) || [];
// }

// // Hàm tìm kiếm sản phẩm
// function searchProducts() {
//     const searchInput = document.getElementById("searchInput");
//     const searchResults = document.getElementById("searchResults");
//     const searchTerm = searchInput.value.toLowerCase().trim();

//     // Lấy danh sách sản phẩm
//     const products = getProductList();

//     // Lọc sản phẩm theo từ khóa
//     const filteredProducts = products.filter(
//         (product) =>
//             product.name.toLowerCase().includes(searchTerm) ||
//             product.id.toLowerCase().includes(searchTerm)
//     );

//     // Hiển thị kết quả tìm kiếm
//     displaySearchResults(filteredProducts);
// }

// // Hàm hiển thị kết quả tìm kiếm
// function displaySearchResults(products) {
//     const searchResults = document.getElementById("searchResults");
//     searchResults.innerHTML = ""; // Xóa kết quả cũ

//     if (products.length === 0) {
//         searchResults.innerHTML = "<p>Không tìm thấy sản phẩm</p>";
//         return;
//     }

//     // Tạo danh sách sản phẩm tìm được
//     const resultList = document.createElement("div");
//     products.forEach((product) => {
//         const productDiv = document.createElement("div");
//         productDiv.innerHTML = `
//             <div class="search-product-item">
//                 <img src="img/${product.img}" alt="${product.name}" width="50">
//                 <span>Mã SP: ${product.id}</span>
//                 <span>Tên: ${product.name}</span>
//                 <span>Giá: ${product.price.toLocaleString()}₫</span>
//                 <button class="view-detail" data-id="${
//                     product.id
//                 }">Xem chi tiết</button>
//             </div>
//         `;
//         resultList.appendChild(productDiv);
//     });

//     searchResults.appendChild(resultList);

//     // Thêm sự kiện cho nút xem chi tiết
//     document.querySelectorAll(".view-detail").forEach((button) => {
//         button.addEventListener("click", function () {
//             const productId = this.getAttribute("data-id");
//             // Chuyển đến trang chi tiết sản phẩm
//             window.location.href = `chitiet.html?id=${productId}`;
//         });
//     });
// }

// // Thêm sự kiện tìm kiếm
// document
//     .getElementById("searchInput")
//     .addEventListener("input", searchProducts);
