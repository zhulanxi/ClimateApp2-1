import React, { Component } from 'react';

class SimulationCanvas extends React.Component {

    componentDidMount() {
        console.log("CanvasDidMount")
        this.drawSimulation();
    }

    componentDidUpdate() {
        console.log("CanvasDidUpdate")
        this.drawSimulation();

    }

    drawSimulation() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const planetX = 212.5;
        const planetY = 1050;
        const planetRadius = 700;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let layer of this.props.layers) {
            console.log("Rendered a layer");
            ctx.beginPath();
            ctx.arc(planetX, planetY, planetRadius + 100 + 10*layer.layerNumber, -Math.PI, Math.PI); 
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.stroke()
        }

        ctx.font = "20px Arial";
        ctx.fillText(this.props.planetaryAlbedo, 10, 230);

        ctx.beginPath();
        ctx.arc(planetX, planetY, planetRadius, -Math.PI, Math.PI);
        ctx.fill();
    }



    render() {
        console.log("Rendered Canvas with albedo: " + this.props.planetaryAlbedo);
        return (
            <div>
                <canvas ref="canvas" className="canvas-display" width={400} height={475} />
            </div>
        )
    }
}
export default SimulationCanvas