
function redirect() {
  window.location.href = "../html/login.html";
}

function redirect3() {
  window.location.href = "../html/register.html";
}

function redirect4() {
  window.location.href = "../html/addFriend.html";
}

function redirect2() {
  cargar();
  setTimeout(function () {
    volver();
    window.location.href = "html/friends.html";
  }, 200);


}


function refresh(iden:any){
  var div:any = document.getElementById('mens');
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
      console.log(id);
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
  console.log(password.value.length);
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
      console.log(id);
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
  console.log(params);
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
      var foto: any = xmlDoc.getElementsByTagName('foto');
    
     console.log(this.responseText)

      for (var i: any = 0; i < userName.length; i++) {
        var divuser: any = document.createElement('div');
        divuser.id = userName[i].childNodes[0].nodeValue;
        divuser.style.cursor = "pointer";
        var image:any = document.createElement('img');
        image.src = foto[i].childNodes[0].nodeValue;
        image.setAttribute('class', 'image');

        var h3: any = document.createElement('h3');
        var usern: any = document.createTextNode(userName[i].childNodes[0].nodeValue);

 
      
        h3.appendChild(usern);
        divuser.appendChild(image)

        divuser.appendChild(h3)
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


function mostrarId(id: any) {
  
  var div:any = document.getElementById('mens');
  var div2:any = document.getElementById('ge3');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
      console.log(this.responseText);

      console.log(xmlDoc);
      var enviar:any = document.createElement('input');
      enviar.classList.add('enviar');
      enviar.placeholder = "enviar un mensaje...";
      div2.appendChild(enviar);
      if(this.responseText == "0"){
        var h2:any = document.createElement('h2');
        var txt:any = document.createTextNode('No tienes mensajes todavía.')
        h2.appendChild(txt);
        div.appendChild(h2);
        h2.style.opacity = "0.4";
        h2.style.textAlign = "center";
        h2.style.marginTop = "300px";
      }else{
      
        var idA: any = xmlDoc.getElementsByTagName('idChatA');
        var idE: any = xmlDoc.getElementsByTagName('idEmisorA');
        var idR: any = xmlDoc.getElementsByTagName('idRemitenteA');
        var us: any = xmlDoc.getElementsByTagName('usuario');
        var mensajeA: any = xmlDoc.getElementsByTagName('mensajeA');
        var msg: any = xmlDoc.getElementsByTagName('msg');
        for (var i: any = 0; i < msg.length; i++) {
          var p:any = document.createElement('p');
          var men:any = document.createTextNode(mensajeA[i].childNodes[0].nodeValue);
          if(idE[i].childNodes[0].nodeValue != us[0].childNodes[0].nodeValue){
            p.classList.add("enviado");
          }else{
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
     
      enviar.addEventListener("keypress", function(event) {
          
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
          var params:any = id.innerText+"-"+enviar.value;
          


          

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


function showPeople(user:any){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");
     
      var userName: any = xmlDoc.getElementsByTagName('userName');
      var me: any = xmlDoc.getElementsByTagName('user');
      var nombre: any = xmlDoc.getElementsByTagName('nombre');
      var apellido: any = xmlDoc.getElementsByTagName('apellido');
      var div:any = document.getElementById('test');

      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
 
      
 

      if(user === ''){
        var idea:any =  document.getElementById('idea');
        idea.style.visibility = "hidden";
      }else{
        var idea:any =  document.getElementById('idea');
        idea.style.visibility = "visible";
       
      }
      
      for (var i: any = 0; i < userName.length; i++) {
        var h1:any = document.createElement('h1');
        var txt:any = document.createTextNode(userName[i].childNodes[0].nodeValue);
        
        h1.appendChild(txt);
        div.appendChild(h1);
        
      }
      
    }

  };

  xhttp.open("POST", "../php/show.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i="+user);
}


function perfil(){
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
      var div:any = document.getElementById('ima');
      var div2:any = document.getElementById('tex');
      console.log(userName.length);
      
  
          var input:any = document.createElement('input');
          input.type = "submit";
          input.value = "Crear";

          input.setAttribute('class', 'añadir');
          input.setAttribute('data-toggle', 'tooltip');
          input.setAttribute('data-placement', 'top');
          input.setAttribute('title', 'añadir publicacion');
          input.onclick = function() {publicaciones()};
          var h3:any = document.createElement('h3');
          var h5:any = document.createElement('h5');
          h5.setAttribute('class', 'name');
          var img:any = document.createElement('img');
          img.src = foto[0].childNodes[0].nodeValue;
          img.setAttribute('class', 'perf');
          var user:any = document.createTextNode("@"+userName[0].childNodes[0].nodeValue);
          var name:any = document.createTextNode(nombre[0].childNodes[0].nodeValue + apellido[0].childNodes[0].nodeValue);
          h3.appendChild(user);
          h5.appendChild(name);
          div2.appendChild(h3);
          div2.appendChild(h5);
          div2.appendChild(input);
          div.appendChild(img);
        console.log(xmlDoc)
        
      
      
    }

  };

  xhttp.open("POST", "../php/perfil.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");
}

var desc:any = 0;
function publicaciones(){
  var div:any = document.getElementById('add');
  var descripcion:any = document.createElement('input');
  descripcion.placeholder = "Descripcion";
  descripcion.id = "Descripcion";
  var lugar:any = document.createElement('input');
  lugar.placeholder = "Lugar";
  lugar.id = "lugar";

  var archivo:any = document.createElement('input');
  archivo.type = "file";
  archivo.id = "file";
  var button:any = document.createElement('input');
  button.type = "submit";
  button.value = "Crear";

  descripcion.setAttribute('class', 'addi');
  lugar.setAttribute('class', 'addi');
  archivo.setAttribute('class', 'addi');
  button.setAttribute('class', 'añadirbtn');
  button.onclick = function() {añadirpubli()};
  if(desc == 0){
    div.appendChild(archivo);

    div.appendChild(descripcion);
    div.appendChild(lugar);
    div.appendChild(button);
    desc++;
  }else{
   
      div.innerText = '';
      desc=0;
  }

}


function añadirpubli(){
  var div:any = document.getElementById('add');
  var desc:any = document.getElementById('Descripcion')
  var lugar:any = document.getElementById('lugar');
  var file:any = document.getElementById('file');
  console.log(desc.value + lugar.value + file.files[0]);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var par = new DOMParser();
      var xmlDoc: any = par.parseFromString(this.responseText, "text/xml");

    }

  };
  
  
  
  xhttp.open("POST", "../php/perfil.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("i=");
}