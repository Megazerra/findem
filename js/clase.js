"use strict";
function cerrar() {
    window.location.href = "./html/login.html";
}
function borrar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", "../php/cerrarSession.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("");
}
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
    console.log("2:" + iden.innerText);
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
var defi;
function mostrarId(id) {
    // alert(id.innerText);
    defi = id;
    var padre = document.getElementById('padre');
    padre.setAttribute('class', 'padre box-shadow pulse');
    setTimeout(function () {
        padre.setAttribute('class', 'padre box-shadow');
    }, 100);
    var div = document.getElementById('mens');
    var div2 = document.getElementById('ge3');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            // console.log(this.responseText);
            if (this.responseText == "0") {
                var h2 = document.createElement('h2');
                h2.setAttribute('class', 'text-pop-up-top');
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
                    p.style.wordWrap = "break-word";
                    var men = document.createTextNode(mensajeA[i].childNodes[0].nodeValue);
                    if (idE[i].childNodes[0].nodeValue != us[0].childNodes[0].nodeValue) {
                        var container = document.createElement('div');
                        container2.id = "container2";
                        var container2 = document.createElement('div');
                        container.setAttribute('class', 'inlineContainer');
                        container2.setAttribute('class', 'otherBubble other slide-in-left');
                        p.appendChild(men);
                        container2.appendChild(p);
                        container.appendChild(container2);
                    }
                    else {
                        var container = document.createElement('div');
                        var container2 = document.createElement('div');
                        container.setAttribute('class', 'inlineContainer own');
                        container2.setAttribute('class', 'ownBubble own slide-in-right');
                        p.appendChild(men);
                        container2.appendChild(p);
                        container.appendChild(container2);
                    }
                    div.appendChild(container);
                    padre.scrollTo(0, padre.scrollHeight);
                }
            }
        }
    };
    xhttp.open("POST", "../php/missatges.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + id.innerText);
    var enviar = document.getElementById('w-input-text');
    var hola = 0;
    enviar.addEventListener("keyup", function (event) {
        if (event.key === "Enter" && enviar.innerText != "") {
            console.log(defi);
            hola++;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
                }
            };
            var params = defi.innerText + "-" + enviar.innerText;
            console.log("contador: " + hola);
            xhttp.open("POST", "../php/insertMensaje.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("i=" + params);
            enviar.innerText = "";
            setTimeout(function () {
                refresh(defi);
            }, 300);
            event.preventDefault();
        }
    });
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
            console.log(this.responseText);
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
                h1.id = userName[i].childNodes[0].nodeValue;
                h1.setAttribute('onclick', "mostrarPerfil(" + userName[i].childNodes[0].nodeValue + ")");
                h1.appendChild(txt);
                div.appendChild(h1);
            }
        }
    };
    xhttp.open("POST", "../php/show.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + user);
}
function mostrarPerfil(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var userName = xmlDoc.getElementsByTagName('userName');
            var me = xmlDoc.getElementsByTagName('user');
            var nombre = xmlDoc.getElementsByTagName('nombre');
            var apellido = xmlDoc.getElementsByTagName('apellido');
            var foto = xmlDoc.getElementsByTagName('foto');
            var div = document.getElementById('ima2');
            var div2 = document.getElementById('tex2');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            while (div2.firstChild) {
                div2.removeChild(div2.firstChild);
            }
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
            div.appendChild(a);
        }
        ;
    };
    xhttp.open("POST", "../php/perfilA.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + id.innerText);
    showpublis2(id);
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
            input.type = "image";
            input.value = 'crar';
            input.src = '../imgs/add.svg';
            var input2 = document.createElement('input');
            input2.type = "image";
            input2.src = '../imgs/conf.svg';
            input2.value = "Configurar";
            input.setAttribute('class', 'añadir');
            input.setAttribute('data-toggle', 'tooltip');
            input.setAttribute('data-placement', 'top');
            input.setAttribute('title', 'añadir publicacion');
            input2.setAttribute('class', 'añadir2');
            input2.setAttribute('data-toggle', 'tooltip');
            input2.setAttribute('data-placement', 'top');
            input2.setAttribute('title', 'Configuración');
            input2.onclick = function () {
                configurar();
            };
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
            div2.appendChild(input2);
            div.appendChild(a);
        }
        ;
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
    location.reload();
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
                div2.setAttribute('class', 'col-md-4 col-md-3 col-sm-2');
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
function showpublis2(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var div = document.getElementById('row2');
            var id = xmlDoc.getElementsByTagName('idPost');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            for (var i = 0; i < xmlDoc.getElementsByTagName("archivo").length; i++) {
                var div2 = document.createElement('div');
                div2.setAttribute('class', 'col-md-4 col-md-3 col-sm-2');
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
    xhttp.open("POST", "../php/showpubli2.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + id.innerText);
}
function mostrarPubli(id) {
    var iden = id;
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
            var count = xmlDoc.getElementsByTagName('like');
            var total = xmlDoc.getElementsByTagName('total');
            var input = document.createElement('input');
            input.type = "submit";
            input.setAttribute('class', 'cerrar');
            input.value = "cerrar";
            input.onclick = function () {
                div.style.display = "none";
                oscu.style.opacity = "1";
            };
            var img = document.createElement('img');
            img.setAttribute('class', 'like');
            img.id = "likes";
            if (count[0].childNodes[0].nodeValue === "0") {
                img.src = "../imgs/notliked.png";
            }
            else {
                img.src = "../imgs/liked.png";
            }
            img.onclick = function () {
                likes(iden);
            };
            console.log(count[0].childNodes[0].nodeValue);
            console.log(total[0].childNodes[0].nodeValue);
            var div2 = document.createElement('div');
            // div2.setAttribute('class', 'col-md-4');
            div2.style;
            var x = xmlDoc.getElementsByTagName("archivo")[0].childNodes[0].nodeValue;
            var a = document.createElement("img");
            a.setAttribute('class', 'publicacion2');
            a.src = x;
            var div3 = document.createElement('div');
            div3.id = "div3";
            var h3 = document.createElement('h3');
            var descripcion = document.createTextNode(desc[0].childNodes[0].nodeValue);
            h3.setAttribute('class', 'desc');
            var h32 = document.createElement('h3');
            var sitio = document.createTextNode(lugar[0].childNodes[0].nodeValue);
            h32.setAttribute('class', 'desc2');
            var tot = document.createElement('h4');
            tot.setAttribute('class', 'mg');
            var txttot = document.createTextNode(total[0].childNodes[0].nodeValue + " Me gusta");
            tot.appendChild(txttot);
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            h3.appendChild(descripcion);
            h32.appendChild(sitio);
            div3.appendChild(h3);
            var divnew = document.createElement('div');
            divnew.setAttribute('class', 'divnew');
            divnew.appendChild(img);
            divnew.appendChild(tot);
            div3.appendChild(divnew);
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
var l = 0;
function likes(id) {
    var div = document.getElementById('div3');
    var xhttp = new XMLHttpRequest();
    var like = document.getElementById('likes');
    l++;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var string = this.responseText.split("-");
            console.log(string[0]);
            if (string[0] === "in") {
                like.src = '../imgs/liked.png';
            }
            else if (string[0] === "out") {
                like.src = '../imgs/notliked.png';
            }
        }
    };
    var params = id + "-" + l;
    xhttp.open("POST", "../php/likes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + params);
}
function configurar() {
    var div = document.getElementById('config');
    var xhttp = new XMLHttpRequest();
    div.style.display = "block";
    var divinside = document.createElement('div');
    divinside.setAttribute('class', 'insidediv');
    var foto = document.createElement('input');
    foto.type = "file";
    foto.id = "fotito";
    foto.setAttribute('class', 'custom-file-input inp');
    var nombre = document.createElement('input');
    nombre.id = "name";
    var br = document.createElement('br');
    var username = document.createElement('input');
    username.id = "username";
    var gmail = document.createElement('input');
    gmail.id = "gmail";
    var password = document.createElement('input');
    password.id = "password";
    var button = document.createElement('input');
    button.type = "submit";
    button.onclick = function () {
        conf();
    };
    nombre.setAttribute('class', 'inp');
    username.setAttribute('class', 'inp');
    gmail.setAttribute('class', 'inp');
    password.setAttribute('class', 'inp');
    button.setAttribute('class', 'but inp');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            var x = xmlDoc.getElementsByTagName("foto")[0].childNodes[0].nodeValue;
            nombre.setAttribute('placeholder', "Nombre (" + xmlDoc.getElementsByTagName("nombre")[0].childNodes[0].nodeValue + ")");
            username.setAttribute('placeholder', "Username (" + xmlDoc.getElementsByTagName("userName")[0].childNodes[0].nodeValue + ")");
            gmail.setAttribute('placeholder', "Username (" + xmlDoc.getElementsByTagName("email")[0].childNodes[0].nodeValue + ")");
            password.setAttribute('placeholder', "Password");
            var a = document.createElement("img");
            a.setAttribute('class', 'like');
            a.src = x;
            divinside.appendChild(a);
            divinside.appendChild(foto);
            divinside.appendChild(nombre);
            divinside.appendChild(br);
            divinside.appendChild(username);
            divinside.appendChild(br);
            divinside.appendChild(gmail);
            divinside.appendChild(br);
            divinside.appendChild(password);
            divinside.appendChild(button);
        }
    };
    xhttp.open("POST", "../php/perfil.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=");
    div.appendChild(divinside);
}
function conf() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var gmail = document.getElementById('gmail');
    var name = document.getElementById('name');
    var file = document.getElementById('fotito');
    var formData = new FormData();
    formData.append("image", file.files[0]);
    formData.append("username", username.value);
    formData.append("gmail", gmail.value);
    formData.append("name", name.value);
    formData.append("password", password.value);
    fetch("../php/config.php", {
        method: 'POST',
        body: formData,
    })
        .then(function (respuesta) { return respuesta.text(); })
        .then(function (decodificado) {
        console.log(decodificado);
    });
    // location.reload();
}
function valoraciones() {
    var div = document.getElementById('val');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            console.log(this.responseText);
            var nombre = xmlDoc.getElementsByTagName('nombre');
            var descripcion = xmlDoc.getElementsByTagName('descripcion');
            var logo = xmlDoc.getElementsByTagName('logo');
            var direccion = xmlDoc.getElementsByTagName('direccion');
            var latitud = xmlDoc.getElementsByTagName('latitud');
            var longitud = xmlDoc.getElementsByTagName('longitud');
            var href = xmlDoc.getElementsByTagName('href');
            var discoteca = xmlDoc.getElementsByTagName('discoteca');
            var row = document.createElement('div');
            row.setAttribute('class', 'row');
            for (var i = 0; i < discoteca.length; i++) {
                var divcol6 = document.createElement('div');
                divcol6.setAttribute('class', 'col-md-12 move');
                var h3 = document.createElement('h3');
                h3.setAttribute('class', 'name');
                var h32 = document.createElement('h5');
                h32.setAttribute('class', 'name2');
                var nombreN = document.createTextNode(nombre[i].childNodes[0].nodeValue);
                console.log(nombreN);
                var x = xmlDoc.getElementsByTagName("logo")[i].childNodes[0].nodeValue;
                var a = document.createElement("img");
                a.setAttribute('class', 'image');
                a.src = x;
                var direccionN = document.createTextNode(direccion[i].childNodes[0].nodeValue);
                var img_pin = document.createElement('img');
                img_pin.src = "./imgs/location-pin.png";
                img_pin.setAttribute('class', 'pin');
                h3.appendChild(nombreN);
                h32.appendChild(direccionN);
                divcol6.appendChild(a);
                divcol6.appendChild(h3);
                divcol6.appendChild(img_pin);
                divcol6.appendChild(h32);
                row.appendChild(divcol6);
                div.appendChild(row);
            }
        }
    };
    xhttp.open("POST", "php/valoradas.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=");
}
function feed() {
    var div = document.getElementById('publis');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var par = new DOMParser();
            var xmlDoc = par.parseFromString(this.responseText, "text/xml");
            console.log(xmlDoc);
            var descripcion = xmlDoc.getElementsByTagName('descripcion');
            var lugar = xmlDoc.getElementsByTagName('descripcion');
            var likes = xmlDoc.getElementsByTagName('likes');
            var idUsuario = xmlDoc.getElementsByTagName('idUsuario');
            var publi = xmlDoc.getElementsByTagName('publi');
            for (var i = 0; i < publi.length; i++) {
                var div2 = document.createElement('div');
                var div3 = document.createElement('div');
                div2.setAttribute('class', 'my-12 try');
                var x = xmlDoc.getElementsByTagName("archivo")[i].childNodes[0].nodeValue;
                var a = document.createElement("img");
                a.setAttribute('class', 'imageFeed');
                a.src = x;
                var xP = xmlDoc.getElementsByTagName("foto")[i].childNodes[0].nodeValue;
                var aP = document.createElement("img");
                aP.setAttribute('class', 'perf');
                aP.src = xP;
                var nombreUsuario = document.createTextNode(idUsuario[i].childNodes[0].nodeValue);
                var h4 = document.createElement('h4');
                h4.setAttribute('class', 'margen');
                h4.appendChild(nombreUsuario);
                div2.appendChild(aP);
                div2.appendChild(h4);
                div3.appendChild(a);
                div2.appendChild(div3);
                div.appendChild(div2);
            }
        }
    };
    xhttp.open("POST", "php/feed.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=");
}
