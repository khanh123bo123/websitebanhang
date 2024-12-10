var product = [
    {
        id: "SP1",
        name: "Rolls-Royce Silver Spur (1987)",
        img: "/img/img-1.jpg",
        price: 30000000000.0,
    },
    {
        id: "SP2",
        name: "Rolls-Royce Silver Cloud (1962)",
        img: "/img/img-2.jpg",
        price: 50000000000.0,
    },
    {
        id: "SP3",
        name: "Rolls-Royce Phantom I (1925-1931)",
        img: "/img/img-3.jpg",
        price: 60000000000.0,
    },
    {
        id: "SP4",
        name: "1962 Rolls-Royce Silver Cloud	",
        img: "/img/img-4.jpg",
        price: 35000000000.0,
    },
    // {
    //     id: "SP5",
    //     name: "Audi",
    //     img: "oto5.jpg",
    //     price: 654000,
    // },
    // {
    //     id: "SP6",
    //     name: "Mercedes",
    //     img: "oto6.jpg",
    //     price: 123000,
    // },
    // {
    //     id: "SP7",
    //     name: "Porcher",
    //     img: "oto7.jpg",
    //     price: 345000,
    // },
    // {
    //     id: "SP8",
    //     name: "BMW",
    //     img: "oto8.jpg",
    //     price: 258000,
    // },
];
var pro = [];

function saveproduct() {
    sessionStorage.setItem("shopping", JSON.stringify(pro));
}
// đẩy mảng product vào local
function Save() {
    localStorage.setItem("listProduct", JSON.stringify(product));
}

//lấy sản phẩm
function load() {
    product = JSON.parse(localStorage.getItem("listProduct"));
}
//xuất sản phẩm ra html
if (localStorage.getItem("listProduct") != null) {
    load();
}
if (localStorage.getItem("listProduct") == null) {
    Save();
}
var listLocal = function () {
    var listproduct = "";
    for (var i in product) {
        var data = JSON.parse(JSON.stringify(product[i]));
        var listproduct = '<div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-3">';
        listproduct += '<div class="card product p-2" styte="width:auto">';
        listproduct +=
            '<a ><img  class="proo card-img-top" data-id="' +
            data.id +
            '" data-name="' +
            data.name +
            '" data-img="' +
            data.img +
            '" data-price="' +
            data.price +
            '" src="img/' +
            data.img +
            '" alt="..."></a>';
        listproduct +=
            '<div class="card-title product-title text-center h5" ><a href="#"  class="proo" data-id="' +
            data.id +
            '" data-name="' +
            data.name +
            '" data-img="' +
            data.img +
            '" data-price="' +
            data.price +
            '">' +
            data.name +
            "</a></div>";
        listproduct +=
            '<div class="price text-center h6">' + data.price + "₫</div>";
        listproduct +=
            '<span class="text-center add-to-cart add-cart btn btn-outline-warning" data-id="' +
            data.id +
            '" data-name="' +
            data.name +
            '" data-img="' +
            data.img +
            '" data-price="' +
            data.price +
            '" onclick="tks()">';
        listproduct += "<a>";
        listproduct += '<i class="fas fa-cart-plus"></i>';
        listproduct += "</a>";
        listproduct += "</span>";
        listproduct += "</div>";
        listproduct += "</div>";
        document.getElementById("banchay").innerHTML += listproduct;
    }
    Save();
};
function searchProducts() {
    const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
    const filteredProducts = product.filter(
        (p) =>
            p.name.toLowerCase().includes(searchInput) ||
            (p.description && p.description.toLowerCase().includes(searchInput))
    );

    displayProducts(filteredProducts);
}

// Lắng nghe sự kiện nút tìm kiếm
document
    .getElementById("searchButton")
    .addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn reload trang
        searchProducts();
    });

// Lắng nghe sự kiện khi người dùng nhấn "Enter"
document
    .getElementById("searchInput")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Ngăn chặn reload trang
            searchProducts();
        }
    });

function displayProducts(products) {
    const productContainer = document.getElementById("banchay");
    productContainer.innerHTML = ""; // Xóa danh sách cũ

    if (products.length === 0) {
        productContainer.innerHTML =
            '<div class="col text-center">Không tìm thấy sản phẩm nào</div>';
        return;
    }

    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.className = "col";
        productElement.innerHTML = `
            <article class="cate-item">
                <img src="${product.img}" alt="${product.name}" class="cate-item-thumb" />
                <section class="cate-item-info">
                    <h3 class="cate-item-title">${product.name}</h3>
                    <p class="cate-item-desc">${product.description}</p>
                    <div class="price text-center">${product.price}₫</div>
                </section>
            </article>
        `;
        productContainer.appendChild(productElement);
    });
}
listLocal();
