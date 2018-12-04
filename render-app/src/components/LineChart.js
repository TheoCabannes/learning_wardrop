import React, { Component } from 'react';

import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalBarSeries, MarkSeries, XAxis, YAxis} from 'react-vis';

class LineChart extends Component {

  render() {

    var data = this.props.data
    var index = this.props.index

    // console.log("data = ", data)

    return (
         <XYPlot
                  height = {125} 
                  width = {600}
                  yDomain = { this.props.yDomain }
                  onMouseLeave={() => this.props.handleMouseOver(null)}
                  >
                  <XAxis title = {this.props.title} />
                  <YAxis />
                    <LineSeries
                      data={this.props.data}
                      onNearestX={(datapoint, {index}) =>  this.props.handleMouseOver(index) } />
                      {index === null ? null : <LineSeries
                        data={[{x: index, y: 0}, {x: index, y: 10}]}
                        opacity={0.5} />
                      }
                      {index === null ? null : <MarkSeries
                        data={[data[index]]}
                        stroke="white" />
                      }
                      { this.props.appendInstantData(data[index], this.props.title, this.props.recordColor) }

          </XYPlot>
    );
  }
}

export default LineChart;

