
import React, { PureComponent } from 'react'
import {  View,  StyleSheet,  ActivityIndicator,  Text,  Platform,  Dimensions, TouchableOpacity} from 'react-native';
import MapView, {Marker, Polyline, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default class MyMap extends PureComponent {

    GOOGLE_MAPS_APIKEY = 'AIzaSyD9RLhp54RuOYkHb7XURI3pJGRFkJHwNzA';

    mapStyle = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2c6675"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#0e1626"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ]

    origin = {latitude: 41.724320419474, longitude: -71.4361282129628};
    destination = {latitude: 41.72496616165481, longitude: -71.43579150423128};
    pois = [
        {type: 'gate',name: "Gate 4", location: {latitude: 41.724320419474, longitude: -71.4361282129628}, level: '2', color: 'yellow'},
        {type: 'store',name: "Explore! RI", location: {latitude: 41.72496616165481, longitude: -71.43579150423128}, level: '2', color: 'blue'},
        {type: 'restaurant',name: "Federal Tavern", location: {latitude: 41.726008918671916, longitude: -71.43511033234579}, level: '2', color: 'red'},
        {type: 'amenity',name: "Restroom (F)", location: {latitude: 41.724879148364785, longitude: -71.43603309792914}, level: '1', color: 'purple'},
    ]

    state =   {
        level: 1,    
        initialRegion: {      
            latitude: 41.7257728,      
            longitude: -71.4355492,      
            latitudeDelta: 0.002,      
            longitudeDelta: 0.002,    
        },
        
        pois: this.pois, 
        userLocation: {      
        latitude: 41.7257728,      
        longitude: -71.4355492,    
    }  
} 
    


    showPOIS = (term) => 
    {
        if (term === 'all')
        {
            this.setState({pois: this.pois});
        }
        else if(term === 'none')
        {
            this.setState({pois: []});
        }
        else
        {
            this.setState({pois: this.pois.filter((poi) => poi.type === term)});
        }

    }

    render()
    {
        return(
        <View>
            <View>
                <TouchableOpacity
                onPress = {() => this.showPOIS('all')}
                >
                <Text>Show All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {() => this.showPOIS('none')}
                >
                <Text>Hide All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {() => this.showPOIS('gate')}
                >
                <Text>Show Gates</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {() => this.showPOIS('restaurant')}>
                <Text>Show Restaurants</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {() => this.showPOIS('store')}>
                <Text>Show Stores</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {() => this.showPOIS('amenity')}>
                <Text>Show Amenities</Text>
                </TouchableOpacity>
                </View>
           <MapView style = {styles.map}
           provider={MapView.PROVIDER_GOOGLE}
           initialRegion = {this.state.initialRegion}
           showsIndoors = {true}        
           showsIndoorLevelPicker = {true}        
           showsCompass = {true} 
           customMapStyle = {this.mapStyle}
           onIndoorLevelActivated = {e => this.setState({level: e.nativeEvent.IndoorLevel.name, pois: this.pois})} 
           >

               {
                   this.state.pois.filter((poi) => poi.level === this.state.level).map((poi) => 
                   (

                   <Marker
                   key = {poi.location.latitude}
                   coordinate = {poi.location}
                   title = {poi.name}
                   pinColor = {poi.color}
                   ><Text>Hello</Text></Marker>
                   ))}
               

           <MapViewDirections
           origin = {this.origin}
           destination = {this.destination}
           apikey={this.GOOGLE_MAPS_APIKEY}
           strokeWidth={4}
           mode= "WALKING"
           strokeColor="hotpink"
           onStart = {(e )=> console.log(e)}
           onReady = {(e) => console.log(e)}
           >

           </MapViewDirections>
           </MapView>
        </View>
        );
    }


}

const styles = StyleSheet.create({
    map: {    
        width: Dimensions.get('window').width,    
        height: Dimensions.get('window').height - 200,  
        marginTop: 50,
    },
})