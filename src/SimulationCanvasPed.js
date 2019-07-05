import React from 'react';
import { getSurfaceTemp, getLayerTemp } from './CalcPed.js'

// import { FaRegistered } from 'react-icons/fa';

const unicodeSubscriptDict = {
    0: '₀',
    1: '₁',
    2: '₂',
    3: '₃'
}

class SimulationCanvasPed extends React.Component {

    

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

        const sbc = 5.670367e-8;
        const a = this.props.planetaryAlbedo;
        const s = this.props.stellarRadiation;
        const s0 = s*1361/4;
        const e1 = typeof this.props.layers[0] === "undefined" ? 0 : this.props.layers[0].alpha;
        const e2 = typeof this.props.layers[1] === "undefined" ? 0 : this.props.layers[1].alpha;
        const e3 = typeof this.props.layers[2] === "undefined" ? 0 : this.props.layers[2].alpha;
        const ei = [e1,e2,e3]

        const shortwaveColor = "#ffd11a"
        const longwaveColor = "#ff3333"

        var surfaceTemp = parseInt(getSurfaceTemp(a, s, e1, e2, e3),10)
        const deltaTemp = getSurfaceTemp(a,s,e1,e2,e3)-getSurfaceTemp(a,s,0,0,0)
        var layerTemps = []

        for (let i = 0; i < 3; i++) {
            if (ei[i] !== 0) {
                layerTemps[i] = getLayerTemp(i, a, s, ei)
            }
        }
        const surfaceTempCel = (surfaceTemp-273.15).toFixed(0)
        var layerTempsCel = []

        for (let i = 0; i < 3; i++) {
            if (ei[i] !== 0) {
                layerTempsCel[i] = (parseInt(getLayerTemp(i, a, s, ei),10)-273.15).toFixed(0)
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
        
        // Draw longwave planet emission
        //y=181 is approximately the midway of the atmosphere
        drawArrow(ctx, 165, 355, 165, 186+getLayerWidth(ei[0]), getLayerAbsorbedEmission(sbc,surfaceTemp, s0,ei), longwaveColor )



        // Draw the planet
        ctx.beginPath();
        ctx.arc(planetX, planetY, planetRadius, -Math.PI, Math.PI);
        ctx.fillStyle = getPlanetColor(a);
        ctx.fill();

        // Draw longwave atmospheric emission
        drawArrow(ctx, 270, 181, 270, 298, getAtmosphericRadiationTopWidth(sbc,layerTemps, ei, s0), longwaveColor )
        drawArrow(ctx, 270, 181, 270, 65, getAtmosphericRadiationTopWidth(sbc,layerTemps, ei, s0), longwaveColor )
 


        for (let i = 0; i < 2; i++) {

            // if (!(typeof this.props.layers[i] === "undefined") && this.props.layers[i].alpha > 0) {

            if (ei[i] !== 0) {

                // maxLayer = i;

                ctx.beginPath();

                ctx.arc(planetX, planetY, planetRadius + 170, -Math.PI, Math.PI);

                ctx.strokeStyle = "#99ccff";

                ctx.lineWidth = getLayerWidth(ei[i]);

                ctx.stroke()

            }

        }

        
        // Draw stellar radiation arrow
        drawArrow(ctx, 43, 57, 100, 328, getStellarWidth(), shortwaveColor)

        // Draw reflected shortwave
        if(a > 0){
            drawArrow(ctx, 85, 355, 20, 270, getReflectedStellarWidth(a), shortwaveColor)
        }

        // Draw longwave planet emission that is not absorbed by atmosphere
        //if((1-ei[0])*(1-ei[1])*(1-ei[2]) > 0 ){
        drawArrow(ctx, 215, 350, 215, 50, getEscapingSurfaceEmissionWidth(sbc,surfaceTemp, s0, ei), longwaveColor)
        //}

        
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
                ctx.fillText("T" + unicodeSubscriptDict[i + 1] + "= " + layerTempsCel[i] + "°C", tx, ty);
            }
        }

        // Delta Temperature label
        ctx.beginPath()
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 0.5;
        ctx.stroke()
        ctx.fillText("T"+unicodeSubscriptDict[0]+" without greenhouse effect = "+(surfaceTempCel-deltaTemp)+ "°C", 60, 430);

        ctx.beginPath()
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 0.5;
        ctx.stroke()
        ctx.fillText("ΔT = " + deltaTemp + "°C", 60, 460);


        // Surface temperature label
        ctx.beginPath()
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.lineWidth = 0.5;
        let tx = 175
        let ty = 380
        ctx.clearRect(tx - 10, ty - 17, 235, 23)
        ctx.rect(tx - 10, ty - 17, 235, 23)
        ctx.stroke()
        ctx.fillText("Surface temp. T" + unicodeSubscriptDict[0] + "= " + surfaceTempCel + "°C", tx, ty);
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
    if(width <= 0.5) return;
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

function getLayerWidth(e){

    const maxWidth = 62

    const minWidth = 12.4

    return (maxWidth-minWidth) * e + minWidth

}

// Returns a color based on the albedo
function getPlanetColor(albedo){
    const maxIntensity = 100
    const minIntensity = 0

    var intensity = (maxIntensity - minIntensity) * albedo + minIntensity
    return rgb(intensity, intensity, intensity);
}

function getStellarWidth(){
    //It was decided that the size of the arrow should be fixed since the variation would propagate to other arrows in too large scale
    //same as pro version
    return 28;
}

function getReflectedStellarWidth(albedo){
   return ((getStellarWidth())*(albedo)).toFixed(2)
}

function getSurfaceEmissionWidth(sbc,temp,s0){
    
    const relativeWidth = (sbc*Math.pow(temp,4)) / (s0)
    return relativeWidth*getStellarWidth()
}

function getLayerAbsorbedEmission(sbc,temp, s0, ei){
    //var emul = (1-ei[0])*(1-ei[1])*(1-ei[2])
    return getSurfaceEmissionWidth(sbc,temp, s0)*(ei[0])
}

function getEscapingSurfaceEmissionWidth(sbc,temp,s0 , ei){
    //var emul = (1-ei[0])*(1-ei[1])*(1-ei[2])
    return getSurfaceEmissionWidth(sbc,temp,s0)*(1-ei[0])
}

function getAtmosphericRadiationTopWidth(sbc,layerTemps, ei, s0){
    //const maxWidth = 8
    //const minWidth = 0

    var t1 = typeof layerTemps[0] === "undefined" ? 0 : layerTemps[0];
    //var t2 = typeof layerTemps[1] === "undefined" ? 0 : layerTemps[1] / Math.pow(s0,(1/4));
    //var t3 = typeof layerTemps[2] === "undefined" ? 0 : layerTemps[2] / Math.pow(s0,(1/4));
    
    var relativeWidth = sbc*Math.pow(t1,4)*ei[0]/s0
    //const maxVal = 3.04;
    //const minVal = 0;
    //var relativeVal = (value - minVal) / (maxVal - minVal)
    return getStellarWidth() * relativeWidth;
}



export default SimulationCanvasPed