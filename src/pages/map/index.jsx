import React ,{ createRef }from 'react';
import './style.less'
import StateGeoData from '../../static/stateGeoJson'

import { Map, TileLayer,Polygon,GeoJSON} from 'react-leaflet'

export default class SimpleExample extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 37.8,
      lng: -96,
      zoom: 4
    }
  }

  style(feature) {
    return {
        weight: feature.properties.density/100,
        opacity: 1,
        dashArray: '3',
        fillOpacity: 0.5
    };
  };


  onEachFeature(feature, layer) {
    layer.options.opacity = 0.5
    let temp = layer.options.color
    let tempfillcolor = layer.options.fillColor
    let tempopacity = layer.options.opacity
    layer.bindPopup(feature.properties.name);

    // layer.on('mouseover', function (e) {
    //     this.openPopup();
    // }),
    // layer.on('mouseout', function (e) {
    //     this.closePopup();
    // }),

    layer.on({
      click: (e)=>{
        layer.setStyle({fillColor :'red'})
        layer.closePopup();
        },
        mouseover: (e) => {
            layer.openPopup()
            layer.setStyle({
                fillColor :'red',
                opacity:1
        })
        },
        mouseout: (e) => {
            layer.closePopup();
          layer.setStyle({
              fillColor :tempfillcolor,
              opacity:tempopacity
        })},
    });
  }

  

  render() {
    // console.log(StateGeoData.features[0].geometry.coordinates)
    const position = [this.state.lat, this.state.lng];
    

    return (

      <Map center={position} 
      zoom={this.state.zoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />


        {
            
              <GeoJSON key='my-geojson' 
              data={StateGeoData} 
              onEachFeature={this.onEachFeature.bind(this)}
              />
            }


      </Map>
    );
  }
}


