import React, {createRef} from 'react';
import './style.less'
import StateGeoData from '../../static/stateGeoJson'


import { Map, TileLayer,GeoJSON} from 'react-leaflet'

import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as mapAction from '../../actions/mapAction'


const DEFAULT_VIEWPORT = {
    center: [37.8, -96],
    zoom: 4,
  }

class leafletMap extends React.Component {
    
  constructor() {
    super()
    this.state = {
        viewport: DEFAULT_VIEWPORT,
    }

  }

  mapRef = createRef()

  handleClickGetLat = (e) => {
   console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
  }

  
  componentWillMount() {
    const { Mapstate } = this.props
    if (Mapstate) this.setState({ viewport: Mapstate })
    else{
        this.setState({ viewport: DEFAULT_VIEWPORT })
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
    // let temp = layer.options.color
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
        console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)

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
   
    return (

      <Map 
      viewport={this.props.Mapstate}
      ref={this.mapRef}
      onClick={this.handleClickGetLat.bind(this)}
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


const mapDispatchToProps = (dispatch) =>{
    return {
        mapAction:bindActionCreators(mapAction,dispatch),
    }
}

const mapStateToProps =(state)=>{
    return{
        Mapstate:state.Mapstate
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(leafletMap) ;