import React, { Component } from 'react';

class SimulationCanvas extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        ctx.moveTo(0, 0);
        ctx.lineTo(640, 425);
        // ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
      }


    render() {
        return (
            <div>
                <canvas ref="canvas" width={640} height={425} />
            </div>
        )
    }
}
export default SimulationCanvas