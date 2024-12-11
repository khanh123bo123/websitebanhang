var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(id, name, img, price, count) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (id, name, img, price, count) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(id, name, img, price, count);
        cart.push(item);
        saveCart();
    };
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    };

    // Remove all items from cart
    obj.removeItemFromCartAll = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    };

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    };

    // Count cart
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    };

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }

        // Format the number after the calculation is done ((da fix))
        const total = totalCart.toLocaleString();
        return total; // Ensure rounding if needed
    };

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toLocaleString();
            itemCopy.price = Number(item.price).toLocaleString();
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();
var pro = [];

function saveproduct() {
    sessionStorage.setItem("shopping", JSON.stringify(pro));
}
// Load cart
function loadproduct() {
    pro = JSON.parse(sessionStorage.getItem("shopping"));
}

// *************************************
// Triggers / Events
// *************************************
// Add item
$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    var name = $(this).data("name");
    var img = $(this).data("img");
    var price = Number($(this).data("price"));
    shoppingCart.addItemToCart(id, name, img, price, 1);
    displayCart();
});

// Clear items
$(".clear-cart").click(function () {
    shoppingCart.clearCart();
    window.location.reload();
    displayCart();
});

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output +=
            "<tr class='text-center'>" +
            "<td><img src='img/" +
            cartArray[i].img +
            "' style='width:100px'></td>" +
            "<td class='name-title'>" +
            cartArray[i].name +
            "</td>" +
            "<td>" +
            cartArray[i].price +
            "₫</td>" +
            "<td><button class='minus-item cart-count input-group-addon btn btn-outline-primary' data-id='" +
            cartArray[i].id +
            "' data-name=" +
            cartArray[i].name +
            ">-</button>" +
            "" +
            "<button class='btn cart-count'>" +
            cartArray[i].count +
            "</button>" +
            "<button class='plus-item cart-count btn btn-primary input-group-addon' data-id='" +
            cartArray[i].id +
            "' data-name=" +
            cartArray[i].name +
            ">+</button>" +
            "</td>" +
            "<td>" +
            cartArray[i].total +
            "₫</td>" +
            "<td><button class='delete-item btn btn-outline-danger' data-id='" +
            cartArray[i].id +
            "' data-name=" +
            cartArray[i].name +
            ">X</button></td>" +
            "</tr>";
    }
    $(".show-cart-1").html(output);
    $(".total-cart").html(shoppingCart.totalCart());
    $(".total-count").html(shoppingCart.totalCount());
}

$(".show-cart-1").on("click", ".delete-item", function (event) {
    var id = $(this).data("id");
    shoppingCart.removeItemFromCartAll(id);
    displayCart();
});

// -1
$(".show-cart-1").on("click", ".minus-item", function (event) {
    var id = $(this).data("id");
    shoppingCart.removeItemFromCart(id);
    displayCart();
});
// +1
$(".show-cart-1").on("click", ".plus-item", function (event) {
    var id = $(this).data("id");
    shoppingCart.addItemToCart(id);
    displayCart();
});

// Item count input
$(".show-cart-1").on("change", ".item-count", function (event) {
    var id = $(this).data("id");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(id, count);
    displayCart();
});
displayCart();
var info = [];
var donhang = [];
function Savedon() {
    localStorage.setItem("listdon", JSON.stringify(donhang));
}

function showOrderConfirmation() {
    // Kiểm tra giỏ hàng nếu trống thì không làm gì
    var cartArray = shoppingCart.listCart();
    if (cartArray.length === 0) {
        alert("Giỏ hàng của bạn hiện tại trống.");
        return;
    }

    // Đóng modal tóm tắt địa chỉ nhận hàng (nếu đang mở)
    $("#diachinhanhang").modal("hide");

    // Mở modal xác nhận đơn hàng
    $("#order-confirmation").modal("show");

    // Hiển thị tóm tắt giỏ hàng trong modal xác nhận đơn hàng
    showOrderSummary();
}

function showOrderSummary() {
    // Lấy danh sách sản phẩm trong giỏ hàng
    var cartArray = shoppingCart.listCart();
    var output = "";

    // Duyệt qua từng sản phẩm trong giỏ hàng và hiển thị tên, hình ảnh, giá và tổng tiền
    for (var i in cartArray) {
        output +=
            "<tr class='text-center'>" +
            "<td><img src='img/" +
            cartArray[i].img +
            "' style='width:100px'></td>" + // Hiển thị hình ảnh sản phẩm
            "<td class='name-title'>" +
            cartArray[i].name +
            "</td>" + // Hiển thị tên sản phẩm
            "<td>" +
            cartArray[i].count +
            "</td>" + // Hiển thị giá sản phẩm
            "<td>" +
            cartArray[i].total +
            "₫</td>" + // Hiển thị tổng tiền cho sản phẩm này (giá * số lượng)
            "</tr>";
    }

    // Hiển thị các sản phẩm trong phần tóm tắt hóa đơn
    $(".order-summary-body").html(output);
    document.querySelector(".order-summary-header").style.display =
        "table-header-group";
}
$(document).on("click", ".close", function () {
    // Xóa tất cả các sản phẩm trong tóm tắt giỏ hàng khi đóng modal
    $(".order-summary-body").html(""); // Xóa nội dung trong tbody
    $(".order-summary-header").hide(); // Ẩn phần thead
});

function cartClick() {
    var check = signupArr;

    if (check != "") {
        window.location.href = "cart.html";
    }

    if (check == "") {
        window.location.href = "./user/signup.html";
    }
}

//lấy sản phẩm
function loaddon() {
    donhang = JSON.parse(localStorage.getItem("listdon"));
}

if (localStorage.getItem("listdon") == null) {
    Savedon();
}
var checkCart = function () {
    var valid = true;

    // Kiểm tra các trường thông tin người nhận
    if (document.getElementById("inputnguoinhan").value == "") {
        $(".nguoinhan").css("display", "block");
        $(".nguoinhan").text("Vui lòng nhập tên người nhận");
        valid = false;
    } else {
        $(".nguoinhan").css("display", "none");
    }

    // Kiểm tra số điện thoại
    var phonePattern = /^[0-9]{10}$/; // Kiểm tra số điện thoại có 10 chữ số
    if (document.getElementById("inputsdt").value == "") {
        $(".sdt").css("display", "block");
        $(".sdt").text("Vui lòng nhập số điện thoại");
        valid = false;
    } else if (!phonePattern.test(document.getElementById("inputsdt").value)) {
        $(".sdt").css("display", "block");
        $(".sdt").text("Số điện thoại không đúng định dạng");
        valid = false;
    } else {
        $(".sdt").css("display", "none");
    }
    // Kiểm tra địa chỉ
    if (document.getElementById("inputdiachi").value == "") {
        $(".diachi").css("display", "block");
        $(".diachi").text("Vui lòng nhập địa chỉ");
        valid = false;
    } else {
        $(".diachi").css("display", "none");
    }

    // Kiểm tra phương thức thanh toán
    if (document.getElementById("inputthanhtoan").value == 0) {
        $(".thanhtoan").css("display", "block");
        valid = false;
    }

    // Kiểm tra tỉnh/thành phố
    if (document.getElementById("inputtinh").value == 0) {
        $(".tinh").css("display", "block");
        $(".tinh").text("Vui lòng chọn tỉnh");
        valid = false;
    } else {
        $(".tinh").css("display", "none");
    }

    // Kiểm tra email
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (document.getElementById("inputemail").value == "") {
        $(".email").css("display", "block");
        $(".email").text("Vui lòng nhập email");
        valid = false;
    } else if (
        !emailPattern.test(document.getElementById("inputemail").value)
    ) {
        $(".email").css("display", "block");
        $(".email").text("Email không đúng định dạng");
        valid = false;
    } else {
        $(".email").css("display", "none");
    }

    // Kiểm tra các trường thẻ (nếu thanh toán qua thẻ)
    if (document.getElementById("inputthanhtoan").value == 3) {
        var cardNumber = document.getElementById("cardNumber").value;
        var cardName = document.getElementById("cardName").value;
        var cardExpiry = document.getElementById("cardExpiry").value;
        var cardCVV = document.getElementById("cardCVV").value;

        if (cardNumber == "") {
            $(".cardNumberError").css("display", "block");
            $(".cardNumberError").text("Vui lòng nhập số thẻ");
            valid = false;
        } else {
            $(".cardNumberError").css("display", "none");
        }

        if (cardName == "") {
            $(".cardNameError").css("display", "block");
            $(".cardNameError").text("Vui lòng nhập tên trên thẻ");
            valid = false;
        } else {
            $(".cardNameError").css("display", "none");
        }

        if (cardExpiry == "") {
            $(".cardExpiryError").css("display", "block");
            $(".cardExpiryError").text("Vui lòng nhập ngày hết hạn");
            valid = false;
        } else {
            $(".cardExpiryError").css("display", "none");
        }

        if (cardCVV == "") {
            $(".cardCVVError").css("display", "block");
            $(".cardCVVError").text("Vui lòng nhập CVV");
            valid = false;
        } else {
            $(".cardCVVError").css("display", "none");
        }
    }

    // Nếu tất cả thông tin hợp lệ, xử lý đơn hàng
    if (valid) {
        infoCart();
    }
};

function infoCart() {
    var thanhtoan;
    var tinh;

    if (document.getElementById("inputthanhtoan").value == 1) {
        thanhtoan = "Thanh toán bằng tiền mặt";
    } else if (document.getElementById("inputthanhtoan").value == 2) {
        thanhtoan = "InternetBanking";
    } else if (document.getElementById("inputthanhtoan").value == 3) {
        thanhtoan = "Thanh toán qua thẻ";
    }

    if (document.getElementById("inputtinh").value == 1) {
        tinh = "Hà Nội";
    } else if (document.getElementById("inputtinh").value == 2) {
        tinh = "Đà Nẵng";
    } else if (document.getElementById("inputtinh").value == 3) {
        tinh = "Hồ Chí Minh";
    }

    // Hiển thị thông tin đơn hàng đã nhập
    document.getElementById("inputnguoinhan1").innerHTML =
        document.getElementById("inputnguoinhan").value;
    document.getElementById("inputsdt1").innerHTML =
        document.getElementById("inputsdt").value;
    document.getElementById("inputdiachi1").innerHTML =
        document.getElementById("inputdiachi").value;
    document.getElementById("inputthanhtoan1").innerHTML = thanhtoan;
    document.getElementById("inputemail1").innerHTML =
        document.getElementById("inputemail").value;
    document.getElementById("inputghichu1").innerHTML =
        document.getElementById("inputghichu").value;

    add_don();
    $(".cartt").attr("data-dismiss", "modal");
    $(".thongtins").css("display", "block");
}

function add_don() {
    var thanhtoan, tinh;

    if (document.getElementById("inputthanhtoan").value == 1) {
        thanhtoan = "Thanh toán bằng tiền mặt";
    } else if (document.getElementById("inputthanhtoan").value == 2) {
        thanhtoan = "InternetBanking";
    } else if (document.getElementById("inputthanhtoan").value == 3) {
        thanhtoan = "Thanh toán qua thẻ";
    }

    if (document.getElementById("inputtinh").value == 1) {
        tinh = "Hà Nội";
    } else if (document.getElementById("inputtinh").value == 2) {
        tinh = "Đà Nẵng";
    } else if (document.getElementById("inputtinh").value == 3) {
        tinh = "Hồ Chí Minh";
    }
}

var item = {
    id: donhang.length + 1,
    user: document.getElementById("inputnguoinhan").value,
    phone: document.getElementById("inputsdt").value,
    address: document.getElementById("inputdiachi").value + "-" + tinh,
    thanhtoan: thanhtoan,
    email: document.getElementById("inputemail").value,
    total: shoppingCart.totalCart(),
    ghichu: document.getElementById("inputghichu").value,
    trangthai: "Đang xử lí",
};

donhang.push(item);
Savedon();

function Savedon() {
    localStorage.setItem("listdon", JSON.stringify(donhang));
}

function showCardInfo() {
    var paymentMethod = document.getElementById("inputthanhtoan").value;
    var cardInfoDiv = document.getElementById("cardInfo");

    if (paymentMethod == 3) {
        cardInfoDiv.style.display = "block";
    } else {
        cardInfoDiv.style.display = "none";
    }
}

function xacnhan() {
    $(".thongtins").css("display", "none");
    $("#xacnhandathang").css("display", "block");
}

// Đơn hàng---
// var shoppingCart = (function() {
//     // =============================
//     // Private methods and propeties
//     // =============================
//     cart = [];

//     // Constructor
//     function Item(id, name , img, price, count) {
//       this.id   = id;
//       this.name = name;
//       this.img = img;
//       this.price = price;
//       this.count = count;
//     }

//     // Save cart
//     function saveCart() {
//       sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
//     }

//       // Load cart
//     function loadCart() {
//       cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
//     }
//     if (sessionStorage.getItem("shoppingCart") != null) {
//       loadCart();
//     }

//     // =============================
//     // Public methods and propeties
//     // =============================
//     var obj = {};

//     // Add to cart
//     obj.addItemToCart = function(id, name , img , price, count) {
//       for(var item in cart) {
//         if(cart[item].id === id) {
//           cart[item].count ++;
//           saveCart();
//           return;
//         }
//       }
//       var item = new Item(id, name, img , price, count);
//       cart.push(item);
//       saveCart();
//     }
//     // Set count from item
//     obj.setCountForItem = function(name, count) {
//       for(var i in cart) {
//         if (cart[i].name === name) {
//           cart[i].count = count;
//           break;
//         }
//       }
//     };
//     // Remove item from cart
//     obj.removeItemFromCart = function(id) {
//         for(var item in cart) {
//           if(cart[item].id === id) {
//             cart[item].count --;
//             if(cart[item].count === 0) {
//               cart.splice(item, 1);
//             }
//             break;
//           }
//       }
//       saveCart();
//     }

//     // Remove all items from cart
//     obj.removeItemFromCartAll = function(id) {
//       for(var item in cart) {
//         if(cart[item].id === id) {
//           cart.splice(item, 1);
//           break;
//         }
//       }
//       saveCart();
//     }

//     // Clear cart
//     obj.clearCart = function() {
//       cart = [];
//       saveCart();
//     }

//     // Count cart
//     obj.totalCount = function() {
//       var totalCount = 0;
//       for(var item in cart) {
//         totalCount += cart[item].count;
//       }
//       return totalCount;
//     }

//     // Total cart
//     obj.totalCart = function() {
//       var totalCart = 0;
//       for(var item in cart) {
//         totalCart += cart[item].price * cart[item].count;
//       }
//       return Number(totalCart.toFixed(0));
//     }

//     // List cart
//     obj.listCart = function() {
//       var cartCopy = [];
//       for(i in cart) {
//         item = cart[i];
//         itemCopy = {};
//         for(p in item) {
//           itemCopy[p] = item[p];

//         }
//         itemCopy.total = Number(item.price * item.count).toFixed(0);
//         cartCopy.push(itemCopy)
//       }
//       return cartCopy;
//     }

//     // cart : Array
//     // Item : Object/Class
//     // addItemToCart : Function
//     // removeItemFromCart : Function
//     // removeItemFromCartAll : Function
//     // clearCart : Function
//     // countCart : Function
//     // totalCart : Function
//     // listCart : Function
//     // saveCart : Function
//     // loadCart : Function
//     return obj;
//   })();
//   var pro = [];

// function saveproduct() {
//     sessionStorage.setItem('shopping', JSON.stringify(pro));
//   }
//     // Load cart
//   function loadproduct() {
//     pro = JSON.parse(sessionStorage.getItem('shopping'));
//   }

//   // *****************************************
//   // Triggers / Events
//   // *****************************************
//   // Add item
//   $('.add-to-cart').click(function(event) {
//     event.preventDefault();
//     var id = $(this).data('id');
//     var name = $(this).data('name');
//     var img = $(this).data('img');
//     var price = Number($(this).data('price'));
//     shoppingCart.addItemToCart(id, name,img, price, 1);
//     displayCart();
//   });

//   // Clear items
//   $('.clear-cart').click(function() {
//     shoppingCart.clearCart();
//       window.location.reload();
//     displayCart();
//   });

//   function displayCart() {
//     var cartArray = shoppingCart.listCart();
//     var output = "";
//     for(var i in cartArray) {
//       output += "<tr class='text-center'>"
//         + "<td><img src='img/" + cartArray[i].img + "' style='width:100px'></td>"
//         + "<td class='name-title'>" + cartArray[i].name + "</td>"
//         + "<td>" + cartArray[i].price + "₫</td>"
//         + "<td><button class='minus-item cart-count input-group-addon btn btn-outline-primary' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">-</button>"
//         +""
//         +  "<button class='btn cart-count'>" +cartArray[i].count+"</button>"
//         + "<button class='plus-item cart-count btn btn-primary input-group-addon' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">+</button>"
//         +"</td>"
//         + "<td>" + cartArray[i].total+ "₫</td>"
//         + "<td><button class='delete-item btn btn-outline-danger' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">X</button></td>"

//         +  "</tr>";
//     }
//     $('.show-cart-1').html(output);
//     $('.total-cart').html(shoppingCart.totalCart());
//     $('.total-count').html(shoppingCart.totalCount());
//   }

//   $('.show-cart-1').on("click", ".delete-item", function(event) {
//     var id = $(this).data('id')
//     shoppingCart.removeItemFromCartAll(id);
//     displayCart();
//   })

//   // -1
//   $('.show-cart-1').on("click", ".minus-item", function(event) {
//     var id = $(this).data('id')
//     shoppingCart.removeItemFromCart(id);
//     displayCart();
//   })
//   // +1
//   $('.show-cart-1').on("click", ".plus-item", function(event) {
//     var id = $(this).data('id')
//     shoppingCart.addItemToCart(id);
//     displayCart();
//   })

//   // Item count input
//   $('.show-cart-1').on("change", ".item-count", function(event) {
//      var id = $(this).data('id');
//      var count = Number($(this).val());
//     shoppingCart.setCountForItem(id, count);
//     displayCart();
//   });
//   displayCart();
//   var info= [];
//   var donhang =[];
//   function Savedon(){
//     localStorage.setItem('listdon',JSON.stringify(donhang))
//     }

// //lấy sản phẩm
// function loaddon(){
// donhang = JSON.parse(localStorage.getItem('listdon'));
// }

// if (localStorage.getItem("listdon") == null) {
// Savedon();
// }
// var checkCart= function(){
//   if ((document.getElementById("inputnguoinhan").value=="")){
//     $(".nguoinhan").css("display","block");
//   }else{
//     $(".nguoinhan").css("display","none");
//   }
//   if ((document.getElementById("inputsdt").value=="")){
//     $(".sdt").css("display","block");
//   }else{
//     $(".sdt").css("display","none");
//   }

//   if ((document.getElementById("inputdiachi").value=="")){
//     $(".diachi").css("display","block");
//   }else{
//     $(".diachi").css("display","none");
//   }
//   if ((document.getElementById("inputthanhtoan").value==0)){
//     $(".thanhtoan").css("display","block");
//   }
//   else{
//     $(".thanhtoan").css("display","none");
//   }
//   if ((document.getElementById("inputtinh").value==0)){
//     $(".tinh").css("display","block");
//   }
//   else{
//     $(".tinh").css("display","none");
//   }
//   if ((document.getElementById("inputemail").value=="")){
//     $(".email").css("display","block");
//   }
//   else{
//     $(".email").css("display","none");
//   }
//   if ((document.getElementById("inputnguoinhan").value!="")&&(document.getElementById("inputsdt").value!="")&&(document.getElementById("inputdiachi").value!="")&&(document.getElementById("inputemail").value!="")){

//     infoCart();
//  }
// }
// var add_don = function(){
//   var thanhtoan;
//   var tinh;

//       if (document.getElementById("inputthanhtoan").value==1){
//           thanhtoan ="Thanh toán bằng tiền mặt";
//       }
//       if (document.getElementById("inputthanhtoan").value==2){
//           thanhtoan ="InternetBanking";
//       }
//       if (document.getElementById("inputthanhtoan").value==3){
//           thanhtoan ="Visa Card";
//       }
//       if (document.getElementById("inputthanhtoan").value==4){
//           thanhtoan ="Paypal";
//       }
//       if (document.getElementById("inputtinh").value==1){
//           tinh ="Hà Nội";
//       }
//       if (document.getElementById("inputtinh").value==2){
//           tinh ="Đà Nẵng";
//       }
//       if (document.getElementById("inputtinh").value==3){
//           tinh ="Hồ Chí Minh";
//       }
//       if (document.getElementById("inputtinh").value==4){
//           tinh ="Bình Định";
//       }
//       if (document.getElementById("inputtinh").value==5){
//           tinh ="Quảng Ngãi";
//       }
//       loaddon();
//   var item = {
//     id : donhang.length+1,
//     user : document.getElementById("inputnguoinhan").value,
//     phone:document.getElementById("inputsdt").value,
//     address :document.getElementById("inputdiachi").value +"-"+ tinh ,
//     thanhtoan : thanhtoan,
//     email: document.getElementById("inputemail").value,
//     total :shoppingCart.totalCart(),
//     ghichu: document.getElementById("inputghichu").value,
//     trangthai : "Đang xử lí",
//   }
//   loaddon();
//   donhang.push(item);

//   Savedon();
// }

//   function xacnhan(){
//     $(".thongtins").css("display","none");
//     $("#xacnhandathang").css("display","block")
//   }
//   function infoCart(){
//     var thanhtoan;
//     var tinh;

//         if (document.getElementById("inputthanhtoan").value==1){
//             thanhtoan ="Thanh toán bằng tiền mặt";
//         }
//         if (document.getElementById("inputthanhtoan").value==2){
//             thanhtoan ="InternetBanking";
//         }
//         if (document.getElementById("inputthanhtoan").value==3){
//             thanhtoan ="Visa Card";
//         }
//         if (document.getElementById("inputthanhtoan").value==4){
//             thanhtoan ="Paypal";
//         }
//         if (document.getElementById("inputtinh").value==1){
//             tinh ="Hà Nội";
//         }
//         if (document.getElementById("inputtinh").value==2){
//             tinh ="Đà Nẵng";
//         }
//         if (document.getElementById("inputtinh").value==3){
//             tinh ="Hồ Chí Minh";
//         }
//         if (document.getElementById("inputtinh").value==4){
//             tinh ="Bình Định";
//         }
//         if (document.getElementById("inputtinh").value==5){
//             tinh ="Quảng Ngãi";
//         }

//         document.getElementById("inputnguoinhan1").innerHTML=document.getElementById("inputnguoinhan").value;
//         document.getElementById("inputsdt1").innerHTML = document.getElementById("inputsdt").value;
//         document.getElementById("inputdiachi1").innerHTML= document.getElementById("inputdiachi").value +"-"+ tinh ,
//         document.getElementById("inputthanhtoan1").innerHTML = thanhtoan,

//         document.getElementById("inputemail1").innerHTML= document.getElementById("inputemail").value,
//         document.getElementById("inputghichu1").innerHTML =document.getElementById("inputghichu").value;
//         add_don();
//         $(".cartt").attr("data-dismiss", "modal");
//         $(".thongtins").css("display","block");
//       }
// // Đơn hàng---
