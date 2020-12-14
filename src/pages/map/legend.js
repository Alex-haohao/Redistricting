import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './style.less'
class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {
    const getColor = d => {
      return d > 90
        ? "hsl(150,100%,50%)"
        : d > 70
        ? "hsl(150,90%,50%)"
        : d > 50
        ? "hsl(150,80%,50%)"
        : d > 30
        ? "hsl(150,70%,50%)"
        : d > 10
        ? "hsl(150,60%,50%)"
        : d > 0
        ? "hsl(150,50%,50%)"
        : d > -10
        ? "hsl(150,40%,50%)"
        : d > -30
        ? "hsl(150,30%,50%)"
        : d > -50
        ? "hsl(150,20%,50%)"
        : d > -70
        ? "hsl(150,10%,50%)"
        : d > -90
        ? "hsl(150,0%,50%)"
        : "hsl(150,0%,50%)";
        
    };

    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [-90, -70, -50, -30, -10, 0, 10, 30,50,70,90];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];

        labels.push(
          '<i style="background:' +
            getColor(from + 1) +
            '"></i> ' +
            from
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
    
  }
}

export default withLeaflet(Legend);
