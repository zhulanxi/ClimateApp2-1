import React, { Component } from 'react';

class SimulationCanvas extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        ctx.moveTo(0, 0);
        ctx.lineTo(425, 425);
        // ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
      }


    render() {
        return (
            <div>
                <canvas ref="canvas" className="canvas-display" width={425} height={425} />
            </div>
        )
    }
}
export default SimulationCanvas