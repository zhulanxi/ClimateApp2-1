import React from 'react';
import { getSurfaceTemp, getLayerTemp } from './Calc.js'

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

        const sbc = 5.670367e-8;
        const a = this.props.planetaryAlbedo;
        const s = this.props.stellarRadiation;
        const s0 = s*1361/4;
        const e1 = typeof this.props.layers[0] === "undefined" ? 0 : this.props.layers[0].alpha;
        const e2 = typeof this.props.layers[1] === "undefined" ? 0 : this.props.layers[1].alpha;
        const e3 = typeof this.props.layers[2] === "undefined" ? 0 : this.props.layers[2].alpha;
        const ei = [e1,e2,e3]

        
        
        const s1 = typeof this.props.layers[0] === "undefined" ? 0: this.props.layers[0].opa;
        const s2 = typeof this.props.layers[1] === "undefined" ? 0: this.props.layers[1].opa;
        const s3 = typeof this.props.layers[2] === "undefined" ? 0: this.props.layers[2].opa;
        const si = [s1,s2,s3]

        const a1 = typeof this.props.layers[0] === "undefined" ? 0: this.props.layers[0].sca;
        const a2 = typeof this.props.layers[1] === "undefined" ? 0: this.props.layers[1].sca;
        const a3 = typeof this.props.layers[2] === "undefined" ? 0: this.props.layers[2].sca;
        const ai = [a1,a2,a3]

        const shortwaveColor = "#ffd11a"
        const longwaveColor = "#ff3333"

        const surfaceTemp = getSurfaceTemp(a, s, e1, e2, e3, s1, s2, s3, a1, a2, a3)
        var layerTemps = []

        for (let i = 0; i < 3; i++) {
            if (ei[i] !== 0) {
                layerTemps[i] = getLayerTemp(i, a, s, ei, si, ai)
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
        drawArrow(ctx, 190, 352, 190, 142, getSurfaceEmissionWidth(sbc,surfaceTemp, s0), longwaveColor )

        // Draw longwave planet emission that is not absorbed by atmosphere
        if((1-ei[0])*(1-ei[1])*(1-ei[2]) > 0 ){
            drawArrow(ctx, 190, 352, 190, 50, getEscapingSurfaceEmissionWidth(sbc, surfaceTemp, s0, ei), longwaveColor)
        }

        // Draw the planet
        ctx.beginPath();
        ctx.arc(planetX, planetY, planetRadius, -Math.PI, Math.PI);
        ctx.fillStyle = getPlanetColor(a);
        ctx.fill();

        // Draw stellar radiation arrow
        drawArrow(ctx, 18, 65, 35, 163, getStellarWidth(), shortwaveColor)

        //Draw stellar radiation arrow after absorption
        //From atm to ground is just d1 (down from layer 1)
        drawArrow(ctx, 40,180, 70, 355, 
            getAtmToGroundWidthFactor(s1, s2, s3, a1, a2, a3,a)*getStellarWidth(), shortwaveColor )
//was 40 180
        // Draw reflected shortwave
        //From ground to atm is just u0 (up from surface)
        if(a > 0){
            drawArrow(ctx, 100, 355, 115, 225, 
                getStellarWidth()*getReflectedStellarWidth(s1, s2, s3, a1, a2, a3,a), shortwaveColor)
        }

        //Draw shortwave from TOA to space
        //u3
        drawArrow (ctx, 118, 200, 133, 70, 
            getEffectiveAlbedo(layerTemps, s1, s2, s3, a1, a2, a3,a)*getStellarWidth(),shortwaveColor)
        

        // Draw longwave atmospheric emission
        drawArrow(ctx, 270, 200, 270, 340, getAtmosphericRadiationBotWidth(sbc, layerTemps,s0,ei), longwaveColor )
        drawArrow(ctx, 270, 155, 270, 40, getAtmosphericRadiationTopWidth(sbc,layerTemps, s0,ei), longwaveColor )

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

        // Equivalent albedo label
        ctx.beginPath()
        ctx.font="15px Arial"
        ctx.fillStyle = "black";
        ctx.fillText("Effective", 80, 50);
        ctx.fillText(" albedo: ", 80, 65);//just making the two words
        // to appear on different lines
        ctx.fillText(getEffectiveAlbedo(layerTemps, s1,s2,s3,a1,a2,a3, a).toFixed(2), 140, 60);
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
    var headlen = 15;
    var angle = Math.atan((toy-fromy)/(tox-fromx));
    var hypotenus = Math.pow(0.25*width*width+headlen*headlen,1/2);
    //var totalLen = Math.sqrt(Math.pow(toy-fromy,2)+Math.pow(tox-fromx,2));
    var deltaX = headlen*Math.cos(angle);
    var deltaY = Math.tan(angle)*deltaX;

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox-deltaX, toy-deltaY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-hypotenus*Math.cos(angle-Math.atan(0.42*width/headlen)),toy-hypotenus*Math.sin(angle-Math.atan(0.5*width/headlen)));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-hypotenus*Math.cos(angle+Math.atan(0.42*width/headlen)),toy-hypotenus*Math.sin(angle+Math.atan(0.5*width/headlen)));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-hypotenus*Math.cos(angle-Math.atan(0.42*width/headlen)),toy-hypotenus*Math.sin(angle-Math.atan(0.5*width/headlen)));

    //draws the paths created above
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
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
 
function getStellarWidth(){
    //It was decided that the size of the arrow should be fixed since the variation would propagate to other arrows in too large scale
    //const maxWidth = 25
    //const minWidth = 10

    //Get a value between 0 and 1
    //var linearRad = (20*Math.log10(stellarRad)+40)/100
    //var width = (maxWidth - minWidth) * linearRad + minWidth
    //return width.toFixed(2);
    return 35;
}


function getReflectedStellarWidth(s1, s2, s3, a1, a2, a3, A){
   return (-4.0*A*(a3*s3 - 2.0*s3 + 2.0)*(2.0*a1*s1 + a2*s2*(a1*s1 - 2.0*s1 + 2.0) - 4.0*s1 - 2.0*s2*(a1*s1 - 2.0*s1 + 2.0) + 4.0)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3 - 4.0*A*a1**2*a2*s1**2*s2 - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2 + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*a3*s2*s3 - 32.0))
   .toFixed(2)
}

function getLayerWidth(e){
    const maxWidth = 10
    const minWidth = 2
    return (maxWidth-minWidth) * e + minWidth
}

function getSurfaceEmissionWidth(sbc,temp,s0){
    const relativeWidth = (sbc*Math.pow(temp,4)) / (s0)
    return relativeWidth*getStellarWidth()
}

function getEscapingSurfaceEmissionWidth(sbc, temp, s0 , ei){
    var emul = (1-ei[0])*(1-ei[1])*(1-ei[2])
    return getSurfaceEmissionWidth(sbc,temp,s0)*(emul)
}

function getAtmosphericRadiationBotWidth(sbc, layerTemps, s0, ei){
    
    var t1 = typeof layerTemps[0] === "undefined" ? 0 : layerTemps[0] ;
    var t2 = typeof layerTemps[1] === "undefined" ? 0 : layerTemps[1] ;
    var t3 = typeof layerTemps[2] === "undefined" ? 0 : layerTemps[2] ;

    const relativeWidth = (sbc*Math.pow(t1,4)*ei[0]+sbc*Math.pow(t2,4)*ei[1]*(1-ei[0])+sbc*Math.pow(t3,4)*ei[2]*(1-ei[1])*(1-ei[0]))/s0
    return relativeWidth*getStellarWidth();
}

function getAtmosphericRadiationTopWidth(sbc, layerTemps,s0, ei){
    
    var t1 = typeof layerTemps[0] === "undefined" ? 0 : layerTemps[0] ;
    var t2 = typeof layerTemps[1] === "undefined" ? 0 : layerTemps[1] ;
    var t3 = typeof layerTemps[2] === "undefined" ? 0 : layerTemps[2] ;

    const relativeWidth = (sbc*Math.pow(t1,4)*ei[0]*(1-ei[1])*(1-ei[2])+sbc*Math.pow(t2,4)*ei[1]*(1-ei[2])+sbc*Math.pow(t3,4)*ei[2])/s0
    return relativeWidth*getStellarWidth();
}

//which is just u3 (same as the factor)
function getEffectiveAlbedo(layerTemps,s1,s2,s3,a1,a2,a3,A){
    var t1 = typeof layerTemps[0] === "undefined" ? 0 : 1 ;
    var t2 = typeof layerTemps[1] === "undefined" ? 0 : 1 ;
    var t3 = typeof layerTemps[2] === "undefined" ? 0 : 1 ;
    if (t1 === 0) {
        return u0 (s1,s2,s3,a1,a2,a3,A)
    }
    else if (t2 === 0) {
        return u1 (s1,s2,s3,a1,a2,a3,A)
    }
    else if (t3 === 0) {
        return u2 (s1,s2,s3,a1,a2,a3,A)
    }
    else {
        return u3 (s1,s2,s3,a1,a2,a3,A)
    }

}

//returns d1
function getAtmToGroundWidthFactor (s1, s2, s3, a1, a2, a3,A){
    return (-4.0*(a3*s3 - 2.0*s3 + 2.0)*(2.0*a1*s1 + a2*s2*(a1*s1 - 2.0*s1 + 2.0) - 4.0*s1 - 2.0*s2*(a1*s1 - 2.0*s1 + 2.0) + 4.0)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3 - 4.0*A*a1**2*a2*s1**2*s2 - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2 + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*a3*s2*s3 - 32.0))

}

function u0 (s1, s2, s3, a1, a2, a3, A){
    return (-4.0*A*(a3*s3 - 2.0*s3 + 2.0)*(2.0*a1*s1 + a2*s2*(a1*s1 - 2.0*s1 + 2.0) - 4.0*s1 - 2.0*s2*(a1*s1 - 2.0*s1 + 2.0) + 4.0)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3 - 4.0*A*a1**2*a2*s1**2*s2 - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2 + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*a3*s2*s3 - 32.0))

}

function u1 (s1, s2, s3, a1, a2, a3, A){
    return (-2.0*(a3*s3 - 2.0*s3 + 2.0)*(-A*a1**2*a2*s1**2*s2 + 2.0*A*a1**2*s1**2*s2 - 2.0*A*a1**2*s1**2 + 2.0*A*a1*s1*(a1*s1 - 2.0*s1 + 2.0) + 4.0*A*a1*s1 + A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 - 4.0*A*s1*(a1*s1 - 2.0*s1 + 2.0) - 8.0*A*s1 - 2.0*A*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + 8.0*A + 2.0*a1*a2*s1*s2 - 4.0*a1*s1*s2 + 4.0*a1*s1)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3 - 4.0*A*a1**2*a2*s1**2*s2 - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2 + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*a3*s2*s3 - 32.0))

}

function u2 (s1, s2, s3, a1, a2, a3, A){
    return (-(a3*s3 - 2.0*s3 + 2.0)*(A*a1**2*a2**2*s1**2*s2**2 - A*a1**2*a2*s1**2*s2*(a2*s2 - 2.0*s2 + 2.0) - 2.0*A*a1**2*a2*s1**2*s2 + 2.0*A*a1**2*s1**2*s2*(a2*s2 - 2.0*s2 + 2.0) + 4.0*A*a1**2*s1**2*s2 - 4.0*A*a1**2*s1**2 - 4.0*A*a1*a2*s1*s2 + 4.0*A*a1*s1*(a1*s1 - 2.0*s1 + 2.0) + 8.0*A*a1*s1 - A*a2**2*s2**2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0) + 2.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 - 8.0*A*s1*(a1*s1 - 2.0*s1 + 2.0) - 16.0*A*s1 - 2.0*A*s2*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0) - 4.0*A*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + 16.0*A - 2.0*a1*a2**2*s1*s2**2 + 2.0*a1*a2*s1*s2*(a2*s2 - 2.0*s2 + 2.0) + 4.0*a1*a2*s1*s2 - 4.0*a1*s1*s2*(a2*s2 - 2.0*s2 + 2.0) - 8.0*a1*s1*s2 + 8.0*a1*s1 + 8.0*a2*s2)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3 - 4.0*A*a1**2*a2*s1**2*s2 - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2 + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*a3*s2*s3 - 32.0))

}

function u3 (s1, s2, s3, a1, a2, a3, A){
    return (0.5*(a3*s3*(A*a1**2*a2**2*a3*s1**2*s2**2*s3 - 4.0*A*a1**2*a2*s1**2*s2 - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2 + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*a3*s2*s3 - 32.0) - (a3*s3 - 2.0*s3 + 2.0)**2*(A*a1**2*a2**2*s1**2*s2**2 - A*a1**2*s1**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*s1*s2 - A*a2**2*s2**2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*s1*s2**2 + 2.0*a1*s1*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*s2))/(A*a1**2*a2**2*a3*s1**2*s2**2*s3 - 4.0*A*a1**2*a2*s1**2*s2 - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2 - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2 + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2 + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2 - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2 + 8.0*a2*a3*s2*s3 - 32.0))

}

export default SimulationCanvas;