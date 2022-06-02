// Initialize and add the map
function initMap() {
    let locations = [], geo = [], labels = [], descripcion = [], ventana = [], img = [];
    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let geoUser = this.responseText;
            geoUser = geoUser.split('%');
            let latUser = parseFloat(geoUser[0]);
            let lngUser = parseFloat(geoUser[1]);
            const user = { lat: latUser, lng: lngUser };
 
            // inicio del mapa
            // The map, centered at Sabadell
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: user,
                mapId: '706c298561f72a06'
            });
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
                    //console.log(xmlDoc);
                    var nombre = xmlDoc.getElementsByTagName('nombre');
                    var desc = xmlDoc.getElementsByTagName('descripcion');
                    var horario = xmlDoc.getElementsByTagName('horario');
                    var logo = xmlDoc.getElementsByTagName('logo');
                    var lat = xmlDoc.getElementsByTagName('lat');
                    var long = xmlDoc.getElementsByTagName('long');
                    for (var i = 0; i < nombre.length; i++) {
                        let logo2 = logo[i].childNodes[0].nodeValue;
                        const image = new google.maps.MarkerImage(logo2);
                        img.push(image);
                        let latitud = parseFloat(lat[i].childNodes[0].nodeValue);
                        let longitud = parseFloat(long[i].childNodes[0].nodeValue);
                        geo['lat'] = latitud;
                        geo['lng'] = longitud;
                        locations.push(geo);
                        labels.push(nombre[i].childNodes[0].nodeValue);
                        descripcion.push(desc[i].childNodes[0].nodeValue);
                        geo = [];
                        texto = '<div>' +
                            '<img class="peque" onclick="redir()" src="' + logo[i].childNodes[0].nodeValue + ' ">' +
                            '<h3>' + nombre[i].childNodes[0].nodeValue + '</h3>' +
                            '<p class="m-0"><span class="fw-bold">Descripción: </span>' + desc[i].childNodes[0].nodeValue + '</p>' +
                            '<p class="m-0"><span class="fw-bold">Horario: </span>' + horario[i].childNodes[0].nodeValue + '</p>' +
                            '</div>';
                        ventana.push(texto);
                    }
                    //console.log(ventana[0]);
                    const markers = locations.map((position, i) => {

                        const label = "<div style='height: 5px !important'></div><span>" + labels[i % labels.length] + "</span>";
                        const marker = new google.maps.Marker({
                            position,
                            title: labels[i % labels.length]
                        });

                        // markers can only be keyboard focusable when they have click listeners
                        // open info window when marker is clicked
                        marker.addListener("click", () => {
                            infoWindow.setContent(ventana[i]);
                            infoWindow.open(map, marker);
                        });
                        return marker;
                    });
                    // Add a marker clusterer to manage the markers.
                    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });

                }
            };
            xmlhttp.open("POST", "./php/mapa.php", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send();

            const infoWindow = new google.maps.InfoWindow({
                content: "",
                disableAutoPan: true,
            });
        }
    };
    xmlhttp2.open("POST", "./php/consultaUserGeo.php", true);
    xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp2.send();
}
window.initMap = initMap;

