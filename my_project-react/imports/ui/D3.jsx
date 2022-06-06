import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import '../../node_modules/uikit/dist/css/uikit.css'

// react component used for d3
export const D3  = () => {
  const [data, setData] = useState(randomText())

  // returns n amount of random chars
  function randomText() {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
    .slice(0, Math.floor(6 + Math.random() * 20))
    .sort();
  }

  const root = useRef(null);


  var container = d3.select(root.current)

  const t = container.transition().duration(750);
  container.selectAll('div')
    .data(data, d => d)
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

  return (
    <React.Fragment>
      <button style={{padding: "0.5em", color: "black"}} onClick={() => {setData(randomText())}}>New Letters</button>
      <div id='content' className="uk-flex uk-flex-center" ref={root}>

      </div>
    </React.Fragment>

  )

}
