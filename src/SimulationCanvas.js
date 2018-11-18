import React from 'react';
import { getSurfaceTemp, getLayerTemp } from './Calc.js'

const unicodeSubscriptDict = {
    0: '₀',
    1: '₁',
    2: '₂',
    3: '₃'
}

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
        const ei = [e1,e2,e3]

        ctx.font = "20px Arial";


        // Clear the canvas to draw new simulation
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the Global (Thick) atmosphere
        ctx.beginPath();
        ctx.arc(planetX,planetY, planetRadius + 170 , -Math.PI, Math.PI)
        ctx.strokeStyle = "#99ccff"
        ctx.lineWidth = 55
        ctx.stroke()

        var maxLayer = 0;
        // Draw the multiple atmospheric layers
        for (let i = 0; i < 3; i++) {
            // if (!(typeof this.props.layers[i] === "undefined") && this.props.layers[i].alpha > 0) {
            if (ei[i] !== 0) {
                maxLayer = i;
                ctx.beginPath();
                ctx.arc(planetX, planetY, planetRadius + 150 + 20 * i, -Math.PI, Math.PI);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 5;
                ctx.stroke()
            }
        }

        // Space to output temperatures, not really necessary
        ctx.clearRect(300, 208-25*maxLayer, 100, 100)

        // Draw temperature label at each layer
        for (let i = 0; i < 3; i++) {
            if (ei[i] !== 0) {
                ctx.beginPath()
                ctx.strokeStyle = "black";
                ctx.lineWidth = 0.5;
                let tx = 310
                let ty = 218 - 25 * i
                ctx.clearRect(tx - 10, ty - 17, 100, 20)
                ctx.clearRect(tx - 10, ty - 17, 100, 24)
                ctx.rect(tx - 10, ty - 17, 100, 20)
                ctx.stroke()
                ctx.fillText("T" + unicodeSubscriptDict[i + 1] + "= " + getLayerTemp(i + 1, a, s, e1, e2, e3) + "K", tx, ty);
            }
        }

        // Surface temperature label
        let tx = 15
        let ty = 330
        ctx.clearRect(tx - 10, ty - 17, 100, 20)
        ctx.rect(tx - 10, ty - 17, 100, 20)
        ctx.stroke()
        ctx.fillText("T" + unicodeSubscriptDict[0] + "= " + getSurfaceTemp(a, s, e1, e2, e3) + "K", tx, ty);

        // Draw the planet
        ctx.beginPath();
        ctx.arc(planetX, planetY, planetRadius, -Math.PI, Math.PI);
        ctx.fill();

    }


    render() {
        // console.log("Rendered Canvas with albedo: " + this.props.planetaryAlbedo);
        return (
            <div>
                <canvas ref="canvas" className="canvas-display" width={400} height={475} />
            </div>
        )
    }
}
export default SimulationCanvas