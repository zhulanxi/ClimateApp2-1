import React from 'react';
import {getSurfaceTemp, getLayerTemp} from './Calc.js'

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

        const a = this.props.planetaryAlbedo;
        const s = this.props.stellarRadiation;
        const e1 = typeof this.props.layers[0] === "undefined" ? 0 : this.props.layers[0].alpha;
        const e2 = typeof this.props.layers[1] === "undefined" ? 0 : this.props.layers[1].alpha;
        const e3 = typeof this.props.layers[2] === "undefined" ? 0 : this.props.layers[2].alpha;

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

        for(let i=0; i<3; i++){
            if(! (typeof this.props.layers[i] === "undefined")){
                console.log("Output for layer: "+i);
                ctx.fillText("T"+(i+1)+": "+getLayerTemp(i+1,a,s,e1,e2,e3), 10, 230-25*i);
            }
        }
        

        ctx.fillText("T0: "+getSurfaceTemp(a,s,e1,e2,e3),10,330);

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