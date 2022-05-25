"use strict";
function redirect() {
    window.location.href = "../html/login.html";
}
function redirect3() {
    window.location.href = "../html/register.html";
}
function redirect4() {
    window.location.href = "/html/perfil.html";
}
function redirect2() {
    cargar();
    setTimeout(function () {
        volver();
        window.location.href = "html/friends.html";
    }, 200);
}
function refresh(iden) {
    var div = document.getElementById('mens');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    mostrarId(iden);
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
            for (var i = 0; i < userName.length; i++) {
                var divuser = document.createElement('div');
                divuser.id = userName[i].childNodes[0].nodeValue;
                divuser.style.cursor = "pointer";
                var x = xmlDoc.getElementsByTagName("foto")[i].childNodes[0].nodeValue;
                var a = document.createElement("img");
                a.setAttribute('class', 'image');
                a.src = x;
                var h3 = document.createElement('h3');
                var usern = document.createTextNode(userName[i].childNodes[0].nodeValue);
                h3.appendChild(usern);
                // divuser.appendChild(image)
                divuser.appendChild(a);
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
    var div = document.getElementById('mens');
    var div2 = document.getElementById('ge3');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            console.log(this.responseText);
            var enviar = document.createElement('input');
            enviar.classList.add('enviar');
            enviar.placeholder = "enviar un mensaje...";
            div2.appendChild(enviar);
            if (this.responseText == "0") {
                var h2 = document.createElement('h2');
                var txt = document.createTextNode('No tienes mensajes todavía.');
                h2.appendChild(txt);
                div.appendChild(h2);
                h2.style.opacity = "0.4";
                h2.style.textAlign = "center";
                h2.style.marginTop = "300px";
            }
            else {
                var idA = xmlDoc.getElementsByTagName('idChatA');
                var idE = xmlDoc.getElementsByTagName('idEmisorA');
                var idR = xmlDoc.getElementsByTagName('idRemitenteA');
                var us = xmlDoc.getElementsByTagName('usuario');
                var mensajeA = xmlDoc.getElementsByTagName('mensajeA');
                var msg = xmlDoc.getElementsByTagName('msg');
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
                    div.scroll({
                        top: 10000,
                        behavior: 'smooth'
                    });
                }
            }
            enviar.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var parser = new DOMParser();
                            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
                        }
                    };
                    event.preventDefault();
                    var params = id.innerText + "-" + enviar.value;
                    xhttp.open("POST", "../php/insertMensaje.php", true);
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhttp.send("i=" + params);
                    refresh(id);
                }
            });
        }
    };
    xhttp.open("POST", "../php/missatges.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + id.innerText);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function showPeople(user) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var userName = xmlDoc.getElementsByTagName('userName');
            var me = xmlDoc.getElementsByTagName('user');
            var nombre = xmlDoc.getElementsByTagName('nombre');
            var apellido = xmlDoc.getElementsByTagName('apellido');
            var div = document.getElementById('test');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            if (user === '') {
                var idea = document.getElementById('idea');
                idea.style.visibility = "hidden";
            }
            else {
                var idea = document.getElementById('idea');
                idea.style.visibility = "visible";
            }
            for (var i = 0; i < userName.length; i++) {
                var h1 = document.createElement('h1');
                var txt = document.createTextNode(userName[i].childNodes[0].nodeValue);
                h1.appendChild(txt);
                div.appendChild(h1);
            }
        }
    };
    xhttp.open("POST", "../php/show.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + user);
}
function perfil() {
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
            var div = document.getElementById('ima');
            var div2 = document.getElementById('tex');
            var input = document.createElement('input');
            input.type = "submit";
            input.value = "Crear";
            input.setAttribute('class', 'añadir');
            input.setAttribute('data-toggle', 'tooltip');
            input.setAttribute('data-placement', 'top');
            input.setAttribute('title', 'añadir publicacion');
            input.onclick = function () { publicaciones(); };
            var h3 = document.createElement('h3');
            var h5 = document.createElement('h5');
            h5.setAttribute('class', 'name');
            var x = xmlDoc.getElementsByTagName("foto")[0].childNodes[0].nodeValue;
            var a = document.createElement("img");
            a.setAttribute('class', 'perf');
            a.src = x;
            var user = document.createTextNode("@" + userName[0].childNodes[0].nodeValue);
            var name = document.createTextNode(nombre[0].childNodes[0].nodeValue + apellido[0].childNodes[0].nodeValue);
            h3.appendChild(user);
            h5.appendChild(name);
            div2.appendChild(h3);
            div2.appendChild(h5);
            div2.appendChild(input);
            div.appendChild(a);
        }
    };
    xhttp.open("POST", "../php/perfil.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=");
    showpublis();
}
var desc = 0;
function publicaciones() {
    var div = document.getElementById('add');
    var descripcion = document.createElement('input');
    descripcion.placeholder = "Descripcion";
    descripcion.id = "Descripcion";
    var lugar = document.createElement('input');
    lugar.placeholder = "Lugar";
    lugar.id = "lugar";
    var archivo = document.createElement('input');
    archivo.type = "file";
    archivo.id = "file";
    archivo.name = "file";
    var button = document.createElement('input');
    button.type = "submit";
    button.value = "Crear";
    descripcion.setAttribute('class', 'addi');
    lugar.setAttribute('class', 'addi');
    archivo.setAttribute('class', 'addi');
    button.setAttribute('class', 'añadirbtn');
    button.onclick = function () { añadirpubli(); };
    if (desc == 0) {
        div.appendChild(archivo);
        div.appendChild(descripcion);
        div.appendChild(lugar);
        div.appendChild(button);
        desc++;
    }
    else {
        div.innerText = '';
        desc = 0;
    }
}
function añadirpubli() {
    var div = document.getElementById('add');
    var desc = document.getElementById('Descripcion');
    var lugar = document.getElementById('lugar');
    var file = document.getElementById('file');
    var formData = new FormData();
    formData.append("image", file.files[0]);
    formData.append("descripcion", desc.value);
    formData.append("lugar", lugar.value);
    fetch("../php/publicaciones.php", {
        method: 'POST',
        body: formData,
    })
        .then(function (respuesta) { return respuesta.text(); })
        .then(function (decodificado) {
        console.log(decodificado);
    });
}
function showpublis() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var div = document.getElementById('row');
            var id = xmlDoc.getElementsByTagName('idPost');
            for (var i = 0; i < xmlDoc.getElementsByTagName("archivo").length; i++) {
                var div2 = document.createElement('div');
                div2.setAttribute('class', 'col-md-4');
                var x = xmlDoc.getElementsByTagName("archivo")[i].childNodes[0].nodeValue;
                var a = document.createElement("img");
                a.setAttribute('class', 'publicacion');
                a.src = x;
                a.id = id[i].childNodes[0].nodeValue;
                a.setAttribute('onclick', "mostrarPubli(" + id[i].childNodes[0].nodeValue + ")");
                div.appendChild(div2);
                div2.appendChild(a);
            }
        }
    };
    xhttp.open("POST", "../php/showpubli.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=");
}
function mostrarPubli(id) {
    var div = document.getElementById('foto');
    var oscu = document.getElementById('gen');
    oscu.style.opacity = "0.5";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var div = document.getElementById('foto');
            div.style.display = "block";
            var id = xmlDoc.getElementsByTagName('idPost');
            var desc = xmlDoc.getElementsByTagName('descripcion');
            var lugar = xmlDoc.getElementsByTagName('lugar');
            var input = document.createElement('input');
            input.type = "submit";
            input.setAttribute('class', 'cerrar');
            input.value = "cerrar";
            input.onclick = function () {
                div.style.display = "none";
                oscu.style.opacity = "1";
            };
            var div2 = document.createElement('div');
            // div2.setAttribute('class', 'col-md-4');
            div2.style;
            var x = xmlDoc.getElementsByTagName("archivo")[0].childNodes[0].nodeValue;
            var a = document.createElement("img");
            a.setAttribute('class', 'publicacion2');
            a.src = x;
            var div3 = document.createElement('div');
            var h3 = document.createElement('h3');
            var descripcion = document.createTextNode(desc[0].childNodes[0].nodeValue);
            h3.setAttribute('class', 'desc');
            var h32 = document.createElement('h3');
            var sitio = document.createTextNode(lugar[0].childNodes[0].nodeValue);
            h32.setAttribute('class', 'desc');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            h3.appendChild(descripcion);
            h32.appendChild(sitio);
            div3.appendChild(h3);
            div3.appendChild(h32);
            div2.appendChild(a);
            div2.appendChild(input);
            div.appendChild(div2);
            div.appendChild(div3);
        }
    };
    xhttp.open("POST", "../php/showpubliconcreta.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + id);
}
