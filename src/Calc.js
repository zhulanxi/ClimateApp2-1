const sbc = 5.670367e-8;
const decimals = 0;

  //Compute the temperatures
  /**
   * a: Planetary albedo (0-1)
   * s: Stellar radiation (0-10), 1 is equal to stellar radiation on the earth
   * ei: emissivity of layer i. Set to 0 if no such layer
   */
  export function getSurfaceTemp(a,s,e1,e2,e3){
    
    const s0 = s*1361/4;

    // console.log(`Params: a: ${a} s: ${s} s0: ${s0} e1: ${e1} e2: ${e2} e3: ${e3}`)
    var temp = 2*(1-a)*(4-e1*e2-e1*e3-e2*e3+e1*e2*e3)*s0;
    // console.log("Numerator: "+temp);
    temp /= sbc*(2-e1)*(2-e2)*(2-e3);

    return Math.pow(temp,1/4).toFixed(decimals);
  }

  function getLayer1Temp(a,s,e1,e2,e3){
 
    const s0 = s*1361/4;

    // console.log(`Params: a: ${a} s: ${s} e1: ${e1} e2: ${e2} e3: ${e3}`)
    var temp = (a-1)*(4+2*e2-2*e1*e2+2*e3-2*e1*e3-3*e2*e3+2*e1*e2*e3)*s0;
    temp /= sbc*(e1-2)*(e2-2)*(e3-2);

    return Math.pow(temp,1/4).toFixed(decimals);
  }

  function getLayer2Temp(a,s,e1,e2,e3){

    const s0 = s*1361/4;

    // console.log(`Params: a: ${a} s: ${s} e1: ${e1} e2: ${e2} e3: ${e3}`)
    var temp = (a-1)*(-2-e3+e2*e3)*s0;
    temp /= sbc*(e2-2)*(e3-2);

    return Math.pow(temp,1/4).toFixed(decimals);
  }

  function getLayer3Temp(a,s,e1,e2,e3){

    const s0 = s*1361/4;

    // console.log(`Params: a: ${a} s: ${s} e1: ${e1} e2: ${e2} e3: ${e3}`)
    var temp = (a-1)*s0;
    temp /= sbc*(e3-2);

    return Math.pow(temp,1/4).toFixed(decimals);
  }

  /**
   * 
   * @param {integer} layerNumber Integer from 1 to 3, index of the layer we want to compute the temperature
   * @param {float} a Float between 0 and 1, represents planetary albedo
   * @param {float} s Float between 0 and 10, represents the stellar radiation
   * @param {float} e1 Float between 0 and 1, layer's emissivity 
   * @param {float} e2 """"
   * @param {float} e3 """"
   */
  export function getLayerTemp(layerNumber, a, s, ei){
    var e1 = ei[0]
    var e2 = ei[1]
    var e3 = ei[2]
      switch(layerNumber){
            case 0:
                return getLayer1Temp(a,s,e1,e2,e3);
            case 1:
                return getLayer2Temp(a,s,e1,e2,e3);
            case 2:
                return getLayer3Temp(a,s,e1,e2,e3); 
            default:
                console.log("Error, invalid layer number: "+layerNumber);
      }
  }
