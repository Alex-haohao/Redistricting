import React, {createRef} from 'react';
import './style.less'
import StateGeoData from '../../static/stateGeoJson'
import GAGeoData from '../../static/GA_precincts16.json'
// import newStateGeoData from '../../s'

import { Map, TileLayer,GeoJSON} from 'react-leaflet'

import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as mapAction from '../../actions/mapAction'

import Description from './Description/precinctDescription'
import StateDescription from './Description/StateDescription'


const DEFAULT_VIEWPORT = {
    center: [37.8, -96],
    zoom: 4,
  }

class leafletMap extends React.Component {
    
  constructor() {
    super()
    this.state = {
        viewport: DEFAULT_VIEWPORT,
        descriptDisplay:0,
        descriptionInfo:{
          PRECINCT_N: "empty",
          PRES16D: 0,
          PRES16R: 0,
          PRES16L: 0,
          SEN16D: 0,
          SEN16R: 0,
          SEN16L: 0,
          TOTPOP: 0,
          VAP:0,
          HVAP:0,
          WVAP:0,
          BVAP:0,
          AMINVAP:0,
          ASIANVAP:0,
          NHPIVAP:0,
          OTHERVAP:0

        },
        geodata:StateGeoData,
        geokey:"state-key"

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
      

    layer.on({
      click: (e)=>{
        layer.setStyle({fillColor :'red'})

       
        if(feature.properties.NAME === "Georgia"){
        this.setState({ 
          geodata: GAGeoData,
          geokey:"GA-key",
         })

         this.props.mapAction.changeMapState({
          center: [32.69020691781246,-83.58756508528708],
          zoom: 7,
          position:"GA"
        })
      }
      
        
        },

        mouseover: (e) => {
          this.setState({ descriptDisplay: 1,})

          
          this.setState({ descriptDisplay: 1,
            descriptionInfo:{
              State_Name: feature.properties.NAME,
              State_Land: feature.properties.density,
              PRECINCT_N:feature.properties.PRECINCT_N ,
              PRES16D: feature.properties.PRES16D,
              PRES16R: feature.properties.PRES16R,
              PRES16L: feature.properties.PRES16L,
              SEN16D: feature.properties.SEN16D,
              SEN16R: feature.properties.SEN16R,
              SEN16L: feature.properties.SEN16L,
              TOTPOP: feature.properties.TOTPOP,
              VAP:feature.properties.VAP,
              HVAP:feature.properties.HVAP,
              WVAP:feature.properties.WVAP,
              BVAP:feature.properties.BVAP,
              AMINVAP:feature.properties.AMINVAP,
              ASIANVAP:feature.properties.ASIANVAP,
              NHPIVAP:feature.properties.NHPIVAP,
              OTHERVAP:feature.properties.OTHERVAP
            }, })
          

            layer.setStyle({
                fillColor :'red',
                opacity:1
        })
        },
        mouseout: (e) => {
          this.setState({ descriptDisplay: 0 })

          layer.setStyle({
              fillColor :tempfillcolor,
              opacity:tempopacity
        })},
    });
  }

  

  render() {
    let geodata = this.state.geodata;
    let geokey = this.state.geokey;

    if(this.props.Mapstate.position ==="US"){
      geodata = StateGeoData;
      geokey = "state-key";
    }
   
    return (

      
      <div>
        {this.props.Mapstate.position ==="US" ? <StateDescription 
        descriptionInfo = {this.state.descriptionInfo}
        opacity={this.state.descriptDisplay}
        ></StateDescription>:
         <Description 
         opacity={this.state.descriptDisplay}
         descriptionInfo = {this.state.descriptionInfo}
         ></Description>
        }
       

      <Map 
      viewport={this.props.Mapstate}
      ref={this.mapRef}
      onClick={this.handleClickGetLat.bind(this)}
      >

        
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='	https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
        />

        {
              <GeoJSON
              key={geokey}
              data={geodata} 
              onEachFeature={this.onEachFeature.bind(this)}
              />
            }
      </Map>
      </div>
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
        Mapstate:state.Mapstate,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(leafletMap) ;