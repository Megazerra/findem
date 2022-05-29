function infoUser() {
    let filtro = document.getElementById('filtro');
    
    let user = document.getElementById('user');
    while (user.hasChildNodes()) {
        user.removeChild(user.firstChild);
    }
    let option = document.createElement('option');
    option.setAttribute('value', 'error');
    option.selected = true;
    option.innerText = "Seleciona el usuario";
    user.appendChild(option);
    user.disabled = true;
    let post = document.getElementById('post');
    let btn = document.getElementById('delBtn');
    while (post.hasChildNodes()) {
        post.removeChild(post.firstChild);
    }
    option.innerText = "Seleciona el post";
    post.appendChild(option);
    post.disabled = true;
    btn.disabled = true;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            var id = xmlDoc.getElementsByTagName('id');
            var nombre = xmlDoc.getElementsByTagName('nombre');
            if (id.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No hay usuarios que coincidan con el filtro.'
                });
            } else {
                user.disabled = false;
                for (var i = 0; i < id.length; i++) {
                    let option = document.createElement('option');
                    option.setAttribute('value', id[i].childNodes[0].nodeValue);
                    option.innerText = "" + nombre[i].childNodes[0].nodeValue;
                    user.appendChild(option);
                }
            }
        }
    };
    xmlhttp.open("POST", "../php/consultaDelPost.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("i=" + filtro.value + "&t=consulta");
    let sel = document.getElementById('user').getElementsByTagName('option')[0].selected = 'selected';
}

function cambiar() {
    let user = document.getElementById('user');
    let post = document.getElementById('post');
    while (post.hasChildNodes()) {
        post.removeChild(post.firstChild);
    }
    let option = document.createElement('option');
    option.setAttribute('value', 'error');
    option.selected = true;
    option.innerText = "Seleciona el post";
    post.appendChild(option);
    post.disabled = true;
    if (user.value == 'error') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seleciona un usuario valido.'
        });
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
                var id = xmlDoc.getElementsByTagName('id');
                console.log(xmlDoc);
                if (id.length == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Este usuario no tiene ningun post.'
                    });
                    document.getElementById('delBtn').disabled = true;
                } else {
                    post.disabled = false;
                    for (var i = 0; i < id.length; i++) {
                        let option = document.createElement('option');
                        option.setAttribute('value', id[i].childNodes[0].nodeValue);
                        option.innerText = "" + id[i].childNodes[0].nodeValue;
                        post.appendChild(option);
                    }
                    document.getElementById('delBtn').disabled = false;
                }
            }
        };
        xmlhttp.open("POST", "../php/consultaDelPost.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("i=" + user.value + "&t=post");
    }
}


function eliminar() {
    let post = document.getElementById('post').value;
    let id = document.getElementById('delBtn').value;
    if (post == "error") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seleciona una post valido.'
        });
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            console.log(this.responseText);
        };
        xmlhttp.open("POST", "../php/delPost.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("i=" + post);
        Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            title: 'Conseguido',
            text: 'Post eliminado correctamente.'
        }).then(function (result) {
            if (result.isConfirmed) {
                cambiar();
            }
        });
    }
}