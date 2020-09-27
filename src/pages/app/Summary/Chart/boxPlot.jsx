import React from 'react';
import {
  Chart,
  Tooltip,
  Schema,
  Interaction,
  Annotation,
} from 'bizcharts';
import { DataView } from '@antv/data-set';


 export default class Demo extends React.Component{
    render(){
        const data = [
            { x: 'District 1', low: 0.01, q1: 0.025, median: 0.05, q3: 0.075, high: 0.1 },
            { x: 'District 2', low: 0.01, q1: 0.025, median: 0.075, q3: 0.1, high: 0.15 },
            { x: 'District 3', low: 0.01, q1: 0.05, median: 0.10, q3: 0.15, high: 0.20 },
            { x: 'District 4', low: 0.05, q1: 0.1, median: 0.15, q3: 0.20, high: 0.25 },
            { x: 'District 5', low: 0.1, q1: 0.15, median: 0.20, q3: 0.25, high: 0.3 },
            { x: 'District 6', low: 0.15, q1: 0.20, median: 0.25, q3: 0.30, high: 0.35 },
            { x: 'District 7', low: 0.2, q1: 0.25, median: 0.30, q3: 0.35, high: 0.40 },
            { x: 'District 8', low: 0.25, q1: 0.3, median: 0.35, q3: 0.40, high: 0.45 },
            { x: 'District 9', low: 0.30, q1: 0.35, median: 0.40, q3: 0.45, high: 0.5 },
            { x: 'District 10', low: 0.35, q1: 0.4, median: 0.45, q3: 0.5, high: 0.55 },
            { x: 'District 11', low: 0.4, q1: 0.45, median: 0.50, q3: 0.55, high: 0.6 },
            { x: 'District 12', low: 0.45, q1: 0.5, median: 0.55, q3: 0.6, high: 0.65 },
            { x: 'District 13', low: 0.5, q1: 0.55, median: 0.60, q3: 0.65, high: 0.7 },
            { x: 'District 14', low: 0.55, q1: 0.6, median: 0.65, q3: 0.7, high: 0.75 }
          ];
          const dv = new DataView().source(data);
          dv.transform({
            type: 'map',
            callback: obj => {
              obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
              return obj;
            }
          });

          return <Chart
          height={500}
          data={dv.rows}
          autoFit
          scale={{
             range: {
               max: 1,
               nice: true
             }
          }}
        >
          <Tooltip
             showTitle={false}
             showMarkers={false}
             itemTpl={'<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">'
         + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
         + '{name}<br/>'
         + '<span style="padding-left: 16px">high: {high}</span><br/>'
         + '<span style="padding-left: 16px">q3: {q3}</span><br/>'
         + '<span style="padding-left: 16px">median: {median}</span><br/>'
         + '<span style="padding-left: 16px">q1: {q1}</span><br/>'
         + '<span style="padding-left: 16px">low: {low}</span><br/>'
         + '</li>'}
          />
         
           <Schema
             position={'x*range'}
             shape="box"
             style={{
               stroke: '#545454',
               fill: '#1890FF',
               fillOpacity: 0.3
             }}
             tooltip={[
             'x*low*q1*median*q3*high',
             (x, low, q1, median, q3, high) => {
               return {
                 name: x,
                 low,
                 q1,
                 median,
                 q3,
                 high
               };
             }
             ]}
           />
         <Interaction type={'active-region'} />

         <Annotation.Region
            start={['min', '0.33']}
            end={['max', '0.5']}
            style={{
              fill: 'rgb(0, 153, 51)',
            }}
         />

       </Chart>
    }
   
 }