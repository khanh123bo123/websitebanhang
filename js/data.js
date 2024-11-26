var product = [];

function displayProduct() {
    for (let i = 0; i <= product.length - 1; i++) {
        if (product[i].male == 1) {
            var listproduct = '<div class="col-lg-3 col-md-6 col-sm-6 col-6">';
            listproduct += '<div class="card product" styte="width:auto">';
            listproduct +=
                '<img class="card-img-top" src="' +
                product[i].img +
                '" alt="...">';
            listproduct +=
                '<div class="card-title product-title text-center h5" >' +
                product[i].name +
                "</div>";
            listproduct +=
                '<span class="price text-center h6">' +
                product[i].price +
                "₫</span>";
            listproduct +=
                '<span class="text-center add-to-cart btn btn-outline-warning add-cart" data-id="' +
                product[i].id +
                '" data-name="' +
                product[i].name +
                '" data-img="' +
                product[i].img +
                '" data-price="' +
                product[i].price +
                '" onclick="tks()">';
            // listproduct +=  '<a class=" add-to-cart btn" data-name="'+product[i].name+'" data-price="'+product[i].price+'" onclick="tks()">';
            listproduct += "<a>";
            listproduct += '<i class="fas fa-cart-plus"></i>';
            listproduct += "</a>";
            listproduct += "</span>";
            listproduct += "</div>";
            listproduct += "</div>";

            document.getElementById("man").innerHTML += listproduct;
        } else {
            var listproduct = '<div class="col-lg-3 col-md-6 col-sm-6 col-6">';
            listproduct += '<div class="card product" styte="width:auto">';
            listproduct +=
                '<img class="card-img-top" src="' +
                product[i].img +
                '" alt="...">';
            listproduct +=
                '<div class="card-title product-title text-center h5" >' +
                product[i].name +
                "</div>";
            listproduct +=
                '<span class="price text-center h6">' +
                product[i].price +
                "₫</span>";
            listproduct +=
                '<span class="text-center add-to-cart btn btn-outline-warning add-cart" data-id="' +
                product[i].id +
                '" data-name="' +
                product[i].name +
                '" data-img="' +
                product[i].img +
                '" data-price="' +
                product[i].price +
                '" onclick="tks()">';
            // listproduct +=  '<a class=" add-to-cart btn" data-name="'+product[i].name+'" data-price="'+product[i].price+'" onclick="tks()">';
            listproduct += "<a>";
            listproduct += '<i class="fas fa-cart-plus"></i>';
            listproduct += "</a>";
            listproduct += "</span>";
            listproduct += "</div>";
            listproduct += "</div>";

            document.getElementById("women").innerHTML += listproduct;
        }
    }
}
displayProduct();
