
let Swal: any;
comprobarBuscador();


function sugerencias() {
  let superDiv: any = document.getElementById('sugerencias');
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let log = this.responseText;
      // console.log(log);
      if (log == '0') {
        var h2: any = document.createElement('h2');
        h2.setAttribute('class', 'text-pop-up-top nothing')
        var txt: any = document.createTextNode('No tienes mensajes todavía.');
        h2.appendChild(txt);
        superDiv.appendChild(h2);
      } else {
        var par = new DOMParser();
        var xmlDoc = par.parseFromString(this.responseText, "text/xml");

        var username = xmlDoc.getElementsByTagName('userName');
        var nombre = xmlDoc.getElementsByTagName('nombre');
        var apellido = xmlDoc.getElementsByTagName('apellido');
        var email = xmlDoc.getElementsByTagName('email');
        var prop = xmlDoc.getElementsByTagName('prop');
        var foto = xmlDoc.getElementsByTagName('foto');
        var foto2: any = xmlDoc.getElementsByTagName('foto2');
        for (var i = 0; i < nombre.length; i++) {
          var hr = document.createElement('hr');
          hr.style.height = '2px';
          hr.classList.add('my-2');
          var row = document.createElement('div');
          row.classList.add('col-md-12');
          var div1 = document.createElement('div');
          div1.classList.add('row', 'justify-content-center');
          var div3 = document.createElement('div');
          div3.classList.add('col-4');
          var div2 = document.createElement('div');
          div2.classList.add('col-8');
          var h4 = document.createElement('h4');
          h4.innerHTML = "<strong>@" + username[i].childNodes[0].nodeValue + "</strong>";
          var sigue = document.createElement('p');
          sigue.innerHTML = prop[i].childNodes[0].nodeValue + " sige a esta cuenta.";
          sigue.classList.add('d-inline', 'col-md-6', 'col-sm-12', 'col-xs-12');

          let imagen2 = document.createElement('img');
          imagen2.setAttribute('src', foto2[i].childNodes[0].nodeValue);
          imagen2.setAttribute('onclick', 'amigoChange("' + prop[i].childNodes[0].nodeValue + '")');
          imagen2.classList.add('thumb');
          imagen2.classList.add('d-inline');

          div2.appendChild(h4);
          div2.appendChild(imagen2);
          div2.appendChild(sigue);
          div2.classList.add('mt-3');

          let imagen: any = document.createElement('img');
          imagen.setAttribute('src', foto[i].childNodes[0].nodeValue);
          imagen.setAttribute('onclick', 'amigoChange("' + username[i].childNodes[0].nodeValue + '")');
          imagen.style = "border-radius: 100%";
          imagen.classList.add('imFix', 'img-fluid', 'd-inline', 'd-flex', 'ms-auto');
          div3.appendChild(imagen);
          div1.appendChild(div3);
          div1.appendChild(div2);
          row.appendChild(div1);
          superDiv.appendChild(row);
          superDiv.appendChild(hr);
        }
      }
    }
  };
  xhttp.open("POST", "./php/sugerencias.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("");
}

function amigoChange(id: any) {
  localStorage.setItem('amigo', id);
  window.location.href = "./html/perfilA.html";
}

function load() {
  let id = localStorage.getItem('amigo');
  mostrarPerfil(id);
}

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
function redirect1() {
  window.location.href = "../index.html";
}
function redirect3() {
  window.location.href = "../html/register.html";
}
function redirect4() {
  window.location.href = "./html/perfil.html";
}
function redirect5() {
  window.location.href = "./friends.html";
}
function redirect6() {
  window.location.href = "./perfil.html";
}
function redirect7() {
  window.location.href = "./login.html";
}

function redirect2() {
  window.location.href = "./html/friends.html";

}


function refresh(iden: any) {
  var div: any = document.getElementById('mens');
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  mostrarId(iden);
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    // console.lognavigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("GEOLOCALITZACIÓ DESACTIVADA")
  }
}

// ------- Mostrar nuestra posición segun el navegador
function showPosition(position: any) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {


      let id = this.responseText;

      if (id == '1') {
        Swal.fire({
          icon: 'success',
          title: 'Conseguido',
          text: 'Usuario creado correctamente.'
        }).then((result: any) => {
          if (result.isConfirmed) {
            window.location.href = "../index.html";
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El nombre de usuario o el email ha sido utilizado.'
        })
      }
    }
  };
  let nombre: any = document.getElementById("nombre");
  let apellido: any = document.getElementById("apellido");
  let mail: any = document.getElementById("mail");
  let username: any = document.getElementById("username");
  let password: any = document.getElementById("password");
  let r_password: any = document.getElementById("r_password");
  let latitud: any = localStorage.getItem("latitud");
  let longitud: any = localStorage.getItem("longitud");

  if (password.value != r_password.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden.'
    })
  } else if (password.value.length <= 8) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La contraseña debe contener un mínimo de 8 caracteres'
    })
  } else {
    let params: any = username.value + "-" + nombre.value + "-" + apellido.value + "-" + password.value + "-" + mail.value + "-" + "user";
    xhttp.open("POST", "../php/register.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("i=" + params + "&lat=" + lat + "&long=" + long + "&link=no");
  }
}

function login() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sqlLogin)
    // console.lognavigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("GEOLOCALITZACIÓ DESACTIVADA");
  }
}
function sqlLogin(position: any) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let id: any = this.responseText;

      if (id == '1') {
        cargar();
        setTimeout(function () {
          volver();
          window.location.href = "../index.html";
        }, 200);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario no existe o los datos estan mal introducidos'
        })
      }
    }
  };
  var identifier: any = document.getElementById('l_username');
  var password: any = document.getElementById('l_password');
  var params: any = identifier.value + "-" + password.value;

  xhttp.open("POST", "../php/login.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + params + "&lat=" + lat + "&long=" + long);
}


function cargar() {
  var body: any = document.getElementById("cont");
  body.style.opacity = "0.2";

  var loader: any = document.getElementById('loader');
  loader.style.visibility = "visible";
  loader.style.opacity = "1 !important";

}

function volver() {
  var body: any = document.getElementById("cont");
  body.style.opacity = "1";

  var loader: any = document.getElementById('loader');
  loader.style.visibility = "hidden";

}



function chats() {
  var div: any = document.getElementById('inside');
  var div2: any = document.getElementById('me');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      var userName: any = xmlDoc.getElementsByTagName('userName');
      var me: any = xmlDoc.getElementsByTagName('user');
      var nombre: any = xmlDoc.getElementsByTagName('nombre');
      var apellido: any = xmlDoc.getElementsByTagName('apellido');

      for (var i: any = 0; i < userName.length; i++) {
        var divuser: any = document.createElement('div');
        divuser.id = userName[i].childNodes[0].nodeValue;
        divuser.style.cursor = "pointer";
        var x = xmlDoc.getElementsByTagName("foto")[i].childNodes[0].nodeValue;
        var a = document.createElement("img");
        a.setAttribute('class', 'image');
        a.src = x;
        var h3: any = document.createElement('h3');


        var usern: any = document.createTextNode(userName[i].childNodes[0].nodeValue);
        h3.appendChild(usern);
        divuser.appendChild(a);
        divuser.appendChild(h3);
        div.appendChild(divuser);
        divuser.setAttribute('onclick', "mostrarId(" + userName[i].childNodes[0].nodeValue + ")");
      }
      var h3: any = document.createElement('h3');
      var usern: any = document.createTextNode(me[0].childNodes[0].nodeValue);
      h3.appendChild(usern);
      div2.appendChild(h3);


    }

  };

  xhttp.open("POST", "../php/chats.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");

}

let defi: any;
var animatronic = 0;
function mostrarId(id: any) {
  animatronic++;

  defi = id;
  var padre: any = document.getElementById('padre');
  padre.setAttribute('class', 'padre box-shadow pulse');

  setTimeout(function () {
    padre.setAttribute('class', 'padre box-shadow');

  }, 100);

  var div: any = document.getElementById('mens');
  var div2: any = document.getElementById('ge3');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(this.responseText, "text/xml");

      if (this.responseText == "0") {
        var h2: any = document.createElement('h2');
        h2.setAttribute('class', 'text-pop-up-top')
        var txt: any = document.createTextNode('No tienes mensajes todavía.')
        h2.appendChild(txt);
        div.appendChild(h2);
        h2.style.opacity = "0.4";
        h2.style.textAlign = "center";
        h2.style.marginTop = "300px";
      } else {
        var idA: any = xmlDoc.getElementsByTagName('idChatA');
        var idE: any = xmlDoc.getElementsByTagName('idEmisorA');
        var idR: any = xmlDoc.getElementsByTagName('idRemitenteA');
        var us: any = xmlDoc.getElementsByTagName('usuario');
        var mensajeA: any = xmlDoc.getElementsByTagName('mensajeA');
        var msg: any = xmlDoc.getElementsByTagName('msg');
        for (var i: any = 0; i < msg.length; i++) {
          var p: any = document.createElement('p');
          p.style.wordWrap = "break-word";
          var men: any = document.createTextNode(mensajeA[i].childNodes[0].nodeValue);


          if (idE[i].childNodes[0].nodeValue != us[0].childNodes[0].nodeValue) {

            var container: any = document.createElement('div');
            var container2: any = document.createElement('div');

            container2.id = "left";
            container.setAttribute('class', 'inlineContainer');
            if (animatronic == 1) {
              container2.setAttribute('class', 'otherBubble other slide-in-left');
            } else {
              container2.setAttribute('class', 'otherBubble other');
            }
            p.appendChild(men);
            container2.appendChild(p);
            container.appendChild(container2);
          } else {
            var container: any = document.createElement('div');
            var container2: any = document.createElement('div');
            container.setAttribute('class', 'inlineContainer own');
            if (animatronic == 1) {
              container2.setAttribute('class', 'ownBubble own slide-in-right');

            } else {
              container2.setAttribute('class', 'ownBubble own');

            }
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

  var enviar: any = document.getElementById('w-input-text');
  var hola: any = 0;
  enviar.addEventListener("keyup", function (event: any) {
    if (event.key === "Enter" && enviar.innerText != "") {






      hola++;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(this.responseText, "text/xml");

        }
      };
      var params: any = defi.innerText + "-" + enviar.innerText;

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


function showPeople(user: any) {


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");

      var userName: any = xmlDoc.getElementsByTagName('userName');
      var me: any = xmlDoc.getElementsByTagName('user');
      var nombre: any = xmlDoc.getElementsByTagName('nombre');
      var apellido: any = xmlDoc.getElementsByTagName('apellido');
      var div: any = document.getElementById('test');

      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }




      if (user === '') {
        var idea: any = document.getElementById('idea');
        idea.style.visibility = "hidden";
      } else {
        var idea: any = document.getElementById('idea');
        idea.style.visibility = "visible";

      }

      for (var i: any = 0; i < userName.length; i++) {
        var h1: any = document.createElement('h1');
        var txt: any = document.createTextNode(userName[i].childNodes[0].nodeValue);
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

function mostrarPerfil(id: any) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");

      var userName: any = xmlDoc.getElementsByTagName('userName');
      var me: any = xmlDoc.getElementsByTagName('user');
      var nombre: any = xmlDoc.getElementsByTagName('nombre');
      var apellido: any = xmlDoc.getElementsByTagName('apellido');
      var foto: any = xmlDoc.getElementsByTagName('foto');
      var div: any = document.getElementById('ima2');
      var div2: any = document.getElementById('tex2');
      var cont: any = xmlDoc.getElementsByTagName('cont');
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      } while (div2.firstChild) {
        div2.removeChild(div2.firstChild);
      }
      var h3: any = document.createElement('h3');

      var h5: any = document.createElement('h5');
      h5.setAttribute('class', 'name');

      var x = xmlDoc.getElementsByTagName("foto")[0].childNodes[0].nodeValue;
      var a = document.createElement("img");
      a.setAttribute('class', 'perf');
      a.src = x;
      var user: any = document.createTextNode("@" + userName[0].childNodes[0].nodeValue);
      var name: any = document.createTextNode(nombre[0].childNodes[0].nodeValue + apellido[0].childNodes[0].nodeValue);

      var addfriend: any = document.createElement('input');
      addfriend.type = "image";
      addfriend.value = "add";
      addfriend.src = "../imgs/add.png";
      addfriend.setAttribute('class', 'botonañadir');
      addfriend.setAttribute('onclick', 'addFriend("' + userName[0].childNodes[0].nodeValue + '",' + cont[0].childNodes[0].nodeValue + ")");





      h3.appendChild(user);
      h5.appendChild(name);
      div2.appendChild(h3);
      div2.appendChild(h5);
      div2.appendChild(addfriend);
      div.appendChild(a);


    };
  }
  xhttp.open("POST", "../php/perfilA.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  if (localStorage.getItem('amigo')) {
    // console.log("local: " + id);
    xhttp.send("i=" + id);
    showpublis2(id);
    localStorage.removeItem('amigo');
  } else {

    showpublis2(id);
    xhttp.send("i=" + id.innerText);
  }

}


function addFriend(persona: any, cont: any) {
  var xhttp = new XMLHttpRequest();

  if (cont == 1) {
    Swal.fire({
      icon: 'error',
      title: ':)',
      text: 'Ya tienes a este amigo agregado...'
    })
  } else if (cont == 0) {

    let formData = new FormData();
    formData.append("idamigo", persona);
    fetch("../php/friend.php", {
      method: 'POST',
      body: formData,
    })
      .then(respuesta => respuesta.text())
      .then(decodificado => {

      });

    Swal.fire({
      icon: 'success',
      title: 'Agregado',
      text: 'Solicitud de amistad enviada!'
    })
  }


}
var escondercont: any = 0;
function pendiente() {
  var xhttp = new XMLHttpRequest();
  var div: any = document.getElementById('menu');
  var pendent: any = document.getElementById('pendent');
  var esconder: any = document.getElementById('esconder');

  pendent.onclick = function () {
    if (escondercont % 2 == 0) {
      esconder.style.display = "block";
      escondercont++;
    } else {
      esconder.style.display = "none";
      escondercont++;
    }

  }
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      var username: any = xmlDoc.getElementsByTagName('username')
      var pendiente: any = xmlDoc.getElementsByTagName('pendiente');
      var cont: any = xmlDoc.getElementsByTagName('cont');
      if (this.responseText != "0") {


        if (cont[0].childNodes[0].nodeValue > 0) {
          var noti: any = document.getElementById('noti');
          noti.innerText = parseInt(cont[0].childNodes[0].nodeValue);
          noti.setAttribute('class', 'noti animate__heartBeat animate__animated')
        }
        for (var i: any = 0; i < pendiente.length; i++) {





          var dentro: any = document.createElement('div');
          dentro.setAttribute('class', 'dentrodiv');
          dentro.id = username[i].childNodes[0].nodeValue;
          var usernameN: any = document.createTextNode(username[i].childNodes[0].nodeValue);
          var h3: any = document.createElement('h3');
          h3.setAttribute('class', 'pendenttext');

          var x = xmlDoc.getElementsByTagName("foto")[i].childNodes[0].nodeValue;
          var a = document.createElement("img");
          a.setAttribute('class', 'perf');
          a.src = x;

          var form: any = document.createElement('form');
          form.setAttribute('onsubmit', 'return false');
          form.style.display = "inline-block";



          var aceptar: any = document.createElement('input');
          aceptar.type = "image";
          aceptar.value = "add";
          aceptar.src = "./imgs/aceptar.png";
          aceptar.setAttribute('class', 'botonacceptar');
          aceptar.setAttribute('onclick', 'update(' + username[i].childNodes[0].nodeValue + ')');

          var decline: any = document.createElement('input');
          decline.type = "image";
          decline.value = "add";
          decline.src = "./imgs/decline.png";
          decline.setAttribute('class', 'botonacceptar2');
          decline.setAttribute('onclick', 'update2(' + username[i].childNodes[0].nodeValue + ')');

          h3.appendChild(usernameN);
          dentro.appendChild(a);
          dentro.appendChild(h3);
          form.appendChild(aceptar);
          form.appendChild(decline);
          dentro.appendChild(form);
          // dentro.appendChild(decline);

          esconder.appendChild(dentro);
        }

      }
    };
  }
  xhttp.open("POST", "./php/pendiente.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");
}


function update(id: any) {
  var xhttp = new XMLHttpRequest();
  var noti: any = document.getElementById('noti');
  var value = parseInt(noti.innerText, 10) - 1;
  noti.innerText = value;
  if (value == 0) {
    noti.innerText = "";
  }
  var div: any = document.getElementById(id.innerText);
  div.setAttribute('class', 'dentrodiv animate__backOutLeft animate__animated');
  setTimeout(function () {
    div.style.display = "none";
  }, 1000);



  xhttp.open("POST", "./php/actualizar.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + id.innerText);
}

function update2(id: any) {
  var xhttp = new XMLHttpRequest();
  var noti: any = document.getElementById('noti');
  var value = parseInt(noti.innerText, 10) - 1;
  noti.innerText = value;
  if (value == 0) {
    noti.innerText = "";
  }
  var div: any = document.getElementById(id.innerText);
  div.setAttribute('class', 'dentrodiv animate__backOutRight animate__animated');
  setTimeout(function () {
    div.style.display = "none";
  }, 1000);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

    }
  };
  xhttp.open("POST", "./php/actualizar2.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + id.innerText);
}


function perfil() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      var userName: any = xmlDoc.getElementsByTagName('userName');
      var me: any = xmlDoc.getElementsByTagName('user');
      var nombre: any = xmlDoc.getElementsByTagName('nombre');
      var apellido: any = xmlDoc.getElementsByTagName('apellido');
      var foto: any = xmlDoc.getElementsByTagName('foto');
      var div: any = document.getElementById('ima2');
      var div2: any = document.getElementById('tex2');



      var input: any = document.createElement('input');
      input.type = "image";
      input.value = 'crar';
      input.src = '../imgs/add.svg';

      var input2: any = document.createElement('input');
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

      }
      input.onclick = function () { publicaciones() };
      var h3: any = document.createElement('h3');
      h3.setAttribute('class', 'profilename');

      var h5: any = document.createElement('h5');
      h5.setAttribute('class', 'name');

      var x = xmlDoc.getElementsByTagName("foto")[0].childNodes[0].nodeValue;
      var a = document.createElement("img");
      a.setAttribute('class', 'perf');
      a.src = x;
      var user: any = document.createTextNode("@" + userName[0].childNodes[0].nodeValue);
      var name: any = document.createTextNode(nombre[0].childNodes[0].nodeValue + apellido[0].childNodes[0].nodeValue);
      h3.appendChild(user);
      h5.appendChild(name);
      div2.appendChild(h3);
      div2.appendChild(h5);
      div2.appendChild(input);
      div2.appendChild(input2);
      div.appendChild(a);

    };
  }
  xhttp.open("POST", "../php/perfil.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");
  showpublis();

}

var desc: any = 0;
function publicaciones() {
  var div: any = document.getElementById('add');
  var descripcion: any = document.createElement('input');
  descripcion.placeholder = "Descripcion";
  descripcion.id = "Descripcion";
  var lugar: any = document.createElement('input');
  lugar.placeholder = "Lugar";
  lugar.id = "lugar";
  var archivo: any = document.createElement('input');
  archivo.type = "file";
  archivo.id = "file";
  archivo.name = "file";
  var button: any = document.createElement('input');
  button.type = "submit";
  button.value = "Crear";
  descripcion.setAttribute('class', 'addi');
  lugar.setAttribute('class', 'addi');
  archivo.setAttribute('class', 'addi');
  button.setAttribute('class', 'añadirbtn');
  button.onclick = function () { añadirpubli() };
  if (desc == 0) {
    div.appendChild(archivo);
    div.appendChild(descripcion);
    div.appendChild(lugar);
    div.appendChild(button);
    desc++;
  } else {
    div.innerText = '';
    desc = 0;
  }

}


function añadirpubli() {
  var div: any = document.getElementById('add');
  var desc: any = document.getElementById('Descripcion')
  var lugar: any = document.getElementById('lugar');
  var file: any = document.getElementById('file');
  let formData = new FormData();
  formData.append("image", file.files[0]);
  formData.append("descripcion", desc.value);
  formData.append("lugar", lugar.value);
  fetch("../php/publicaciones.php", {
    method: 'POST',
    body: formData,
  })
    .then(respuesta => respuesta.text())
    .then(decodificado => {
      // console.log(decodificado);
    });
  location.reload();
}


function showpublis() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      var div: any = document.getElementById('row2');
      var id: any = xmlDoc.getElementsByTagName('idPost');
      var username: any = xmlDoc.getElementsByTagName('user');
      for (var i = 0; i < xmlDoc.getElementsByTagName("archivo").length; i++) {
        var div2: any = document.createElement('div');
        div2.setAttribute('class', 'col-md-4 col-md-3 col-sm-2');
        var x = xmlDoc.getElementsByTagName("archivo")[i].childNodes[0].nodeValue;
        var a = document.createElement("img");
        a.setAttribute('class', 'publicacion');
        a.src = x;
        a.id = id[i].childNodes[0].nodeValue;
        a.setAttribute('onclick', 'mostrarPubli(' + id[i].childNodes[0].nodeValue + ',"' + username[i].childNodes[0].nodeValue + '")');
        div2.appendChild(a);
        div.appendChild(div2);
      }
    }
  };
  xhttp.open("POST", "../php/showpubli.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");

}

function comprobarBuscador() {
  if (localStorage.getItem('per3')) {
    let id = localStorage.getItem('per3');
    localStorage.removeItem('per3');
    let p: any = document.createElement('p');
    p.innerText = id;
    alert(p.innerText);
    showpublis2(p);
  }
}

function showpublis2(id: any) {
  var URLactual = window.location.pathname;
  if (URLactual == '/findem/html/friends.html') {
    localStorage.setItem('per3', id.innerText);
    window.location.href = "./perfilA.html";
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      var div: any = document.getElementById('row2');
      var id: any = xmlDoc.getElementsByTagName('idPost');
      var username: any = xmlDoc.getElementsByTagName('user');

      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }

      for (var i = 0; i < xmlDoc.getElementsByTagName("archivo").length; i++) {
        var div2: any = document.createElement('div');
        div2.setAttribute('class', 'col-md-4 col-md-3 col-sm-2');
        var x = xmlDoc.getElementsByTagName("archivo")[i].childNodes[0].nodeValue;
        var a = document.createElement("img");
        a.setAttribute('class', 'publicacion');
        a.src = x;
        a.id = id[i].childNodes[0].nodeValue;
        a.setAttribute('onclick', 'mostrarPubli(' + id[i].childNodes[0].nodeValue + ',"' + username[i].childNodes[0].nodeValue + '")');


        div.appendChild(div2);
        div2.appendChild(a);

      }
    }
  };
  xhttp.open("POST", "../php/showpubli2.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + id.innerText);

}


function mostrarPubli(id: any, idPersona: any) {

  var iden: any = id;
  var div: any = document.getElementById('foto');
  var oscu: any = document.getElementById('gen');
  oscu.style.opacity = "0.5";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");

      var div: any = document.getElementById('foto');
      div.style.display = "block";
      var id: any = xmlDoc.getElementsByTagName('idPost');
      var desc: any = xmlDoc.getElementsByTagName('descripcion');
      var lugar: any = xmlDoc.getElementsByTagName('lugar');
      var count: any = xmlDoc.getElementsByTagName('like');
      var total: any = xmlDoc.getElementsByTagName('total');
      var input: any = document.createElement('input');
      input.type = "submit";
      input.setAttribute('class', 'cerrar');
      input.value = "cerrar";
      input.onclick = function () {
        div.style.display = "none";
        oscu.style.opacity = "1";
      };
      var img: any = document.createElement('img');
      img.setAttribute('class', 'like');
      img.id = "likes";
      if (count[0].childNodes[0].nodeValue === "0") {
        img.src = "../imgs/notliked.png";
      } else {
        img.src = "../imgs/liked.png";
      }
      img.onclick = function () {
        likes(iden);
      };

      var div2: any = document.createElement('div');
      // div2.setAttribute('class', 'col-md-4');
      div2.style
      var x = xmlDoc.getElementsByTagName("archivo")[0].childNodes[0].nodeValue;
      var a = document.createElement("img");
      a.setAttribute('class', 'publicacion2');
      a.src = x;
      var div3: any = document.createElement('div');
      div3.id = "div3";
      var h3: any = document.createElement('h3');
      var descripcion: any = document.createTextNode(desc[0].childNodes[0].nodeValue);
      h3.setAttribute('class', 'desc');
      var h32: any = document.createElement('h3');
      var sitio: any = document.createTextNode(lugar[0].childNodes[0].nodeValue);
      h32.setAttribute('class', 'desc2');
      var tot: any = document.createElement('h4');
      tot.setAttribute('class', 'mg');
      var txttot: any = document.createTextNode(total[0].childNodes[0].nodeValue + " Me gusta");
      tot.appendChild(txttot);
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      h3.appendChild(descripcion);
      h32.appendChild(sitio);
      div3.appendChild(h3);
      var divnew: any = document.createElement('div');
      divnew.setAttribute('class', 'divnew')
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
  var params: any = id + "-" + idPersona;
  xhttp.open("POST", "../php/showpubliconcreta.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + params);
}
var l: any = 0;
function likes(id: any) {
  var div: any = document.getElementById('div3');
  var xhttp = new XMLHttpRequest();
  var like: any = document.getElementById('likes');
  l++;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      var string = this.responseText.split("-");

      if (string[0] === "in") {
        like.src = '../imgs/liked.png';
      } else if (string[0] === "out") {
        like.src = '../imgs/notliked.png';
      }
    }
  };
  var params: any = id + "-" + l;

  xhttp.open("POST", "../php/likes.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + params);
}


function configurar() {
  var div: any = document.getElementById('config');
  var xhttp = new XMLHttpRequest();



  div.style.display = "block";


  var divinside: any = document.createElement('div');
  divinside.setAttribute('class', 'insidediv')

  var foto: any = document.createElement('input');
  foto.type = "file";
  foto.id = "fotito";
  foto.setAttribute('class', 'custom-file-input inp');




  var nombre: any = document.createElement('input');
  nombre.id = "name";
  var br: any = document.createElement('br');
  var username: any = document.createElement('input');
  username.id = "username";
  var gmail: any = document.createElement('input');
  gmail.id = "gmail";
  var password: any = document.createElement('input');
  password.id = "password";
  var button: any = document.createElement('input');
  button.type = "submit";

  button.onclick = function () {
    conf();
  }

  nombre.setAttribute('class', 'inp');
  username.setAttribute('class', 'inp');
  gmail.setAttribute('class', 'inp');
  password.setAttribute('class', 'inp');
  button.setAttribute('class', 'but inp');
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
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
  var username: any = document.getElementById('username');
  var password: any = document.getElementById('password')
  var gmail: any = document.getElementById('gmail');
  var name: any = document.getElementById('name');
  var file: any = document.getElementById('fotito');
  let formData = new FormData();

  formData.append("image", file.files[0]);
  formData.append("username", username.value);
  formData.append("gmail", gmail.value);
  formData.append("name", name.value);
  formData.append("password", password.value);
  fetch("../php/config.php", {
    method: 'POST',
    body: formData,
  })
    .then(respuesta => respuesta.text())
    .then(decodificado => {

    });
  // location.reload();
}

function valoraciones() {
  var div: any = document.getElementById('val');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");

      var nombre: any = xmlDoc.getElementsByTagName('nombre');
      var descripcion: any = xmlDoc.getElementsByTagName('descripcion');
      var logo: any = xmlDoc.getElementsByTagName('logo');
      var direccion: any = xmlDoc.getElementsByTagName('direccion');
      var latitud: any = xmlDoc.getElementsByTagName('latitud');
      var longitud: any = xmlDoc.getElementsByTagName('longitud');
      var href: any = xmlDoc.getElementsByTagName('href');
      var nota: any = xmlDoc.getElementsByTagName('nota');
      var discoteca: any = xmlDoc.getElementsByTagName('discoteca');
      var row: any = document.createElement('div');
      row.setAttribute('class', 'row');
      var br: any = document.createElement('br');
      for (var i: any = 0; i < discoteca.length; i++) {
        var estrellitas: any = document.createElement('img');

        var divcol6: any = document.createElement('div');
        divcol6.setAttribute('class', 'col-md-12 move')
        var h3: any = document.createElement('h3');
        h3.setAttribute('class', 'name');
        var h32: any = document.createElement('h5');
        h32.setAttribute('class', 'name2');
        var nombreN: any = document.createTextNode(nombre[i].childNodes[0].nodeValue);

        var x = xmlDoc.getElementsByTagName("logo")[i].childNodes[0].nodeValue;
        var a = document.createElement("img");
        a.classList.add('image', 'mt-4');
        a.src = x;

        var direccionN: any = document.createTextNode(direccion[i].childNodes[0].nodeValue);
        var img_pin: any = document.createElement('img');
        img_pin.src = "./imgs/location-pin.png";
        img_pin.setAttribute('class', 'pin');

        if (nota[i].childNodes[0].nodeValue == 10) {
          estrellitas.src = "./imgs/4estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 9) {
          estrellitas.src = "./imgs/3,4 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 8) {
          estrellitas.src = "./imgs/3estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 7) {
          estrellitas.src = "./imgs/2,5 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 6) {
          estrellitas.src = "./imgs/2,5 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 5) {
          estrellitas.src = "./imgs/2 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 4) {
          estrellitas.src = "./imgs/1,5 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 3) {
          estrellitas.src = "./imgs/1,5 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 2) {
          estrellitas.src = "./imgs/1 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 1) {
          estrellitas.src = "./imgs/1 estrellas.png";
        } else if (nota[i].childNodes[0].nodeValue == 0) {
          estrellitas.src = "./imgs/1 estrellas.png";
        }
        estrellitas.setAttribute('class', 'stars');
        h3.appendChild(nombreN);
        h32.appendChild(direccionN);
        divcol6.appendChild(a);
        divcol6.appendChild(h3);
        divcol6.appendChild(estrellitas);
        divcol6.appendChild(br);
        divcol6.appendChild(img_pin)
        divcol6.appendChild(h32);
        row.appendChild(divcol6);
        if ((i + 1) != discoteca.length) {
          let hr = document.createElement('hr');
          hr.classList.add('mt-4', 'mb-0', 'w-75', 'mx-auto');
          hr.style.height = "2px";
          row.appendChild(hr);
        }
        div.appendChild(row);
      }


    }
  };
  xhttp.open("POST", "php/valoradas.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");

}


function feed() {
  var div: any = document.getElementById('publis');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();

      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");


      let log = this.responseText;

      if (log == '0') {
        var h2: any = document.createElement('h2');
        h2.setAttribute('class', 'text-pop-up-top nothing')
        var txt: any = document.createTextNode('No tienes publicaciones que ver.');
        h2.appendChild(txt);
        div.appendChild(h2);
      } else {
        var descripcion: any = xmlDoc.getElementsByTagName('descripcion');
        var lugar: any = xmlDoc.getElementsByTagName('descripcion');
        var likes: any = xmlDoc.getElementsByTagName('likes');
        var idUsuario: any = xmlDoc.getElementsByTagName('idUsuario');
        var publi: any = xmlDoc.getElementsByTagName('publi');
        var idPost: any = xmlDoc.getElementsByTagName('idPost');
        var realizado: any = xmlDoc.getElementsByTagName('realizado');
        var likes: any = xmlDoc.getElementsByTagName('likes');

        for (var i: any = 0; i < publi.length; i++) {
          var div2: any = document.createElement('div');
          var div3: any = document.createElement('div');
          div2.setAttribute('class', 'my-12 try')
          var x = xmlDoc.getElementsByTagName("archivo")[i].childNodes[0].nodeValue;
          var a = document.createElement("img");
          a.setAttribute('class', 'imageFeed');
          a.src = x;
          a.id = idPost[i].childNodes[0].nodeValue;




          var xP = xmlDoc.getElementsByTagName("foto")[i].childNodes[0].nodeValue;
          var aP = document.createElement("img");
          aP.setAttribute('class', 'perf');
          aP.src = xP;

          var nombreUsuario: any = document.createTextNode(idUsuario[i].childNodes[0].nodeValue);
          var h4: any = document.createElement('h4');
          var hr: any = document.createElement('hr');

          h4.setAttribute('class', 'margen');
          h4.appendChild(nombreUsuario);
          var especial: any = document.createElement('div');
          especial.setAttribute('class', 'hrentrefotos');
          especial.appendChild(aP);
          especial.appendChild(h4);

          div2.appendChild(especial);
          div3.appendChild(a);
          var separador: any = document.createElement('div');
          separador.setAttribute('class', 'separador');

          var corasonR: any = document.createElement('img');
          corasonR.setAttribute('onclick', "likesFeed(" + idPost[i].childNodes[0].nodeValue + ")");
          corasonR.id = 'likesfeed';
          if (realizado[i].childNodes[0].nodeValue == "1") {
            corasonR.src = "./imgs/liked.png";
            corasonR.setAttribute('class', 'corason');
            separador.appendChild(corasonR);
          } else if (realizado[i].childNodes[0].nodeValue == "0") {

            corasonR.src = "./imgs/notliked.png";
            corasonR.setAttribute('class', 'corason');
            separador.appendChild(corasonR);
          }
          var h44: any = document.createElement('h4');
          var likesN: any = document.createTextNode(" " + likes[i].childNodes[0].nodeValue + " Me gusta");
          h44.appendChild(likesN);
          h44.setAttribute('class', 'line');
          separador.appendChild(h44);

          div3.appendChild(separador);
          // div3.appendChild(img);
          div2.appendChild(div3);
          div.appendChild(div2)

        }


      }
    }
  };
  xhttp.open("POST", "php/feed.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");
}


function likesFeed(identificador: any) {


  var xhttp = new XMLHttpRequest();
  var like: any = document.getElementById('likesfeed');
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");


      var string = this.responseText.split("-");

      if (string[0] === "in") {

        like.src = './imgs/liked.png';
      } else if (string[0] === "out") {

        like.src = './imgs/notliked.png';
      }
    }
  };

  xhttp.open("POST", "./php/likesnew.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + identificador);
}

function listas(value: any) {
  var div: any = document.getElementById('listas');
  var buscador: any = document.createElement('div');
  buscador.setAttribute('id', 'buscador');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");

      var lista: any = xmlDoc.getElementsByTagName('lista');
      var lista2: any = xmlDoc.getElementsByTagName('lista2');
      var titulo: any = xmlDoc.getElementsByTagName('titulo');
      var fecha_inicio: any = xmlDoc.getElementsByTagName('fecha_inicio');
      var fecha_final: any = xmlDoc.getElementsByTagName('fecha_final');
      var idDiscoteca: any = xmlDoc.getElementsByTagName('idDiscoteca');
      var idLista: any = xmlDoc.getElementsByTagName('idLista');
      var nombre: any = xmlDoc.getElementsByTagName('nombre');
      var nombreA: any = xmlDoc.getElementsByTagName('nombreA');
      var id: any = xmlDoc.getElementsByTagName('id');
      var select: any = document.createElement('select');
      select.name = "Filtro de discotecas";
      select.setAttribute('data-placeholder', "Filtrar por discotecas");
      select.setAttribute('data-callback', "my_callback");
      for (var x: any = 0; x < lista2.length; x++) {
        var option: any = document.createElement('option');
        option.innerText = nombreA[x].childNodes[0].nodeValue;
        option.value = id[x].childNodes[0].nodeValue;
        select.appendChild(option);
        buscador.appendChild(select);
      }
      for (var i: any = 0; i < lista.length; i++) {
        var tituloN: any = document.createTextNode(titulo[i].childNodes[0].nodeValue);
        var fecha_inicioN: any = document.createTextNode(fecha_inicio[i].childNodes[0].nodeValue);
        var fecha_finalN: any = document.createTextNode(fecha_final[i].childNodes[0].nodeValue);
        var idDiscotecaN: any = document.createTextNode(idDiscoteca[i].childNodes[0].nodeValue);
        var div2: any = document.createElement('div');
        div2.setAttribute('class', 'col-md-4 aleix');
        var row: any = document.createElement('row');
        row.setAttribute('class', 'row esp');
        var div3: any = document.createElement('div');
        div3.setAttribute('class', 'col-md-8 aleix');
        var x = xmlDoc.getElementsByTagName("logo")[i].childNodes[0].nodeValue;
        var a = document.createElement("img");
        a.setAttribute('class', 'list');
        a.id = idDiscoteca[i].childNodes[0].nodeValue;
        a.src = x;
        a.setAttribute('onclick', 'showList("' + idLista[i].childNodes[0].nodeValue + '")');
        let arr = fecha_inicio[i].childNodes[0].nodeValue.split(' ');
        var p: any = document.createElement('p');
        p.setAttribute('class', 'fecha');
        var p2: any = document.createElement('p');
        p2.setAttribute('class', 'hora');
        p.innerText = arr[0];
        p2.innerText = arr[1];
        let arr2 = fecha_final[i].childNodes[0].nodeValue.split(' ');
        var p_: any = document.createElement('p');
        p_.setAttribute('class', 'hora');
        p_.innerText = arr2[1];
        var h3: any = document.createElement('h3');
        h3.setAttribute('class', 'listah3');
        h3.appendChild(tituloN);
        var arrow: any = document.createElement('img');
        arrow.src = "./imgs/arrow.svg";
        div3.appendChild(p);
        div3.appendChild(p2);
        div3.appendChild(arrow);
        div3.appendChild(p_);
        div3.appendChild(h3);
        div2.appendChild(a);
        row.appendChild(div2);
        row.appendChild(div3);
        div.appendChild(row);
      }
    }
    $(select).awselect();
  };
  div.appendChild(buscador);
  xhttp.open("POST", "php/listas.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + value);
}

function plusUserLista(id: any) {
  let close: any = document.getElementById('listas_def');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let log = this.responseText;
      if (log == "1") {
        Swal.fire({
          icon: 'success',
          title: 'Conseguido',
          text: 'Te has unido a la lista.',
          allowOutsideClick: false
        }).then((result: any) => {
          if (result.isConfirmed) {
            close.style.display = "none";
          }
        });
      } else if (log == "0") {
        Swal.fire({
          icon: 'info',
          title: 'Listillo...',
          text: 'Ya te has unido a esta lista'
        }).then((result: any) => {
          if (result.isConfirmed) {
            close.style.display = "none";
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Opss...',
          text: 'Has encontrado un bug.'
        }).then((result: any) => {
          if (result.isConfirmed) {
            close.style.display = "none";
          }
        });
      }
    }
  };
  xhttp.open("POST", "./php/addUserLista.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=" + id);
}

function my_callback(value: any) {
  let list: any = document.getElementById('listas');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  listas(value);
}

function loader() {


  var load: any = document.getElementById('loaderr');
  var cargador: any = document.getElementById('cargador');

  /* background-image: url('../imgs/locura.svg'); */
  setTimeout(function () {
    load.style.display = "none";
    cargador.style.display = "block";
    document.body.style.backgroundImage = "url(./imgs/locura.svg)";
  }, 100);
}



function alldiscos() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      var nombre: any = xmlDoc.getElementsByTagName('nombre')
      var descripcion: any = xmlDoc.getElementsByTagName('descripcion')
      var direccion: any = xmlDoc.getElementsByTagName('direccion')
      var latitud: any = xmlDoc.getElementsByTagName('latitud');
      var longitud: any = xmlDoc.getElementsByTagName('latitud');
      var horario: any = xmlDoc.getElementsByTagName('horario');
      var href: any = xmlDoc.getElementsByTagName('href');
      var idDiscoteca: any = xmlDoc.getElementsByTagName('idDiscoteca');
     
      var discoteca: any = xmlDoc.getElementsByTagName('discoteca');

      for(var i:any = 0; i<discoteca.length; i++){
        var nombreN:any = document.createTextNode(nombre[i].childNodes[0].nodeValue);
        var descripcionN:any = document.createTextNode(descripcion[i].childNodes[0].nodeValue);
        var direccionN:any = document.createTextNode(direccion[i].childNodes[0].nodeValue);
        var latitudN:any = document.createTextNode(latitud[i].childNodes[0].nodeValue);
        var longitudN:any = document.createTextNode(longitud[i].childNodes[0].nodeValue);
        var horarioN:any = document.createTextNode(horario[i].childNodes[0].nodeValue);
        var hrefN:any = document.createTextNode(href[i].childNodes[0].nodeValue);

       

        var x = xmlDoc.getElementsByTagName("logo")[i].childNodes[0].nodeValue;
        var a = document.createElement("img");
        a.setAttribute('class', 'image2');
        a.src = x;
        a.id = idDiscoteca[i].childNodes[0].nodeValue;
        a.setAttribute('onclick', 'discotecaConcreta("'+idDiscoteca[i].childNodes[0].nodeValue+'")');


        var div:any = document.getElementById('here');
        var col:any = document.createElement('div');
        col.setAttribute('class','col-md-3')
        
        var h3:any = document.createElement('h3');
        

        h3.appendChild(nombreN);

        col.appendChild(a);
        col.appendChild(h3);
        div.appendChild(col);
        
      }

    }
  };

  xhttp.open("POST", "../php/alldiscos.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");
}


function discotecaConcreta(id:any){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
      // console.log(this.responseText);
      console.log(xmlDoc);

      var nombre: any = xmlDoc.getElementsByTagName('nombre')
      var nota: any = xmlDoc.getElementsByTagName('nota');
      var descripcion: any = xmlDoc.getElementsByTagName('descripcion')
      var direccion: any = xmlDoc.getElementsByTagName('direccion')
      var latitud: any = xmlDoc.getElementsByTagName('latitud');
      var longitud: any = xmlDoc.getElementsByTagName('latitud');
      var horario: any = xmlDoc.getElementsByTagName('horario');
      var href: any = xmlDoc.getElementsByTagName('href');
      var idDiscoteca: any = xmlDoc.getElementsByTagName('idDiscoteca');
     
      var discoteca: any = xmlDoc.getElementsByTagName('discoteca');
      var valoracion: any = xmlDoc.getElementsByTagName('valoracion');

   
        var nombreN:any = document.createTextNode(nombre[0].childNodes[0].nodeValue);
        var descripcionN:any = document.createTextNode(descripcion[0].childNodes[0].nodeValue);
        var direccionN:any = document.createTextNode(direccion[0].childNodes[0].nodeValue);
        var latitudN:any = document.createTextNode(latitud[0].childNodes[0].nodeValue);
        var longitudN:any = document.createTextNode(longitud[0].childNodes[0].nodeValue);
        var horarioN:any = document.createTextNode(horario[0].childNodes[0].nodeValue);
        var hrefN:any = document.createTextNode(href[0].childNodes[0].nodeValue);

        var x = xmlDoc.getElementsByTagName("logo")[0].childNodes[0].nodeValue;
        var a = document.createElement("img");
        a.setAttribute('class', 'image3');
        a.src = x;
        
        var div:any = document.getElementById('foto');
        div.style.display = "block";
        var col:any = document.createElement('div');
        col.setAttribute('class','col-md-3')
        col.style.height = "330px";
        
        

        

        col.appendChild(a);
        div.appendChild(col);
        var porcentaje20 = 0;
        var porcentaje40 = 0;
        var porcentaje60 = 0;
        var porcentaje80 = 0;
        var porcentaje100 = 0;
        for(var i:any = 0; i<valoracion.length; i++){
          var notaN:any = document.createTextNode(nota[i].childNodes[0].nodeValue);
          var h3:any = document.createElement('h3');


          if(nota[i].childNodes[0].nodeValue >= 0 && nota[i].childNodes[0].nodeValue < 2){
            porcentaje20++;
          }else if(nota[i].childNodes[0].nodeValue >= 2 && nota[i].childNodes[0].nodeValue < 4){
            porcentaje40++;
          }else if(nota[i].childNodes[0].nodeValue >= 4 && nota[i].childNodes[0].nodeValue < 6){
            porcentaje60++;
          }else if(nota[i].childNodes[0].nodeValue >= 6 && nota[i].childNodes[0].nodeValue < 8){
            porcentaje80++;
          }else if(nota[i].childNodes[0].nodeValue >= 8 && nota[i].childNodes[0].nodeValue >= 10){
            porcentaje100++;
          }



          h3.appendChild(notaN);
          col.appendChild(h3);
          div.appendChild(col);


        }
        var h3_:any = document.createElement('h3');
        var txt:any = document.createTextNode("Valoraciones");
        h3_.appendChild(txt);
        div.appendChild(h3_);

        // console.log("20: "+porcentaje20+" 40: "+porcentaje40+" 60: "+porcentaje60+" 80: "+porcentaje80+" 100: "+porcentaje100);
        var progressbar20:any = document.createElement('progress');
        
        var progressbar20:any = document.createElement('progress');

        var progressbar20:any = document.createElement('progress');

        var progressbar20:any = document.createElement('progress');

        var progressbar20:any = document.createElement('progress');
  
      
    }
  };

  xhttp.open("POST", "../php/discoConcreta.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i="+id);
}