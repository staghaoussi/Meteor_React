import React, { Component } from "react";
import * as d3 from 'd3';
import '../../node_modules/uikit/dist/css/uikit.css'

// react component used for d3
export class D3 extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: this.randomText(),
    }
    this.myRef = React.createRef();
  }

  componentDidUpdate(){
    this.update()
  }

  update(){
    // select container, create transition
    var container = d3.select(this.myRef.current)
    const t = container.transition().duration(750);

    // code for enter, update and exit
    container.selectAll('div')
      .data(this.state.data, d => d)
      .join(
        enter => enter.append("div")
          .style("color","green")
          .attr('x',(d,i)=>i*16)
          .attr("y",-30)
          .text(d => d)
          .call(enter => enter.transition(t).attr("y",0)),
        update => update
          .style("color","black")
          .attr("y", 0)
          .call(update => update.transition(t).attr("x", (d, i) => i*16)),
        exit => exit
        .style("color","red")
        .call(exit => exit.transition(t).attr("y",30).remove())
      )
    console.log("end of update")
  }

  // returns n amount of random chars
  randomText() {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
    .slice(0, Math.floor(6 + Math.random() * 20))
    .sort();
  }

  render(){
    return (
      <React.Fragment>
        <button style={{padding: "0.5em", color: "black"}} onClick={() => {this.setState({data: this.randomText()}), console.log('button', this.state)}}>New Letters</button>
        <div id='content' className="uk-flex uk-flex-center" ref={this.myRef}>

        </div>
      </React.Fragment>);
  }
}
