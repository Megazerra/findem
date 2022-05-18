"use strict";
var Swal;
// function renderButton() {
//   gapi.signin2.render('gSignIn', {
//       'scope': 'profile email',
//       'width': 240,
//       'height': 50,
//       'longtitle': true,
//       'theme': 'dark',
//       'onsuccess': onSuccess,
//       'onfailure': onFailure
//   });
// }
// // Sign-in success callback
// function onSuccess(googleUser) {
//   // Get the Google profile data (basic)
//   //var profile = googleUser.getBasicProfile();
//   // Retrieve the Google account data
//   gapi.client.load('oauth2', 'v2', function () {
//       var request = gapi.client.oauth2.userinfo.get({
//           'userId': 'me'
//       });
//       request.execute(function (resp) {
//           // Display the user details
//           var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
//           profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" href="'+resp.link+'">click to view profile</a></p>';
//           document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
//           document.getElementById("gSignIn").style.display = "none";
//           document.getElementsByClassName("userContent")[0].style.display = "block";
//       });
//   });
// }
// // Sign-in failure callback
// function onFailure(error) {
//   alert(error);
// }
// // Sign out the user
// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//       document.getElementsByClassName("userContent")[0].innerHTML = '';
//       document.getElementsByClassName("userContent")[0].style.display = "none";
//       document.getElementById("gSignIn").style.display = "block";
//   });
//   auth2.disconnect();
// }
function redirect() {
    window.location.href = "../html/login.html";
}
function redirect3() {
    window.location.href = "../html/register.html";
}
function redirect2() {
    cargar();
    setTimeout(function () {
        volver();
    }, 200);
    window.location.href = "../html/friends.html";
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // console.lognavigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("GEOLOCALITZACIÓ DESACTIVADA");
    }
}
// ------- Mostrar nuestra posición segun el navegador
function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var id = this.responseText;
            if (id == '1') {
                Swal.fire({
                    icon: 'success',
                    title: 'Conseguido',
                    text: 'Usuario creado correctamente.'
                }).then(function (result) {
                    if (result.isConfirmed) {
                        window.location.href = "../index.html";
                    }
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El nombre de usuario o el email ha sido utilizado.'
                });
            }
        }
    };
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var mail = document.getElementById("mail");
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var r_password = document.getElementById("r_password");
    var latitud = localStorage.getItem("latitud");
    var longitud = localStorage.getItem("longitud");
    console.log(password.value.length);
    if (password.value != r_password.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden.'
        });
    }
    else if (password.value.length <= 8) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La contraseña debe contener un mínimo de 8 caracteres'
        });
    }
    else {
        var params = username.value + "-" + nombre.value + "-" + apellido.value + "-" + password.value + "-" + mail.value + "-" + "user";
        xhttp.open("POST", "../php/register.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("i=" + params + "&lat=" + lat + "&long=" + long);
    }
}
function login() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sqlLogin);
        // console.lognavigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("GEOLOCALITZACIÓ DESACTIVADA");
    }
}
function sqlLogin(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var id = this.responseText;
            console.log(id);
            if (id == '1') {
                cargar();
                setTimeout(function () {
                    volver();
                    window.location.href = "../index.html";
                }, 200);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El usuario no existe o los datos estan mal introducidos'
                });
            }
        }
    };
    var identifier = document.getElementById('l_username');
    var password = document.getElementById('l_password');
    var params = identifier.value + "-" + password.value;
    console.log(params);
    xhttp.open("POST", "../php/login.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + params + "&lat=" + lat + "&long=" + long);
}
function cargar() {
    var body = document.getElementById("cont");
    body.style.opacity = "0.2";
    var loader = document.getElementById('loader');
    loader.style.visibility = "visible";
    loader.style.opacity = "1 !important";
}
function volver() {
    var body = document.getElementById("cont");
    body.style.opacity = "1";
    var loader = document.getElementById('loader');
    loader.style.visibility = "hidden";
}
