import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;
let mapElement: any;
let map: any;
let mapOptions: any;
let mapCenter = {lat: 43.0741704, lng: -89.3809802};
let directionsService :any;
let directionsDisplay:any;
let marker: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
    apiKey = 'AIzaSyDGngVEtJD2V03qtKPwcr5rOKtSF5yt8w4';
    @ViewChild('map') googleMap;
  constructor(private geolocation: Geolocation) {
      const script = document.createElement('script');
      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=';
      }
      document.head.appendChild(script);
      this.geolocation.getCurrentPosition().then((resp) => {
        mapCenter.lat = resp.coords.latitude;
        mapCenter.lng = resp.coords.longitude;
        
          // resp.coords.latitude
          // resp.coords.longitude
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }

  ngAfterViewInit(): void {
      mapElement = this.googleMap.nativeElement;
      mapOptions = {
          center: mapCenter,
          zoom: 18
      };
      setTimeout(() => {
          //initialisation de la variable d'afficharge de la map
        map = new google.maps.Map(mapElement, mapOptions);

          //presentation de la localisation du client sur la map
        function geolocalisation(){
            marker = new google.maps.Marker({
                position: mapCenter,
                map: map,
                title: 'Ma position',
                });
          }

          geolocalisation()
          //fonction de détermination de trajet 
        function rechercheDest(){
            marker.setMap(null);
            directionsService =  new google.maps.DirectionsService();
            var request = {
            origin: mapCenter,
            destination: "18 Rue de Bretagne, Castres",
            travelMode: 'DRIVING'
            };
            directionsService.route(request, function(result, status) {
            if (status == 'OK') {
               directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);  
                directionsDisplay.setDirections(result);
            }
          });
            
        }
      }, 2000);


  }

}