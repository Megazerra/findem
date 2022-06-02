function mostrar() {
    let tipo = document.getElementById('tipo');
    let option = document.createElement('option');
    option.setAttribute('value', 'error');
    option.selected = true;
    option.innerText = "Seleciona el usuario";
    let user = document.getElementById('user');
    while (user.hasChildNodes()) {
        user.removeChild(user.firstChild);
    }
    user.appendChild(option);
    user.disabled = true;
    let filtro = document.getElementById('filtro').disabled = true;
    let btn = document.getElementById('btnFil').disabled = true;
    if (tipo.value == "error") {
        let option = document.createElement('option');
        option.setAttribute('value', 'error');
        option.selected = true;
        option.innerText = "Seleciona el usuario";
        let user = document.getElementById('user');
        while (user.hasChildNodes()) {
            user.removeChild(user.firstChild);
        }
        user.appendChild(option);
        user.disabled = true;
        let filtro = document.getElementById('filtro').disabled = true;
        let btn = document.getElementById('btnFil').disabled = true;
    } else {
        let filtro = document.getElementById('filtro');
        filtro.disabled = false;
        let btn = document.getElementById('btnFil');
        btn.disabled = false;
        let btn2 = document.getElementById('tipo');
        btn.setAttribute('onclick', 'infoUser("' + btn2.value + '")');
    }
}

function infoUser(algo) {
    let option = document.createElement('option');
    option.setAttribute('value', 'error');
    option.selected = true;
    option.innerText = "Seleciona el usuario";
    let user = document.getElementById('user');
    while (user.hasChildNodes()) {
        user.removeChild(user.firstChild);
    }
    let filtro = document.getElementById('filtro');
    user.appendChild(option);
    user.disabled = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            var userName = xmlDoc.getElementsByTagName('userName');
            if (userName.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No hay usuarios que coincidan con los filtros.'
                });
            } else {
                for (var i = 0; i < userName.length; i++) {
                    let option = document.createElement('option');
                    option.setAttribute('value', userName[i].childNodes[0].nodeValue);
                    option.selected = true;
                    option.innerText = "" + userName[i].childNodes[0].nodeValue;
                    console.log(option);
                    user.appendChild(option);
                }
            }
        }
    };
    xmlhttp.open("POST", "../php/consultaDelUser.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("tipo=" + algo + "&filtro=" + filtro.value);
    let btn = document.getElementById('delBtn').disabled = false;
}

function eliminar() {
    let user = document.getElementById('user');
    if (user.value == "error") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seleciona un usario valido.'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Conseguido',
            text: 'Usuario eliminado correctamente.'
        });
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
        };
        xmlhttp.open("POST", "../php/delUser.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("name=" + user.value);
        let btn = document.getElementById('delBtn').disabled = true;
        mostrar();
    }
}