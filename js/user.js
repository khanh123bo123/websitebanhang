var user = [
    {
        id: "USER1",
        username: "admin",
        sdt: "0338927972",
        email: "tuan123.@gmail",
        address: "Châu Thành - Tây Ninh",
        password: "1",
        role: "admin",
    },
    {
        id: "USER2",
        username: "user",
        name: "Nguyễn Thị Việt Ánh",
        sdt: "0389785322",
        email: "vietanh7200@gmail",
        address: "Châu Thành - Tây Ninh",
        password: "1",
        role: "user",
    },
];

// đẩy mảng user vào local
var saveUser = function () {
    localStorage.setItem("listUser", JSON.stringify(user));
};
//lấy list user
var loadUser = function () {
    user = JSON.parse(localStorage.getItem("listUser"));
};
if (localStorage.getItem("listUser") != null) {
    loadUser();
}
saveUser();
// chức năng đăng kí
var checkSignin = function () {
    if (
        document.getElementById("usernamed").value == "" ||
        document.getElementById("hotend").value == "" ||
        document.getElementById("sdtd").value == "" ||
        document.getElementById("passwordd").value == "" ||
        document.getElementById("emaild").value == ""
    ) {
        $(".require-login").css("display", "block");
    } else {
        $(".require-login").css("display", "none");
        signIn();
    }
};
var signIn = function () {
    var User = {
        id: "USER" + parseInt(user.length + 1),
        username: document.getElementById("usernamed").value,
        name: document.getElementById("hotend").value,
        sdt: document.getElementById("sdtd").value,
        password: document.getElementById("passwordd").value,
        email: document.getElementById("emaild").value,
        address: "",
        role: "user",
    };
    alert("Đăng kí thành công");
    user.push(User);
    localStorage.setItem("listUser", JSON.stringify(user));
    window.location.reload();
};
var signupArr = [];
var saveLogin = function () {
    localStorage.setItem("signup", JSON.stringify(signupArr));
};

var loadLogin = function () {
    signupArr = JSON.parse(localStorage.getItem("signup"));
};
if (localStorage.getItem("signup") != null) {
    loadLogin();
}
saveLogin();
var checksignup = function () {
    if (
        document.getElementById("name").value == "" ||
        document.getElementById("password").value == ""
    ) {
        $(".require-login").css("display", "block");
    } else {
        $(".require-login").css("display", "none");
        signUp();
    }
};
var signUp = function () {
    var k = -1;
    // var User1 ="";
    for (var i in user) {
        var data = JSON.parse(JSON.stringify(user[i]));

        if (
            document.getElementById("name").value == data.username &&
            document.getElementById("password").value == data.password &&
            data.role == "admin"
        ) {
            k = i;
            alert("đăng nhập thành công");

            window.location.href = "../admin/trangchu.html";
        }
        if (
            document.getElementById("name").value == data.username &&
            document.getElementById("password").value == data.password &&
            data.role == "user"
        ) {
            alert("đăng nhập thành công");
            k = i;
            window.location.href = "../user/info.html";

            var userLogin = {
                username: document.getElementById("name").value,
                password: document.getElementById("password").value,
            };

            signupArr.push(userLogin);

            localStorage.setItem("signup", JSON.stringify(signupArr));

            saveLogin();
        }
    }

    if (k == -1) {
        alert("đăng nhập không thành công");
    }
};

function validateForm() {
    let valid = true;

    // Kiểm tra họ tên
    var hoten = document.getElementById("hoten").value;
    if (hoten === "") {
        document.getElementById("hoten-error").innerText =
            "Họ tên không được bỏ trống!";
        valid = false;
    } else {
        document.getElementById("hoten-error").innerText = "";
    }

    // Kiểm tra số điện thoại
    var sdt = document.getElementById("sdt").value;
    var phonePattern = /^[0-9]{10,11}$/; // Kiểm tra số điện thoại có 10 hoặc 11 chữ số
    if (sdt === "") {
        document.getElementById("sdt-error").innerText =
            "Số điện thoại không được bỏ trống!";
        valid = false;
    } else if (!phonePattern.test(sdt)) {
        document.getElementById("sdt-error").innerText =
            "Số điện thoại không hợp lệ!";
        valid = false;
    } else {
        document.getElementById("sdt-error").innerText = "";
    }

    // Kiểm tra email
    var email = document.getElementById("email").value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Định dạng email
    if (email === "") {
        document.getElementById("email-error").innerText =
            "Email không được bỏ trống!";
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("email-error").innerText =
            "Email không hợp lệ!";
        valid = false;
    } else {
        document.getElementById("email-error").innerText = "";
    }

    // Kiểm tra địa chỉ
    var diachi = document.getElementById("diachi").value;
    if (diachi === "") {
        document.getElementById("diachi-error").innerText =
            "Địa chỉ không được bỏ trống!";
        valid = false;
    } else {
        document.getElementById("diachi-error").innerText = "";
    }

    // Nếu tất cả hợp lệ, có thể thực hiện các hành động tiếp theo (submit form, v.v.)
    if (valid) {
        alert("Đã gửi thành công!");
        // Ở đây có thể thực hiện thêm các hành động như gửi form, lưu thông tin, v.v.
    }
}

function getName() {
    for (var i in user) {
        if (String(user[i].username) == String(signupArr[0].username)) {
            document.getElementById("matkhau").innerHTML =
                '<button class="btn btn-outline-danger" onclick="changePassword(' +
                i +
                ')">Đổi</buttoon>';
            document.getElementById("thanh2").innerHTML = user[i].name;
            document.getElementById("username").value = user[i].username;
            document.getElementById("hoten").value = user[i].name;
            document.getElementById("sdt").value = user[i].sdt;
            document.getElementById("email").value = user[i].email;
            document.getElementById("diachi").value = user[i].address;

            document.getElementById("update").innerHTML =
                '<button type="submit" class="mt-3 btn btn-outline-danger" onclick="validateForm(); updateInfo(' +
                i +
                ')">Cập nhật thông tin</button>';
        }
    }
    document.getElementById("doimk").innerHTML =
        '<button class="mt-2 btn btn-outline-danger"  type="button" data-toggle="modal" data-target="#changePassword">Đổi password</button>';
    document.getElementById("lsmh").innerHTML =
        '<a href="history.html" class="mt-2 btn btn-outline-danger">Lịch sử mua hàng</a>';

    document.getElementById("username").setAttribute("disabled", "disabled");
}
getName();

function updateInfo(i) {
    var h = user[i];

    (h.name = document.getElementById("hoten").value),
        (h.sdt = document.getElementById("sdt").value),
        (h.email = document.getElementById("email").value),
        (h.address = document.getElementById("diachi").value),
        localStorage.setItem("listUser", JSON.stringify(user));
}

function changePassword(i) {
    var k = user[i];

    if (
        document.getElementById("oldpass").value == k.password &&
        document.getElementById("newpass").value ==
            document.getElementById("changepass").value
    ) {
        alert("đổi mật khẩu thành công");

        (k.password = document.getElementById("newpass").value),
            localStorage.setItem("listUser", JSON.stringify(user));
        window.location.reload();
    }

    if (document.getElementById("oldpass").value != k.password) {
        alert("mật khẩu cũ không đúng");
    }
    if (
        document.getElementById("newpass").value !=
        document.getElementById("changepass").value
    ) {
        alert("nhập lại mật khẩu không đúng");
    }
}

function checkLogin() {
    var check = signupArr;

    if (check != "") {
        window.location.href = "./user/info.html";
    }

    if (check == "") {
        window.location.href = "./user/signup.html";
    }
}
function checktocart() {
    var check = signupArr;

    if (check != "") {
        window.location.href = "#";
    }

    if (check == "") {
        window.location.href = "./user/signup.html";
    }
}
function logOut() {
    signupArr = [];
    localStorage.setItem("signup", JSON.stringify(signupArr));
    saveLogin();
}
// var user =
//     [
//         {
//             id: "USER1",
//             username: "admin",
//             sdt: "0338927972",
//             email: "tuan123.@gmail",
//             address: "Châu Thành - Tây Ninh",
//             password: "1",
//             role: "admin"

//         },
//     ];

// // đẩy mảng user vào local
//     var saveUser =function (){
//          localStorage.setItem('listUser',JSON.stringify(user))
//      }
//     //lấy list user
//      var loadUser = function(){
//          user = JSON.parse(localStorage.getItem('listUser'))
//      }
//      if (localStorage.getItem("listUser")!=null){

//         loadUser();
//      }
//      saveUser();
// // chức năng đăng kí
//      var checkSignin = function(){
//          if ((document.getElementById("usernamed").value=="")||
//          (document.getElementById("hotend").value=="")||(document.getElementById("sdtd").value=="")||
//          (document.getElementById("passwordd").value=="")||(document.getElementById("emaild").value=="") ){
//             $(".require-login").css("display","block");
//          }
//          else{
//             $(".require-login").css("display","none");
//             signIn();
//          }
//      }
//      var signIn = function (){
//          var User = {
//              id: "USER"+parseInt( user.length+1),
//              username: document.getElementById("usernamed").value,
//              name: document.getElementById("hotend").value,
//              sdt : document.getElementById("sdtd").value,
//              password:  document.getElementById("passwordd").value,
//              email:  document.getElementById("emaild").value,
//              address:"",
//              role : "user",
//          }
//          alert("Đăng kí thành công");
//          user.push(User);
//          localStorage.setItem('listUser',JSON.stringify(user));
// 			window.location.reload();
//      }
//      var signupArr = [];
//      var saveLogin =function (){
//         localStorage.setItem('signup',JSON.stringify(signupArr))
//     }

//      var loadLogin = function(){
//         signupArr = JSON.parse(localStorage.getItem('signup'))
//     }
//     if (localStorage.getItem("signup")!=null){

//         loadLogin();
//     }
// saveLogin();
//     var checksignup = function(){
//         if ((document.getElementById("name").value=="")||(document.getElementById("password").value=="")){
//             $(".require-login").css("display","block");
//         }
//         else{
//             $(".require-login").css("display","none");
//             signUp();
//         }
//     }
//         var signUp = function(){
//             var k=-1;
//             // var User1 ="";
//             for (var i in user){
//                 var data = JSON.parse(JSON.stringify(user[i]))

//                 if (
//                     ((document.getElementById("name").value == data.username) &&
//                         (document.getElementById("password").value == data.password)
//                         && (data.role == "admin")
//                     )
//                 ) {
//                     k = i;
//                     alert("đăng nhập thành công");

//                     window.location.href = '../admin/trangchu.html';

//                 }
//                 if (
//                     ((document.getElementById("name").value == data.username) &&
//                         (document.getElementById("password").value == data.password)
//                         && (data.role == "user")
//                     )
//                 ) {

//                             alert("đăng nhập thành công");
//                                k=i;
//                                 window.location.href = '../user/info.html';

//                                 var userLogin = {
//                                     username: document.getElementById("name").value,
//                                     password: document.getElementById("password").value
//                                 }

//                                 signupArr.push(userLogin);

//                                 localStorage.setItem('signup',JSON.stringify(signupArr));

//                                 saveLogin();

//                 }
//             }

//             if (k == -1) {
//                 alert("đăng nhập không thành công");
//             }

//         }

// function getName () {
//     for (var i in user) {
//         if(String(user[i].username) == String(signupArr[0].username)) {
//             document.getElementById("matkhau").innerHTML='<button class="btn btn-outline-danger" onclick="changePassword('+i+')">Đổi</buttoon>';
//             document.getElementById("thanh2").innerHTML=user[i].name;
//             document.getElementById("username").value=user[i].username;
//             document.getElementById("hoten").value=user[i].name;
//             document.getElementById("sdt").value=user[i].sdt;
//             document.getElementById("email").value=user[i].email;
//             document.getElementById("diachi").value=user[i].address;

//          document.getElementById("update").innerHTML='<button type="submit" class="mt-3 btn btn-outline-danger" onclick="updateInfo('+i+')">Cập nhật thông tin</button>';

//         }
//     }
//     document.getElementById("doimk").innerHTML='<button class="mt-2 btn btn-outline-danger"  type="button" data-toggle="modal" data-target="#changePassword">Đổi password</button>';

//     document.getElementById("username").setAttribute("disabled","disabled");

// }
// getName();

// function updateInfo(i){
//     alert("Cập nhật thành công");
//    var h = user[i];

//    h.name = document.getElementById("hoten").value,
//    h.sdt = document.getElementById("sdt").value,

//    h.email = document.getElementById("email").value,
//    h.address = document.getElementById("diachi").value,

//    localStorage.setItem('listUser',JSON.stringify(user));
//    window.location.reload();

// }

// function changePassword(i){
//     var k = user[i];

//     if (
//         (document.getElementById("oldpass").value == k.password )&&( document.getElementById("newpass").value == document.getElementById("changepass").value)
//          ){

//     alert("đổi mật khẩu thành công");

//    k.password = document.getElementById("newpass").value,

//     localStorage.setItem('listUser',JSON.stringify(user));
//     window.location.reload();
//     }

//     if (document.getElementById("oldpass").value != k.password)
//     {
//         alert("mật khẩu cũ không đúng");
//     }
//     if (document.getElementById("newpass").value != document.getElementById("changepass").value)

//     {
//         alert("nhập lại mật khẩu không đúng");
//     }

// }

// function checkLogin(){

// var check = signupArr;

// if (check !=""){
//     window.location.href = './user/info.html';

// }

// if (check =="")
//     {
//     window.location.href = './user/signup.html';
// }

// }
// function logOut () {
//     signupArr = [];
//     localStorage.setItem('signup',JSON.stringify(signupArr));
//     saveLogin();

// }
