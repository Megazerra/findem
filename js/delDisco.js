function infoDisco() {
    let option = document.createElement('option');
    option.setAttribute('value', 'error');
    option.selected = true;
    option.innerText = "Seleciona la discoteca";
    let disco = document.getElementById('disco');
    while (disco.hasChildNodes()) {
        disco.removeChild(disco.firstChild);
    }
    let filtro = document.getElementById('filtro');
    disco.appendChild(option);
    disco.disabled = false;
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
                    text: 'No hay discotecas que coincidan con el filtro.'
                });
            } else {
                for (var i = 0; i < id.length; i++) {
                    let option = document.createElement('option');
                    option.setAttribute('value', id[i].childNodes[0].nodeValue);
                    option.selected = true;
                    option.innerText = "" + nombre[i].childNodes[0].nodeValue;
                    disco.appendChild(option);
                }
            }
        }
    };
    xmlhttp.open("POST", "../php/consultaDelDisco.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("filtro=" + filtro.value);
    let btn = document.getElementById('delBtn').disabled = false;
}

function eliminar() {
    let id = document.getElementById('disco').value;
    if (id == "error") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seleciona una discoteca valida.'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Conseguido',
            text: 'Discoteca eliminada correctamente.'
        });
        let option = document.createElement('option');
        option.setAttribute('value', 'error');
        option.selected = true;
        option.innerText = "Seleciona la discoteca";
        let disco = document.getElementById('disco');
        while (disco.hasChildNodes()) {
            disco.removeChild(disco.firstChild);
        }
        let filtro = document.getElementById('filtro');
        disco.appendChild(option);
        disco.disabled = false;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
        };
        xmlhttp.open("POST", "../php/delDisco.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("i=" + id);
        let btn = document.getElementById('delBtn').disabled = true;
    }
}