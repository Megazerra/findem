function addLista() {
    let tit = document.getElementById('titulo');
    let inicio = document.getElementById('inicio');
    let final = document.getElementById('final');
    let discoteca = document.getElementById('dis');
    if(discoteca.value == 'error'){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seleccione una discoteca valida.'
        });
    }else if(tit.value != "" && inicio.value != "" && final.value && discoteca.value != ""){
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Lista insertada correctamente.'
        });
        insertLista(tit.value, inicio.value, final.value, discoteca.value);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Rellene todos los campos por favor.'
        });
    }
}

function consultaDiscoteca() {
    let superDiv = document.getElementById('dis');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            let id = xmlDoc.getElementsByTagName('id');
            let nombre = xmlDoc.getElementsByTagName('nombre');
            for(let i = 0; i < nombre.length; i++){
                let option = document.createElement('option');
                option.setAttribute('value', id[i].childNodes[0].nodeValue);
                option.innerText = nombre[i].childNodes[0].nodeValue;
                superDiv.appendChild(option);
            }
        }
    };
    xmlhttp.open("POST", "../php/consultaDiscoSimple.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function insertLista(tit, inicio, final, discoteca){
    let array = [];
    array.push(inicio.split('T'));
    array.push(final.split('T'));
    console.log(array);
    console.log(tit + "|-|" + array[0][0] + "," + array[0][1] + "|-|" +  array[1][0] + "," + array[1][1] + "|-|" + discoteca);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xmlhttp.open("POST", "../php/addLista.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("tit=" + tit + "&inicio=" + inicio + "&final=" + final + "&discoteca=" + discoteca);
}