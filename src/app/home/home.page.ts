import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { ModalRecherchePage } from '../modal-recherche/modal-recherche.page';
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
    search;
    @ViewChild('map') googleMap;
  constructor(private geolocation: Geolocation, public modalController: ModalController) {
    //construction de l'url de googleMap
      const script = document.createElement('script');
      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + this.apiKey;
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=';
      }
      document.head.appendChild(script);
      //geolocalisation du client
      this.geolocation.getCurrentPosition().then((resp) => {
        mapCenter.lat = resp.coords.latitude;
        mapCenter.lng = resp.coords.longitude;
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }

  ngAfterViewInit(): void {
    // initialisation des variables de construction de la map
      mapElement = this.googleMap.nativeElement;
      mapOptions = {
          center: mapCenter,
          zoom: 18
      };
    
      setTimeout(() => {
        let options = {
          componentRestrictions:{
            country: 'FR'
          },
          types: ['address']
        }
          //initialisation de la variable d'afficharge de la map
        map = new google.maps.Map(mapElement, mapOptions);
        //initialisation de la variable d'autocomplétion
        var complete = document.getElementById('search').getElementsByTagName('input')[0];
        var autocomplete = new google.maps.places.Autocomplete(complete,options);
        var infowindow = new google.maps.InfoWindow();
          //positionnement de la destination sur la map
          autocomplete.addListener('place_changed', function() {
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            this.search = place.name;
            console.log(this.search)
            
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
          });
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
            destination: "16 Rue des capucins, Bordeaux",
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
        rechercheDest()
      }, 2000);
  }

}