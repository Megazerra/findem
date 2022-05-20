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
        window.location.href = "html/friends.html";
    }, 200);
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
            console.log(id);
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
        xhttp.send("i=" + params + "&lat=" + lat + "&long=" + long + "&link=no");
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
function chats() {
    var div = document.getElementById('inside');
    var div2 = document.getElementById('me');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var userName = xmlDoc.getElementsByTagName('userName');
            var me = xmlDoc.getElementsByTagName('user');
            var nombre = xmlDoc.getElementsByTagName('nombre');
            var apellido = xmlDoc.getElementsByTagName('apellido');
            var foto = xmlDoc.getElementsByTagName('foto');
            for (var i = 0; i < userName.length; i++) {
                var divuser = document.createElement('div');
                divuser.id = userName[i].childNodes[0].nodeValue;
                divuser.style.cursor = "pointer";
                var h3 = document.createElement('h3');
                var usern = document.createTextNode(userName[i].childNodes[0].nodeValue);
                // var base64blob:any = foto[i].childNodes[0].nodeValue;
                //  var image = document.createElement('img');
                // image.src = 'data:image/png;base64,'+ encode64(userName[i].childNodes[0].nodeValue);
                // div.appendChild(image);
                h3.appendChild(usern);
                divuser.appendChild(h3);
                div.appendChild(divuser);
                divuser.setAttribute('onclick', "mostrarId(" + userName[i].childNodes[0].nodeValue + ")");
            }
            var h3 = document.createElement('h3');
            var usern = document.createTextNode(me[0].childNodes[0].nodeValue);
            h3.appendChild(usern);
            div2.appendChild(h3);
        }
    };
    xhttp.open("POST", "../php/chats.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=");
}
function mostrarId(id) {
    // alert(id.innerText);
    var div = document.getElementById('mens');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            console.log(this.responseText);
            var idA = xmlDoc.getElementsByTagName('idChatA');
            var idE = xmlDoc.getElementsByTagName('idEmisorA');
            var idR = xmlDoc.getElementsByTagName('idRemitenteA');
            var us = xmlDoc.getElementsByTagName('usuario');
            var mensajeA = xmlDoc.getElementsByTagName('mensajeA');
            var msg = xmlDoc.getElementsByTagName('msg');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            var enviar = document.createElement('input');
            enviar.classList.add('enviar');
            enviar.placeholder = "enviar un mensaje...";
            for (var i = 0; i < msg.length; i++) {
                var p = document.createElement('p');
                var men = document.createTextNode(mensajeA[i].childNodes[0].nodeValue);
                if (idE[i].childNodes[0].nodeValue != us[0].childNodes[0].nodeValue) {
                    p.classList.add("enviado");
                }
                else {
                    p.classList.add("enviado2");
                }
                p.appendChild(men);
                div.appendChild(p);
                div.appendChild(enviar);
            }
            enviar.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var parser = new DOMParser();
                            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
                            console.log(this.responseText);
                        }
                    };
                    event.preventDefault();
                    var params = id.innerText + "-" + enviar.value;
                    xhttp.open("POST", "../php/insertMensaje.php", true);
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhttp.send("i=" + params);
                    while (div.firstChild) {
                        div.removeChild(div.firstChild);
                    }
                }
            });
        }
    };
    xhttp.open("POST", "../php/missatges.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + id.innerText);
}
// console.log(mensaje[i].childNodes[0].nodeValue+"--"+id[i].childNodes[0].nodeValue);
// console.log(mensajeA[i].childNodes[0].nodeValue+"--"+idA[i].childNodes[0].nodeValue);
