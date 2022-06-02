function addUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // console.lognavigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocalización desactivada";
        alert("GEOLOCALITZACIÓ DESACTIVADA");
    }
}
// ------- Mostrar nuestra posición segun el navegador
function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var mail = document.getElementById("email");
    var username = document.getElementById("username");
    var password = document.getElementById("pass");
    var tipo = document.getElementById("tipo");
    if(tipo.value == "business"){
        var href = document.getElementById("link");
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var id = this.responseText;
            if (id == "1"){
                Swal.fire({
                    icon: 'success',
                    title: 'Conseguido',
                    text: 'Usuario creado correctamente.'
                });
            }
            else if(id == '0'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El nombre de usuario o el email estan siendo utilizados.'
                });
            }
        }
    };
    if (password.value.length <= 8) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La contraseña debe contener un mínimo de 8 caracteres'
        });
    }
    else {
        xhttp.open("POST", "../php/register.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if(tipo.value == "business"){
            var href = document.getElementById("link");
            var params = username.value + "-" + nombre.value + "-" + apellido.value + "-" + password.value + "-" + mail.value + "-" + tipo.value + "-" + href.value;
            xhttp.send("i=" + params + "&lat=" + lat + "&long=" + long + "&link=si");
        }else{
            var params = username.value + "-" + nombre.value + "-" + apellido.value + "-" + password.value + "-" + mail.value + "-" + tipo.value;
            xhttp.send("i=" + params + "&lat=" + lat + "&long=" + long + "&link=no");
        }
    }
    mostrarUsers('sin', 0, 'ss');
}
function inputHref(){
    let sel = document.getElementById('tipo');
    let padre = document.getElementById('linkTipo');
    if(sel.value == 'business'){
       let label = document.createElement('label');
       label.innerText = "Link de la empresa";
       label.classList.add('d-block', 'mt-2');
       let input = document.createElement('input');
       input.classList.add('d-block', 'form-control', 'mb-4');
       input.id = "link";
       padre.appendChild(label);
       padre.appendChild(input);
    }else{
        while (padre.hasChildNodes()) {
            padre.removeChild(padre.firstChild);
        }
    }
}
function mostrarUsers(check, num, filtro) {
    let superDiv = document.getElementById('user');
    while (superDiv.hasChildNodes()) {
        superDiv.removeChild(superDiv.firstChild);
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            var username = xmlDoc.getElementsByTagName('userName');
            var nombre = xmlDoc.getElementsByTagName('nombre');
            var apellido = xmlDoc.getElementsByTagName('apellido');
            var emailPhp = xmlDoc.getElementsByTagName('email');
            var latitud = xmlDoc.getElementsByTagName('latitud');
            var longitud = xmlDoc.getElementsByTagName('longitud');
            var href = xmlDoc.getElementsByTagName('href');
            var tipoPhp = xmlDoc.getElementsByTagName('tipo');
            var rows = xmlDoc.getElementsByTagName('rows');
            var fil = xmlDoc.getElementsByTagName('filtro');
            if (fil.length == 0) {
                paginar(0, 'sin');

            } else if(fil[0].childNodes[0].nodeValue == 'off') {
                paginar(rows[0].childNodes[0].nodeValue, 'sin');
            }else{
                paginar(rows[0].childNodes[0].nodeValue, 'con');
            }
            for (var i = 0; i < username.length; i++) {
                var hr = document.createElement('hr');
                hr.style.height = '5px';
                hr.classList.add('mt-4');
                var row = document.createElement('div');
                row.classList.add('row', 'ms-4', 'ps-3', 'mt-4');
                var div = document.createElement('div');
                div.classList.add('col-5');
                var div2 = document.createElement('div');
                div2.classList.add('col-7');
                var h4 = document.createElement('h4');
                h4.innerHTML = "<strong>Usuario: </strong>" + username[i].childNodes[0].nodeValue;
                var nombreCompleto = document.createElement('p');
                nombreCompleto.innerHTML = "<strong>Nombre real: </strong>" + nombre[i].childNodes[0].nodeValue + " " + apellido[i].childNodes[0].nodeValue;
                var email = document.createElement('p');
                email.innerHTML = "<strong>Email: </strong>" + emailPhp[i].childNodes[0].nodeValue;
                var geoloc = document.createElement('p');
                geoloc.innerHTML = "<strong>Localización: </strong>" + latitud[i].childNodes[0].nodeValue + ", " + longitud[i].childNodes[0].nodeValue;
                var tipo = document.createElement('p');
                tipo.innerHTML = "<strong>Tipo de usuer: </strong>" + tipoPhp[i].childNodes[0].nodeValue;
                row.appendChild(h4);
                div.appendChild(nombreCompleto);
                div.appendChild(email);
                div2.appendChild(geoloc);
                div2.appendChild(tipo);
                row.appendChild(div);
                row.appendChild(div2);
                if (tipoPhp[i].childNodes[0].nodeValue == 'business') {
                    var link = document.createElement('a');
                    link.setAttribute('href', href[i].childNodes[0].nodeValue);
                    link.innerHTML = "<strong class='fw-bold text-dark '>Link: </strong>" + href[i].childNodes[0].nodeValue;
                    div.appendChild(link);
                }
                row.appendChild(hr);
                superDiv.appendChild(row);
            }
        }
    };
    xmlhttp.open("POST", "../php/consultaUser.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(check == "sin"){
        xmlhttp.send("pag=sin" + "&num=" + num);
    }else{
        xmlhttp.send("pag=con" + "&num=" + num + "&filtro=" + filtro);
    }
}

function paginar(num, filtro){
    let pag = document.getElementById('pag');
    while (pag.hasChildNodes()) {
        pag.removeChild(pag.firstChild);
    }
    num = (num/5).toFixed(2);
    num = Math.ceil(num);
    let div = document.getElementById('pag');
    for(let i = 0; i < num; i++){
        let button = document.createElement('button');
        button.innerText = i;
        button.setAttribute('value', (i));
        button.classList.add('mx-auto','col-1', 'my-3');
        button.setAttribute('onclick', "cambiar('" + filtro + "'," + (i*5) +")");
        div.appendChild(button);
    }
}

function cambiar(check, num){
    let user = document.getElementById('user');
    let filtro = document.getElementById('filtro');
    while (user.hasChildNodes()) {
        user.removeChild(user.firstChild);
    }
    mostrarUsers(check, num, filtro.value);
}