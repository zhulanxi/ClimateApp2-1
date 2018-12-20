import React from 'react';
import { getSurfaceTemp, getLayerTemp, getMaxSurfaceTemp, getMinSurfaceTemp, maxInsolation, minInsolation } from './Calc.js'

// import { FaRegistered } from 'react-icons/fa';

const unicodeSubscriptDict = {
    0: '₀',
    1: '₁',
    2: '₂',
    3: '₃'
}

class SimulationCanvas extends React.Component {

    

    componentDidMount() {
        this.drawSimulation();
    }

    componentDidUpdate() {
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
        const s0 = s*1361/4;
        const e1 = typeof this.props.layers[0] === "undefined" ? 0 : this.props.layers[0].alpha;
        const e2 = typeof this.props.layers[1] === "undefined" ? 0 : this.props.layers[1].alpha;
        const e3 = typeof this.props.layers[2] === "undefined" ? 0 : this.props.layers[2].alpha;
        const ei = [e1,e2,e3]

        const shortwaveColor = "#ffd11a"
        const longwaveColor = "#ff3333"

        const surfaceTemp = getSurfaceTemp(a, s, e1, e2, e3)
        var layerTemps = []

        for (let i = 0; i < 3; i++) {
            if (ei[i] !== 0) {
                layerTemps[i] = getLayerTemp(i, a, s, ei)
            }
        }

        ctx.font = "20px Arial";

        // Clear the canvas to draw new simulation
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the star
        ctx.beginPath();
        ctx.arc(-25,-100,175,0,3/2*Math.PI)
        ctx.fillStyle = shortwaveColor
        ctx.fill();

        // Draw the planet
        ctx.beginPath();
        ctx.arc(planetX, planetY, planetRadius, -Math.PI, Math.PI);
        ctx.fillStyle = getPlanetColor(a);
        ctx.fill();

        // Draw stellar radiation arrow
        drawArrow(ctx, 45, 65, 100, 335, getStellarWidth(s), shortwaveColor)

        // Draw reflected shortwave
        if(a > 0){
            drawArrow(ctx, 85, 355, 20, 270, getReflectedStellarWidth(s,a), shortwaveColor)
        }

        // Draw longwave planet emission
        // drawArrow(ctx, 165, 352, 165, 235, getSurfaceEmissionWidth(surfaceTemp, s0), longwaveColor )
        drawArrow(ctx, 165, 352, 165, 235, getLayerAbsorbedEmission(surfaceTemp, s0,ei), longwaveColor )

        // Draw longwave planet emission that is not absorbed by atmosphere
        if((1-ei[0])*(1-ei[1])*(1-ei[2]) > 0 ){
            drawArrow(ctx, 215, 350, 215, 50, getEscapingSurfaceEmissionWidth(surfaceTemp, s0, ei), longwaveColor)
        }

        // Draw longwave atmospheric emission
        drawArrow(ctx, 270, 200, 270, 290, getAtmosphericRadiationBotWidth(layerTemps, ei, s0), longwaveColor )
        drawArrow(ctx, 270, 155, 270, 65, getAtmosphericRadiationTopWidth(layerTemps, ei, s0), longwaveColor )

        // Draw the Global (Thick) atmosphere
        ctx.beginPath();
        ctx.arc(planetX,planetY, planetRadius + 170 , -Math.PI, Math.PI)
        ctx.strokeStyle = "#99ccff"
        ctx.lineWidth = 62
        ctx.stroke()

        // maxLayer = -1
        // Draw the multiple atmospheric layers
        for (let i = 0; i < 3; i++) {
            // if (!(typeof this.props.layers[i] === "undefined") && this.props.layers[i].alpha > 0) {
            if (ei[i] !== 0) {
                // maxLayer = i;
                ctx.beginPath();
                ctx.arc(planetX, planetY, planetRadius + 150 + 20 * i, -Math.PI, Math.PI);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = getLayerWidth(ei[i]);
                ctx.stroke()
            }
        }

        // Clear space to output temperatures labels, not really necessary
        // if (maxLayer>=0){
        //     ctx.clearRect(290, 208-25*maxLayer, 110, 100)
        // }

        // Draw temperature label at each layer
        for (let i = 0; i < 3; i++) {
            if (ei[i] !== 0) {
                ctx.beginPath()
                ctx.strokeStyle = "black";
                ctx.fillStyle = "black";
                ctx.lineWidth = 0.5;
                let tx = 300
                let ty = 218 - 25 * i
                ctx.clearRect(tx - 10, ty - 17, 110, 20)
                // ctx.clearRect(tx - 10, ty - 17, 110, 24)
                ctx.rect(tx - 10, ty - 17, 110, 20)
                ctx.stroke()
                ctx.fillText("T" + unicodeSubscriptDict[i + 1] + "= " + layerTemps[i] + "K", tx, ty);
            }
        }

        // Surface temperature label
        ctx.beginPath()
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.lineWidth = 0.5;
        let tx = 300
        let ty = 400
        ctx.clearRect(tx - 10, ty - 17, 110, 20)
        ctx.rect(tx - 10, ty - 17, 110, 20)
        ctx.stroke()
        ctx.fillText("T" + unicodeSubscriptDict[0] + "= " + surfaceTemp + "K", tx, ty);
    }


    render() {
        return (
            <div>
                <canvas ref="canvas" className="canvas-display" width={400} height={475} />
            </div>
        )
    }
}

// Source: https://stackoverflow.com/a/26080467
function drawArrow(ctx, fromx, fromy, tox, toy, width, color){
    if(width === 0) return;
    //variables to be used when creating the arrow
    var headlen = 10;

    var angle = Math.atan2(toy-fromy,tox-fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

function rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")";
}

//********** The following functions rescale input for width or color */

// Returns a color based on the albedo
function getPlanetColor(albedo){
    const maxIntensity = 100
    const minIntensity = 0

    var intensity = (maxIntensity - minIntensity) * albedo + minIntensity
    return rgb(intensity, intensity, intensity);
}

function getStellarWidth(stellarRad){
    //It was decided that the size of the arrow should be fixed since the variation would propagate to other arrows in too large scale
    const maxWidth = 12
    const minWidth = 12

    //Get a value between 0 and 1
    var linearRad = (20*Math.log10(stellarRad)+40)/100
    var width = (maxWidth - minWidth) * linearRad + minWidth
    return width.toFixed(2);
}

function getReflectedStellarWidth(stellarRad, albedo){
   return ((getStellarWidth(stellarRad))*(albedo)).toFixed(2)
}

function getLayerWidth(e){
    const maxWidth = 10
    const minWidth = 2
    return (maxWidth-minWidth) * e + minWidth
}

function getSurfaceEmissionWidth(temp,s0){
    // Update: Since at lower insolation the changes in the parameters would not be reflected
    // on the width of the arrow, I divide by the 4th root of the insolation such that
    // the value does not depend on it.

    const maxWidth = 23
    const minWidth = 4
    temp = temp / Math.pow(s0,(1/4))
    const maxTemp = getMaxSurfaceTemp() / Math.pow(maxInsolation * 1361 / 4, (1/4));
    const minTemp = getMinSurfaceTemp() / Math.pow(minInsolation * 1361 / 4, (1/4));
    temp = (temp < minTemp) ? minTemp : temp;
    temp = (temp > maxTemp) ? maxTemp : temp;

    // Get a value between 0 and 1
    const relativeTemp = (temp - minTemp) / (maxTemp - minTemp)
    return (maxWidth-minWidth ) * relativeTemp + minWidth
}

function getLayerAbsorbedEmission(temp, s0, ei){
    var emul = (1-ei[0])*(1-ei[1])*(1-ei[2])
    return getSurfaceEmissionWidth(temp, s0)*(1-emul)
}

function getEscapingSurfaceEmissionWidth(temp,s0 , ei){
    var emul = (1-ei[0])*(1-ei[1])*(1-ei[2])
    return getSurfaceEmissionWidth(temp,s0)*(emul)
}

function getAtmosphericRadiationTopWidth(layerTemps, ei, s0){
    const maxWidth = 8
    const minWidth = 0

    var t1 = typeof layerTemps[0] === "undefined" ? 0 : layerTemps[0] / Math.pow(s0,(1/4));
    var t2 = typeof layerTemps[1] === "undefined" ? 0 : layerTemps[1] / Math.pow(s0,(1/4));
    var t3 = typeof layerTemps[2] === "undefined" ? 0 : layerTemps[2] / Math.pow(s0,(1/4));

    var value = Math.pow(t1,1/4)*ei[0]*(1-ei[1])*(1-ei[2]) + Math.pow(t2,1/4)*ei[1]*(1-ei[2]) + Math.pow(t3,1/4)*ei[2]
    const maxVal = 2.83;
    const minVal = 0;
    var relativeVal = (value - minVal) / (maxVal - minVal)
    return (maxWidth-minWidth) * relativeVal+minWidth;
}

function getAtmosphericRadiationBotWidth(layerTemps,ei, s0){
    const maxWidth = 8
    const minWidth = 0

    var t1 = typeof layerTemps[0] === "undefined" ? 0 : layerTemps[0] / Math.pow(s0,(1/4));
    var t2 = typeof layerTemps[1] === "undefined" ? 0 : layerTemps[1] / Math.pow(s0,(1/4));
    var t3 = typeof layerTemps[2] === "undefined" ? 0 : layerTemps[2] / Math.pow(s0,(1/4));

    var value = Math.pow(t1,1/4)*ei[0] + Math.pow(t2,1/4)*ei[1]*(1-ei[0]) + Math.pow(t3,1/4)*ei[2]*(1-ei[1])*(1-ei[0])
    const maxVal = 3.04
    const minVal = 0;
    var relativeVal = (value - minVal) / (maxVal - minVal)
    return (maxWidth-minWidth) * relativeVal+minWidth;
}

export default SimulationCanvas