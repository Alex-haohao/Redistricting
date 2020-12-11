import React, { createRef } from 'react';
import './style.less'
import StateGeoData from '../../static/stateGeoJson'
import { Map, TileLayer, GeoJSON, LayersControl, LayerGroup } from 'react-leaflet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapAction from '../../actions/mapAction'
import Description from './Description/precinctDescription'
import StateDescription from './Description/StateDescription'
import shortid from 'shortid'
import api from '../../api'


const firstOverlayRef = createRef();
const mapRef = createRef();

const DEFAULT_VIEWPORT = {
  center: [37.8, -96],
  zoom: 4,
}

class leafletMap extends React.Component {

  constructor() {
    super()
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      descriptDisplay: 0,
      descriptionInfo: {
        PRECINCT_N: "empty",
        TOTPOP: 0,
        VAP: 0,
        HVAP: 0,
        WVAP: 0,
        BVAP: 0,
        AMINVAP: 0,
        ASIANVAP: 0,
        NHPIVAP: 0,
        OTHERVAP: 0,
        WHITE: 0,
        BLACK: 0,
        HISP: 0,
        AMIN: 0,
        OTHER: 0,
        ASIAN: 0,
        NHPI: 0

      },
      geodata: StateGeoData,
      geokey: "state-key"
    }
  }

  mapRef = createRef()
  handleClickGetLat = (e) => {
    console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
  }

  componentWillMount() {
    const { Mapstate } = this.props
    if (Mapstate) this.setState({ viewport: Mapstate })
    else {
      this.setState({ viewport: DEFAULT_VIEWPORT })
    }
  }

  style(feature) {
    return {
      weight: feature.properties.density / 100,
      opacity: 1,
      dashArray: '3',
      fillOpacity: 0.5,
    };
  };



  onEachRandomFeature(feature, layer) {
    function random_rgba() {
      var o = Math.round, r = Math.random, s = 255;
      return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
    }

    let color = random_rgba();
    layer.setStyle({
      fillColor: color,
      opacity: 0.5,
      color: 'black'
    })
  }

  onEachExtremeFeature(feature, layer) {
    function random_rgba() {
      var o = Math.round, r = Math.random, s = 255;
      return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
    }

    let color = random_rgba();
    layer.setStyle({
      fillColor: color,
      opacity: 0.5,
      color: 'red'
    })
  }

  onEachaverageFeature(feature, layer) {
    function random_rgba() {
      var o = Math.round, r = Math.random, s = 255;
      return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
    }

    let color = random_rgba();
    layer.setStyle({
      fillColor: color,
      opacity: 0.5,
      color: 'white'
    })
  }

  onEachFeature(feature, layer) {
    layer.options.opacity = 0.7
    let tempfillcolor = layer.options.fillColor
    let tempopacity = layer.options.opacity

    ////////////////////HEAT MAP////////////////////////////////////////////////////////
    let whiteCount = 0
    let asianCount = 0
    let africanAmericanCount = 0
    let americanIndianCount = 0
    let otherDensityCount = 0

    if (this.props.Mapstate.position === "GA") {
      whiteCount = 0.597
      asianCount = 0.032
      africanAmericanCount = 0.305
      americanIndianCount = 0.004
      otherDensityCount = 0.004
    }

    else if (this.props.Mapstate.position === "MI") {
      whiteCount = 0.591
      asianCount = 0.011
      africanAmericanCount = 0.378
      americanIndianCount = 0.007
      otherDensityCount = 0.0013
    }

    else if (this.props.Mapstate.position === "LA") {
      whiteCount = 0.628
      asianCount = 0.018
      africanAmericanCount = 0.328
      americanIndianCount = 0.008
      otherDensityCount = 0.0018
    }


    function heatMapColorforValue(value, count, multi) {
      let standard = 100 - ((count - value) * multi * 50 + 50)
      console.log(standard)
      if (standard > 100) {
        standard = 100
      }
      else if (standard < 0) {
        standard = 0
      }
      return "hsl(0, " + standard + "%" + ", 40%)";
    }

    if (this.props.MapDisplay.display === "default") {
      tempfillcolor = layer.options.fillColor
      tempopacity = layer.options.opacity
    }
    else if (this.props.MapDisplay.display === "WhiteDensity") {
      let whitePercentage = feature.properties.WVAP / (feature.properties.VAP)
      let res = heatMapColorforValue(whitePercentage, whiteCount, 1.5)
      layer.setStyle({ fillColor: res, fillOpacity: 0.4 })
      tempfillcolor = layer.options.fillColor
      tempopacity = layer.options.opacity
    }
    else if (this.props.MapDisplay.display === "AsianDensity") {
      let asianPercentage = feature.properties.ASIANVAP / (feature.properties.VAP)
      let res = heatMapColorforValue(asianPercentage, asianCount, 1 / asianCount)
      layer.setStyle({ fillColor: res })
      tempfillcolor = layer.options.fillColor
      tempopacity = layer.options.opacity
    }
    else if (this.props.MapDisplay.display === "AfricanAmericandensity") {
      let africanAmericanPercentage = feature.properties.BVAP / (feature.properties.VAP)
      let res = heatMapColorforValue(africanAmericanPercentage, africanAmericanCount, 1 / africanAmericanCount)
      layer.setStyle({ fillColor: res })
      tempfillcolor = layer.options.fillColor
      tempopacity = layer.options.opacity
    }
    else if (this.props.MapDisplay.display === "AmericanIndian") {
      let americanIndianPercentage = feature.properties.AMINVAP / (feature.properties.VAP)
      let res = heatMapColorforValue(americanIndianPercentage, americanIndianCount, 1 / americanIndianCount)
      layer.setStyle({ fillColor: res })
      tempfillcolor = layer.options.fillColor
      tempopacity = layer.options.opacity
    }
    else if (this.props.MapDisplay.display === "otherDensity") {
      let otherDensityPercentage = feature.properties.OTHERVAP / (feature.properties.VAP)
      let res = heatMapColorforValue(otherDensityPercentage, otherDensityCount, 1 / otherDensityCount)
      layer.setStyle({ fillColor: res })
      tempfillcolor = layer.options.fillColor
      tempopacity = layer.options.opacity
    }
    ////////////////////////////////////////////////////////////////////////////////////

    layer.on({
      click: (e) => {
        layer.setStyle({ fillColor: 'red' })
        if (feature.properties.NAME === "Georgia") {
          api.map.getMap("georgia/districting").then(res => res.json())
            .then(data => {
              this.props.mapAction.changeMapState({
                center: [32.69020691781246, -83.58756508528708],
                zoom: 7,
                position: "GA",
                geodata: data,
                geokey: shortid.generate()
              })
            })
        }
        else if (feature.properties.NAME === "Louisiana") {
          console.log("hahaha")
          api.map.getMap("louisiana/districting").then(res => res.json())
            .then(data => {
              this.props.mapAction.changeMapState({
                center: [30.994275439683353, -92.3121500015259],
                zoom: 7,
                position: "LA",
                geodata: data,
                geokey: shortid.generate()
              })
            })
        }

        else if (feature.properties.NAME === "Mississippi") {
          api.map.getMap("mississippi/districting").then(res => res.json())
            .then(data => {
              this.props.mapAction.changeMapState({
                center: [33.07784183741983, -89.70268249511719],
                zoom: 7,
                position: "MI",
                geodata: data,
                geokey: shortid.generate()
              })
            })
        }
      },

      mouseover: (e) => {
        this.setState({ descriptDisplay: 1, })
        this.setState({
          descriptDisplay: 1,
          descriptionInfo: {
            State_Name: feature.properties.NAME,
            State_Land: feature.properties.density,
            PRECINCT_N: feature.properties.PRECINCT_N,
            TOTPOP: feature.properties.TOTPOP,
            VAP: feature.properties.VAP,
            HVAP: feature.properties.HVAP,
            WVAP: feature.properties.WVAP,
            BVAP: feature.properties.BVAP,
            AMINVAP: feature.properties.AMINVAP,
            ASIANVAP: feature.properties.ASIANVAP,
            NHPIVAP: feature.properties.NHPIVAP,
            OTHERVAP: feature.properties.OTHERVAP,
            WHITE: feature.properties.WHITE,
            BLACK: feature.properties.BLACK,
            HISP: feature.properties.HISP,
            AMIN: feature.properties.AMIN,
            OTHER: feature.properties.OTHER,
            ASIAN: feature.properties.ASIAN,
            NHPI: feature.properties.NHPI
          },
        })

        layer.setStyle({
          fillColor: 'red',
          opacity: 1
        })
      },

      mouseout: (e) => {
        this.setState({ descriptDisplay: 0 })
        layer.setStyle({
          fillColor: tempfillcolor,
          opacity: tempopacity
        })
      },
    });
  }

  render() {
    let geodata = this.props.Mapstate.geodata;
    let geokey = this.props.Mapstate.geokey;
    if (this.props.Mapstate.position === "US") {
      geodata = StateGeoData;
      geokey = "state-key";
    }


    return (
      <div>
        {this.props.Mapstate.position === "US" ? <StateDescription
          descriptionInfo={this.state.descriptionInfo}
          opacity={this.state.descriptDisplay}
        ></StateDescription> :
          <Description
            opacity={this.state.descriptDisplay}
            descriptionInfo={this.state.descriptionInfo}
          ></Description>
        }


        <Map
          ref={mapRef}
          viewport={this.props.Mapstate}
          onClick={this.handleClickGetLat.bind(this)}
        >


          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='	https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
          />
          {

            <GeoJSON
              id="random"
              key={this.props.RandomLayerDisplay.jobid + "random"}
              data={this.props.RandomLayerDisplay.randomGeodata}
              onEachFeature={this.onEachRandomFeature.bind(this)}
            />
          }

          {

            <GeoJSON
              id="extreme"
              key={this.props.ExtremeLayerDisplay.jobid + "extreme"}
              data={this.props.ExtremeLayerDisplay.extremeGeodata}
              onEachFeature={this.onEachExtremeFeature.bind(this)}
            />
          }

          {

            <GeoJSON
              id="average"
              key={this.props.AverageLayerDisplay.jobid + "average"}
              data={this.props.AverageLayerDisplay.averageGeodata}
              onEachFeature={this.onEachaverageFeature.bind(this)}
            />
          }


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

const mapDispatchToProps = (dispatch) => {
  return {
    mapAction: bindActionCreators(mapAction, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    Mapstate: state.Mapstate,
    MapDisplay: state.MapDisplay,
    AverageLayerDisplay: state.AverageLayerDisplay,
    ExtremeLayerDisplay: state.ExtremeLayerDisplay,
    RandomLayerDisplay: state.RandomLayerDisplay,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(leafletMap);