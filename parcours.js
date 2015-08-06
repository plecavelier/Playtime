//utiliser localStorage pour récuperer la variable.


var distanceMax = 0.01; //km
var cibles = [
	{"nom": "Police Municipale", "latitude" : 45.753904, "longitude" : 4.843962}, 
	{"nom": "École Gilbert Dru", "latitude" : 45.753058, "longitude" : 4.843254}, 
	{"nom": "Arrêt de tram st andré ", 	"latitude" : 45.752877, "longitude" :  4.840991}, 
	{"nom": "Place Mazagran", 	"latitude" : 45.751797, "longitude" : 4.843485}, 			
	{"nom": "Garage citroën", "latitude" : 45.751513, "longitude" : 4.841082},
	{"nom": " La poste", "latitude" : 45.750642, "longitude" : 4.845207},
	{"nom": "La voute rue St Michel", "latitude" : 45.750352, "longitude" : 4.847959},
	{"nom": "Synagogue", "latitude" : 45.751344, "longitude" : 4.850561},
	{"nom": "Rue du Beguin", "latitude" : 45.748858, "longitude" : 4.848280},
	{"nom": "Résidence Atlantis", "latitude" : 45.747874, "longitude" : 4.845514},
];

//GET
function $_GET(q,s) {
    s = (s) ? s : window.location.search;
    var re = new RegExp('&amp;'+q+'=([^&amp;]*)','i');
    return (s=s.replace(/^\?/,'&amp;').match(re)) ?s=s[1] :s='';
}

var poiActuel =0;
if($_GET('num')){poiActuel=$_GET('num');}

if (poiActuel >= cibles.length) {
	alert("Merci de votre participation !");
	
	//et on reinitiale la partie.
	poiActuel = 0;
}

function calculDistance(lat1,lon1,lat2,lon2) {
	var R = 6371; // rayon terre (km)
	
	var dLat = deg2rad(lat2-lat1);
	var dLon = deg2rad(lon2-lon1); 
	
	var a = 
	Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	Math.sin(dLon/2) * Math.sin(dLon/2); 

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance en km

	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}

var options = {"enableHighAccuracy": true, "maximumAge" : 0, "timeout" : Infinity};
var geoEvent = navigator.geolocation.watchPosition( affichePosition, afficheErreur, options );

function affichePosition(event){
	var affichage = "";
	/*var affichage = "<li>Vous êtes ici : latitude " 
		+ event.coords.latitude 
		+ ", longitude " 
		+ event.coords.longitude 
		+ ", precision " 
		+ event.coords.accuracy 
		+ " metres.</li>";*/

	var cible = cibles[poiActuel];
	var distance = calculDistance(cible.latitude, cible.longitude, event.coords.latitude, event.coords.longitude);
	
	if (distance > distanceMax) {
		affichage += "<li class='loin'>Vous êtes froid : ";
		affichage += cible.nom + "<br/>( " + distance + " km)</li>";
	} else {
		affichage += "<li class='proche'><a href='photo.html?num="+poiActuel+"'>Prendre une photo</a> : ";
		affichage += cible.nom + "<br/>( " + distance + " km)</li>";
	}

	var decalage = String(parseInt(distance * 1000 * -5) ) +	"px";

	document.querySelector("body").style.backgroundPosition = "0px " + decalage;

	document.querySelector(".infos").innerHTML = affichage;
	document.querySelector(".tick").innerHTML += decalage + " ";
}

function afficheErreur(e){
	document.querySelector(".tick").innerHTML += "activer votre gps merci";


}
