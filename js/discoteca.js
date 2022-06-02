function addDisco() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // console.lognavigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocalización desactivada";
        alert("GEOLOCALITZACIÓ DESACTIVADA");
    }
}

function showPosition(position) {
    var lat = document.getElementById("lati");
    var long = document.getElementById("longi");
    var nombre = document.getElementById("nombre");
    var dir = document.getElementById("direccion");
    var horario = document.getElementById("horario");
    var url = document.getElementById("url");
    var img = document.getElementById("img");

    var descripcion = document.getElementById("descripcion");
    if (nombre.value != "" && dir.value != "" && horario.value != "" && url.value != "" + descripcion.value != "" && img.value != "" && lat.value != "" && long.value != "") {
        let formData = new FormData();
        formData.append("image", img.files[0]);
        formData.append("nombre", nombre.value);
        formData.append("dir", dir.value);
        formData.append("horario", horario.value);
        formData.append("descripcion", descripcion.value);
        formData.append("url", url.value);
        formData.append("lat", lat.value);
        formData.append("long", long.value);
        fetch("../php/insertDisco.php", {
            method: 'POST',
            body: formData,
        }).then(respuesta => respuesta.text()).then(decodificado => {
            console.log(decodificado);
        });
        setTimeout(function(){
            mostrarDiscotecas('sin', 0, 'ss');
            Swal.fire({
                icon: 'success',
                title: 'Conseguido',
                text: 'Discoteca creada.'
            });
        }, 500);
        
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Complete todos los campos por favor la descripcion ha de tener mas de 8 caracteres.'
        });
    }
    
}

function mostrarDiscotecas(check, num, filtro) {
    let superDiv = document.getElementById('discos');
    while (superDiv.hasChildNodes()) {
        superDiv.removeChild(superDiv.firstChild);
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            console.log(xmlDoc);
            console.log(this.responseText);
            var nombre = xmlDoc.getElementsByTagName('nombre');
            var direccion = xmlDoc.getElementsByTagName('direccion');
            var horario = xmlDoc.getElementsByTagName('horario');
            var href = xmlDoc.getElementsByTagName('href');
            var latitud = xmlDoc.getElementsByTagName('latitud');
            var longitud = xmlDoc.getElementsByTagName('longitud');
            var rows = xmlDoc.getElementsByTagName('rows');
            var fil = xmlDoc.getElementsByTagName('filtro');
            console.log(fil.length);
            if (fil.length == 0) {
                paginar(0, 'sin');

            } else if(fil[0].childNodes[0].nodeValue == 'off') {
                paginar(rows[0].childNodes[0].nodeValue, 'sin');
            }else{
                paginar(rows[0].childNodes[0].nodeValue, 'con');
            }
            for (var i = 0; i < nombre.length; i++) {
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
                h4.innerHTML = "<strong>Discoteca: </strong>" + nombre[i].childNodes[0].nodeValue;
                var dir = document.createElement('p');
                dir.innerHTML = "<strong>Dirección: </strong>" + direccion[i].childNodes[0].nodeValue;
                var horariophp = document.createElement('p');
                horariophp.innerHTML = "<strong>Horario: </strong>" + horario[i].childNodes[0].nodeValue;
                var geoloc = document.createElement('p');
                geoloc.innerHTML = "<strong>Localización: </strong>" + latitud[i].childNodes[0].nodeValue + ", " + longitud[i].childNodes[0].nodeValue;
                var linkphp = document.createElement('a');
                linkphp.innerHTML = "<strong class='fw-bold text-dark'>Link de la discoteca: </strong>" + href[i].childNodes[0].nodeValue;
                row.appendChild(h4);
                div.appendChild(dir);
                div.appendChild(horariophp);
                div2.appendChild(geoloc);
                div2.appendChild(linkphp);
                row.appendChild(div);
                row.appendChild(div2);
                row.appendChild(hr);
                superDiv.appendChild(row);
            }
        }
    };
    xmlhttp.open("POST", "../php/consultaDisco.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (check == "sin") {
        xmlhttp.send("pag=sin" + "&num=" + num);
    } else {
        xmlhttp.send("pag=con" + "&num=" + num + "&filtro=" + filtro);
    }
}

function paginar(num, filtro) {
    let pag = document.getElementById('pag');
    while (pag.hasChildNodes()) {
        pag.removeChild(pag.firstChild);
    }
    num = (num / 5).toFixed(2);
    num = Math.ceil(num);
    let div = document.getElementById('pag');
    for (let i = 0; i < num; i++) {
        let button = document.createElement('button');
        button.innerText = i;
        button.setAttribute('value', (i));
        button.classList.add('mx-auto', 'col-1', 'my-3');
        button.setAttribute('onclick', "cambiar('" + filtro + "'," + (i * 5) + ")");
        div.appendChild(button);
    }
}

function cambiar(check, num) {
    let discos = document.getElementById('discos');
    let filtro = document.getElementById('filtro');
    while (discos.hasChildNodes()) {
        discos.removeChild(discos.firstChild);
    }
    mostrarDiscotecas(check, num, filtro.value);
}

function img() {
    var formData = new FormData(document.getElementById('file')[1]);
    console.log(formData);
    // xhttp.onreadystatechange = function () {
    //     console.log(this.responseText);
    // }
    // xhttp.open("POST", "../php/register.php", true);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.send("img=" + formData);
}
