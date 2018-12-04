import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlow } from '../actions/fetchFlow'
import { fetchChoice } from '../actions/fetchChoice'
import { changeCurrent } from '../actions/current'
import { initialiseInstantData, changeInstantData} from '../actions/instantData'
import LineChart from './LineChart'
import PropTypes from 'prop-types';
import { Rectangle } from 'react-shapes';
import './graph.css'

// import './image.css'


class Graph extends Component {

  componentWillMount() {
    console.log('Mounting');
    this.props.fetchChoice();
    this.props.fetchFlow();

    this.handleMouseOver = this.handleMouseOver.bind(this);

  }

  handleMouseOver(current, key, value) {
    if (current === null) {
      this.props.initialiseInstantData()
      this.props.changeCurrent(current)
    } else if (current !== this.props.current) {
        // console.log("Initialising instant data ")
        this.props.initialiseInstantData()
        this.props.changeCurrent(current)
    }
  }

  // Set threshold here
  colorPicker(data) {
    var maximum = this.props.maximum
    if (data <= 0.5 * maximum) { // 50% of maximum
      return "#f4eb41" // Yellow
    } else if (data <= 0.8 * maximum) { // 80% of maximum
      return "#64f441" // Green
    } else { // 100% of maximum
      return "#d11717" // Red
    }
  }  

  appendInstantData = (data, title, recordColor) => {
    if (data !== undefined && this.props.instantData[title] === undefined) {
      // console.log("Change detected")
      // console.log("data = ", data.y)
      // console.log("title = ", title)
      var dict = {}
      if (recordColor) {
        var color = this.colorPicker(data.y)
        dict[title] = <Rectangle width={100} height={20} fill={ {color: color} } />
      }
      else {
        dict[title] = data.y
      }
      this.props.changeInstantData(dict)
    }
  }

  drawGraph(dictionary, yDomain, recordColor) {

    // console.log("yDomain = ", yDomain)
    var element = []
    for (var key in dictionary) {      
        element.push(
          <LineChart
                  key = { key }
                  data = { dictionary[key] }
                  index = { this.props.current }
                  handleMouseOver = { this.handleMouseOver }
                  appendInstantData = { this.appendInstantData }
                  yDomain = { yDomain }
                  title = { key }
                  recordColor = { recordColor } />
        )
    }

    return (<div>{ element }</div>)
  }

  render() {
    
    // console.log("Props in component: ")

    // console.log("Direct object = ", this.props)

    // console.log("After changing Instant data = ", this.props.instantData)
    
    return (

      // <>
      // <h1>Hello</h1>

      <React.Fragment>
        <div className = "row">
          <div className = "column"> 
            { this.drawGraph(this.props.pathChoice, [0, 3], false) }
            { this.drawGraph(this.props.flowData, [0, 5], true) }
          </div>
          <div className = "column">
            {
              Object.keys(this.props.instantData).map((key, index) => ( 
                <p key={index}> {key}: {this.props.instantData[key]}</p> 
              ))
            }
        </div>
        </div>
      </React.Fragment>

      // <div className ="row"
      //   onKeyDown = {this.handleKeyPress} 
      //   tabIndex = "-1">

      //   {
      //     this.props.count < this.props.imageURL.length ?
      //       <React.Fragment>
      //         <div className = "leftpane centered-div">
      //             <img src={images['arrow_gloss_green_left.png']} />
      //         </div>
      //         <div 
      //           className = "middlepane">
      //           <img 
      //             className = "image centered"
      //             src = {this.props.imageURL[this.props.count]} 
      //           />
      //         </div>
      //         <div className = "rightpane centered-div">
      //           <img src={images['arrow_gloss_red_right.png']} />
      //         </div>
      //       </React.Fragment>

            // <div className = "row">
            //   <div className = "column1">
            //     <img src={images['arrow_gloss_green_left.png']} />
            //   </div>
            //   <div 
            //     className = "column2">
            //     <img 
            //       className = "image centered"
            //       src = {this.props.imageURL[this.props.count]} 
            //     />
            //   </div>
            //   <div className = "column3">
            //     <img src={images['arrow_gloss_red_right.png']} />
            //   </div>
            // </div>

      //       :
      //       <h1 className = "centered"> Thank you for participating </h1>
      //   }

      // </div>

        // <img src = {this.props.imageURL}/>

      // <img 
        // style = {this.styles.a} 
        // onClick = {() => this.handleImageClick()}
        // className="center-block" 
        // src={this.imageHandler()} 
        // />
    );
  }

}

Graph.propTypes = {
  fetchFlow: PropTypes.func.isRequired,
  fetchChoice: PropTypes.func.isRequired,
  initialiseInstantData: PropTypes.func.isRequired,
  changeInstantData: PropTypes.func.isRequired,
  maximum: PropTypes.number.isRequired,
  flowData: PropTypes.shape({}),
  pathChoice: PropTypes.shape({}),
  changeCurrent: PropTypes.func.isRequired,
  instantData: PropTypes.shape({})

  // flowData: PropTypes.number.isRequired,
  // time: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  pathChoice: state.pathChoice,
  flowData: state.data.flowData,
  current: state.current,
  instantData: state.instantData,
  maximum: state.data.maximum
});

export default connect(mapStateToProps, { fetchFlow, fetchChoice, changeCurrent, initialiseInstantData, changeInstantData })(Graph);

// <Rectangle width={100} height={100} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />