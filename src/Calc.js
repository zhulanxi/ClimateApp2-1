const sbc = 5.670367e-8;//Stefan-Boltzmann constant
const decimals = 0;//for temperature display
//export const maxInsolation = 100;
//export const minInsolation = 0.01;
//const maxAlbedo = 0.99;


//Compute the temperatures

/**

 * a: Planetary albedo (0-0.99)

 * n: Stellar radiation (0.01-100), 1 is equal to stellar radiation on the earth

 * elwi: long wave emissivity of layer i. Set to 0 if no such layer
 
 * ai: single scattering albedo (scattering/(scattering+absorption)). Set to 0 if no such layer

 * si: opacity (scattering+absorption). Set to 0 if no such layer

 */

function getShortSurf(A, n, s1, s2, s3, a1, a2, a3) {
  //where n is n times solar radiation
  
    const s0 = n * 1361 / 4;
    const Tirr = s0/sbc; //Tirr^4
    const surf = Tirr*4.0*(a3*s3 - 2.0*s3
      + 2.0)*(4.0*A
              + 2.0*a1*s1*(A - 1.0)
                             + a2*s2*(A - 1.0)*(a1*s1 - 2.0*s1 + 2.0)
                             - 4.0*s1*(A - 1.0) - 2.0*s2*(A - 1.0)
                             *(a1*s1 - 2.0*s1 + 2.0) 
                             - 4.0)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3
                                     - 4.0*A*a1**2*a2*s1**2*s2
                                     - A*a1**2*a3*s1**2*s3*(a2*s2
                                                            - 2.0*s2 + 2.0)**2
                                     - 4.0*A*a1*a2*a3*s1*s2*s3 + 16.0*A*a1*s1
                                     - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 +
                                                            2.0)**2
                                     + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2
                                     + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2
                                                                          - 2.0*s2 + 2.0)**2
                                     - 2.0*a1*a2**2*a3*s1*s2**2*s3
                                     + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2
                                                                          - 2.0*s2 + 2.0)**2
                                     + 8.0*a2*a3*s2*s3 - 32.0);
  return surf
}

function getShortL1(A, n, s1, s2, s3, a1, a2, a3) {
  //where n is n times solar radiation
  
    const s0 = n * 1361 / 4;
    const Tirr = s0/sbc; //Tirr^4
    const l1 = Tirr*4.0*s1*(a3*s3
      - 2.0*s3 + 2.0)*(-A*a1*a2*s1*s2*(a1 - 1.0)
                       + 2.0*A*a1*s1*s2*(a1 - 1.0)
                       + A*a2*s2*(a1 - 1.0)*(a1*s1
                                             - 2.0*s1 + 2.0)
                       - 4.0*A*s1*(a1 - 1.0) - 2.0*A*s2*(a1
                                                         - 1.0)*(a1*s1
                                                                 - 2.0*s1 + 2.0)
                       + 4.0*A*(a1 - 1.0) + 4.0*a1 + 2.0*a2*s2*(a1 - 1.0)
                       - 4.0*s2*(a1 - 1.0) - 4.0)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3
                                                   - 4.0*A*a1**2*a2*s1**2*s2
                                                   - A*a1**2*a3*s1**2*s3*(a2*s2
                                                                          - 2.0*s2 + 2.0)**2
                                                   - 4.0*A*a1*a2*a3*s1*s2*s3
                                                   + 16.0*A*a1*s1
                                                   - A*a2**2*a3*s2**2*s3*(a1*s1
                                                                          - 2.0*s1 + 2.0)**2
                                                   + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2
                                                   + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2
                                                                                        - 2.0*s2 + 2.0)**2
                                                   - 2.0*a1*a2**2*a3*s1*s2**2*s3
                                                   + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2
                                                                                        - 2.0*s2 + 2.0)**2
                                                   + 8.0*a2*a3*s2*s3 - 32.0);
  return l1
}

function getShortL2(A, n, s1, s2, s3, a1, a2, a3) {
  //where n is n times solar radiation
  
    const s0 = n * 1361 / 4;
    const Tirr = s0/sbc; //Tirr^4
    const l2 = Tirr*4.0*s2*(a3*s3
      - 2.0*s3 + 2.0)*(A*a1**2*s1**2*s2*(a2 - 1.0)
                       - A*a1**2*s1**2*(a2 - 1.0)
                       + A*a1*s1*(a2 - 1.0)*(a1*s1 - 2.0*s1 + 2.0)
                       - 2.0*A*s1*(a2 - 1.0)*(a1*s1 - 2.0*s1 + 2.0)
                       - 4.0*A*s1*(a2 - 1.0) - A*s2*(a2 - 1.0)*(a1*s1 - 2.0*s1 + 2.0)**2
                       + 4.0*A*(a2 - 1.0) - 2.0*a1*s1*s2*(a2 - 1.0)
                       + 2.0*a1*s1*(a2 - 1.0) + 4.0*a2 - 4.0)/(A*a1**2*a2**2*a3*s1**2*s2**2*s3
                                                               - 4.0*A*a1**2*a2*s1**2*s2
                                                               - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2
                                                               - 4.0*A*a1*a2*a3*s1*s2*s3
                                                               + 16.0*A*a1*s1
                                                               - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2
                                                               + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2
                                                               + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2
                                                                                                    - 2.0*s2
                                                                                                    + 2.0)**2
                                                               - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2
                                                               + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2
                                                               + 8.0*a2*a3*s2*s3 - 32.0);
  return l2
}

function getShortL3(A, n, s1, s2, s3, a1, a2, a3) {
  //where n is n times solar radiation
  
    const s0 = n * 1361 / 4;
    const Tirr = s0/sbc; //Tirr^4
    const l3 = Tirr*s3*((-a3 + 1.0)*(A*a1**2*a2**2*a3*s1**2*s2**2*s3
      - 4.0*A*a1**2*a2*s1**2*s2
      - A*a1**2*a3*s1**2*s3*(a2*s2
                             - 2.0*s2 + 2.0)**2
      - 4.0*A*a1*a2*a3*s1*s2*s3
      + 16.0*A*a1*s1 - A*a2**2*a3*s2**2*s3*(a1*s1
                                            - 2.0*s1 + 2.0)**2
      + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2
      + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2
      - 2.0*a1*a2**2*a3*s1*s2**2*s3 + 8.0*a1*a2*s1*s2
      + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2
      + 8.0*a2*a3*s2*s3 - 32.0) + (a3 - 1.0)*(a3*s3
                                              - 2.0*s3 + 2.0)*(A*a1**2*a2**2*s1**2*s2**2
                                                               - A*a1**2*a2*s1**2*s2*(a2*s2
                                                                                      - 2.0*s2 + 2.0)
                                                               - 2.0*A*a1**2*a2*s1**2*s2
                                                               + 2.0*A*a1**2*s1**2*s2*(a2*s2
                                                                                       - 2.0*s2 + 2.0)
                                                               + 4.0*A*a1**2*s1**2*s2
                                                               - 4.0*A*a1**2*s1**2
                                                               - 4.0*A*a1*a2*s1*s2
                                                               + 4.0*A*a1*s1*(a1*s1 - 2.0*s1 + 2.0)
                                                               + 8.0*A*a1*s1
                                                               - A*a2**2*s2**2*(a1*s1
                                                                                - 2.0*s1 + 2.0)**2
                                                               + A*a2*s2*(a1*s1 - 2.0*s1
                                                                          + 2.0)**2*(a2*s2
                                                                                     - 2.0*s2 + 2.0)
                                                               + 2.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2
                                                               - 8.0*A*s1*(a1*s1 - 2.0*s1 + 2.0)
                                                               - 16.0*A*s1
                                                               - 2.0*A*s2*(a1*s1
                                                                           - 2.0*s1
                                                                           + 2.0)**2*(a2*s2
                                                                                      - 2.0*s2
                                                                                      + 2.0)
                                                               - 4.0*A*s2*(a1*s1 - 2.0*s1 + 2.0)**2
                                                               + 16.0*A - 2.0*a1*a2**2*s1*s2**2
                                                               + 2.0*a1*a2*s1*s2*(a2*s2
                                                                                  - 2.0*s2 + 2.0)
                                                               + 4.0*a1*a2*s1*s2
                                                               - 4.0*a1*s1*s2*(a2*s2 - 2.0*s2 + 2.0)
                                                               - 8.0*a1*s1*s2
                                                               + 8.0*a1*s1
                                                               + 8.0*a2*s2))/(A*a1**2*a2**2*a3*s1**2*s2**2*s3
                                                                              - 4.0*A*a1**2*a2*s1**2*s2
                                                                              - A*a1**2*a3*s1**2*s3*(a2*s2 - 2.0*s2 + 2.0)**2
                                                                              - 4.0*A*a1*a2*a3*s1*s2*s3
                                                                              + 16.0*A*a1*s1
                                                                              - A*a2**2*a3*s2**2*s3*(a1*s1 - 2.0*s1 + 2.0)**2
                                                                              + 4.0*A*a2*s2*(a1*s1 - 2.0*s1 + 2.0)**2
                                                                              + A*a3*s3*(a1*s1 - 2.0*s1 + 2.0)**2*(a2*s2 - 2.0*s2 + 2.0)**2
                                                                              - 2.0*a1*a2**2*a3*s1*s2**2*s3
                                                                              + 8.0*a1*a2*s1*s2 + 2.0*a1*a3*s1*s3*(a2*s2 - 2.0*s2 + 2.0)**2
                                                                              + 8.0*a2*a3*s2*s3 - 32.0);
  return l3
}

export function getSurfaceTemp(A, n, elw1, elw2, elw3, s1, s2, s3, a1, a2, a3) {

  //The constant terms below are shortwave absorption terms.
  const surf = getShortSurf(A, n, s1, s2, s3, a1, a2, a3)
  const l1 = getShortL1(A, n, s1, s2, s3, a1, a2, a3)
  const l2 = getShortL2(A, n, s1, s2, s3, a1, a2, a3)
  const l3 = getShortL3(A, n, s1, s2, s3, a1, a2, a3)

  // console.log(`Params: a: ${a} n: ${n} esw1: ${esw1} esw2: ${esw2} esw3: ${esw3} 
  // elw1: ${elw1} elw2: ${elw2} elw3: ${elw3}`)
  var temp = -2*elw1*elw2*elw3*l1 - elw1*elw2*elw3*l2 - 2*elw1*elw2*elw3*surf
  + 2*elw1*elw2*l1 - elw1*elw2*l3 + 2*elw1*elw2*surf + 2*elw1*elw3*l1
  + elw1*elw3*l2 + 2*elw1*elw3*surf + 2*elw1*l2 + 2*elw1*l3
  + 3*elw2*elw3*l1 + 2*elw2*elw3*l2 + 2*elw2*elw3*surf - 2*elw2*l1
  + 2*elw2*l3 - 2*elw3*l1 - 2*elw3*l2
  - 4*l1 - 4*l2 - 4*l3 - 8*surf;


  // console.log("Numerator: "+temp);

  temp /= elw1*elw2*elw3
  - 2*elw1*elw2
  - 2*elw1*elw3 + 4*elw1
  - 2*elw2*elw3 + 4*elw2 + 4*elw3 - 8;

  return Math.pow(temp, 1 / 4).toFixed(decimals);

}



/*export function getMaxSurfaceTemp() {

  return getSurfaceTemp(0, maxInsolation, 1, 1, 1);

}
export function getMinSurfaceTemp() {

  return getSurfaceTemp(maxAlbedo, minInsolation, 0.001, 0.001, 0.001)

}
#Max and mins are hard to determine due to the shortwave opacity and 
single scattering albedo factors.
*/


function getLayer1Temp(A, n, elw1, elw2, elw3, s1, s2, s3, a1, a2, a3) {
  //The constant terms below are shortwave absorption terms.
  const surf = getShortSurf(A, n, s1, s2, s3, a1, a2, a3)
  const l1 = getShortL1(A, n, s1, s2, s3, a1, a2, a3)
  const l2 = getShortL2(A, n, s1, s2, s3, a1, a2, a3)
  const l3 = getShortL3(A, n, s1, s2, s3, a1, a2, a3)
  
    // console.log(`Params: a: ${a} n: ${n} esw1: ${esw1} esw2: ${esw2} esw3: ${esw3} 
    // elw1: ${elw1} elw2: ${elw2} elw3: ${elw3}`)
	  var temp = -2*elw1**2*elw2*elw3*l1
    - elw1**2*elw2*elw3*l2
    - 2*elw1**2*elw2*elw3*surf
    + 2*elw1**2*elw2*l1 - elw1**2*elw2*l3
    + 2*elw1**2*elw2*surf + 2*elw1**2*elw3*l1
    + elw1**2*elw3*l2 + 2*elw1**2*elw3*surf
    + 2*elw1**2*l2 + 2*elw1**2*l3 + 4*elw1*elw2*elw3*l1
    + 2*elw1*elw2*elw3*l2 + 3*elw1*elw2*elw3*surf
    - 4*elw1*elw2*l1 + 2*elw1*elw2*l3 - 2*elw1*elw2*surf
    - 4*elw1*elw3*l1 - 2*elw1*elw3*l2 - 2*elw1*elw3*surf
    - 4*elw1*l2 - 4*elw1*l3 - 4*elw1*surf - elw2*elw3*l1
    + 2*elw2*l1 + 2*elw3*l1 - 4*l1;


	  // console.log("Numerator: "+temp);

	  temp /= elw1*(elw1*elw2*elw3
      - 2*elw1*elw2
      - 2*elw1*elw3 + 4*elw1
      - 2*elw2*elw3 + 4*elw2 + 4*elw3 - 8);
	  

  return Math.pow(temp, 1 / 4).toFixed(decimals);

}



/*function getMaxLayer1Temp() {

  return getLayer1Temp(0, maxInsolation, 1, 1, 1);

}
function getMinLayer1Temp() {

  return getLayer1Temp(maxAlbedo, minInsolation, 0.001, 0.001, 0.001);

}*/



function getLayer2Temp(A, n, elw1, elw2, elw3, s1, s2, s3, a1, a2, a3) {
  //The constant terms below are shortwave absorption terms.
  const surf = getShortSurf(A, n, s1, s2, s3, a1, a2, a3)
  const l1 = getShortL1(A, n, s1, s2, s3, a1, a2, a3)
  const l2 = getShortL2(A, n, s1, s2, s3, a1, a2, a3)
  const l3 = getShortL3(A, n, s1, s2, s3, a1, a2, a3)

	// console.log(`Params: a: ${a} n: ${n} esw1: ${esw1} esw2: ${esw2} esw3: ${esw3} 
	  // elw1: ${elw1} elw2: ${elw2} elw3: ${elw3}`)

  var temp = -(elw2**2*elw3*l1) - elw2**2*elw3*l2
  - elw2**2*elw3*surf - elw2**2*l3
  + elw2*elw3*l1 + 2*elw2*elw3*l2
  + elw2*elw3*surf + 2*elw2*l1 + 2*elw2*l3
  + 2*elw2*surf - elw3*l2 + 2*l2;

  temp /= elw2*(elw2*elw3
    - 2*elw2 - 2*elw3 + 4);



  return Math.pow(temp, 1 / 4).toFixed(decimals);

}



/*function getMaxLayer2Temp() {

  return getLayer2Temp(0, maxInsolation, 1, 1, 1);
}
function getMinLayer2Temp() {

  return getLayer2Temp(maxAlbedo, minInsolation, 0.001, 0.001, 0.001);
}*/



function getLayer3Temp(A, n, elw1, elw2, elw3, s1, s2, s3, a1, a2, a3) {
  //The constant terms below are shortwave absorption terms.
  const surf = getShortSurf(A, n, s1, s2, s3, a1, a2, a3)
  const l1 = getShortL1(A, n, s1, s2, s3, a1, a2, a3)
  const l2 = getShortL2(A, n, s1, s2, s3, a1, a2, a3)
  const l3 = getShortL3(A, n, s1, s2, s3, a1, a2, a3)  
  
	// console.log(`Params: a: ${a} n: ${n} esw1: ${esw1} esw2: ${esw2} esw3: ${esw3} 
	  // elw1: ${elw1} elw2: ${elw2} elw3: ${elw3}`)

  var temp = -(elw3*l1 + elw3*l2 + elw3*surf + l3);

  temp /= elw3*(elw3 - 2);



  return Math.pow(temp, 1 / 4).toFixed(decimals);

}

/*function getMaxLayer3Temp() {

  return getLayer3Temp(0, maxInsolation, 1, 1, 1);

}
function getMinLayer3Temp() {

  return getLayer3Temp(maxAlbedo, minInsolation, 0.001, 0.001, 0.001);

}*/



/**

 * 

 * @param {integer} layerNumber Integer from 1 to 3, index of the layer we want to compute the temperature

 * @param {float} a Float between 0 and 1, represents planetary albedo

 * @param {float} n Float between 0 and 10, represents the stellar radiation (n*solar radiation)

 * @param {float} elw1 Float between 0 and 1, layer's longwave emissivity

 * @param {float} elw2 """"

 * @param {float} elw3 """"

 * @param {float} a1 Float between 0 and 1, layer's single scattering albedo

 * @param {float} a2 """"

 * @param {float} a3 """"

 * @param {float} s1 Float between 0 and 1, layer's opacity

 * @param {float} s2 """"

 * @param {float} s3 """"
 
 */

export function getLayerTemp(layerNumber, a, n, elwi, si, ai) {

  var elw1 = elwi[0];

  var elw2 = elwi[1];

  var elw3 = elwi[2];

  var s1 = si[0];

  var s2 = si[1];

  var s3 = si[2];

  var a1 = ai[0];

  var a2 = ai[1];

  var a3 = ai[2];

  switch (layerNumber) {

    case 0:

      return getLayer1Temp(a, n, elw1, elw2, elw3, s1, s2, s3, a1, a2, a3);

    case 1:

      return getLayer2Temp(a, n, elw1, elw2, elw3, s1, s2, s3, a1, a2, a3);

    case 2:

      return getLayer3Temp(a, n, elw1, elw2, elw3, s1, s2, s3, a1, a2, a3);

    default:

      console.log("Error, invalid layer number: " + layerNumber);

  }

}



/*export function getMaxLayerTemp(layerNumber) {

  switch (layerNumber) {

    case 0:

      return getMaxLayer1Temp();

    case 1:

      return getMaxLayer2Temp();

    case 2:

      return getMaxLayer3Temp();

    default:

      console.log("Error, invalid layer number: " + layerNumber);

  }

}
export function getMinLayerTemp(layerNumber) {

  switch (layerNumber) {

    case 0:

      return getMinLayer1Temp();

    case 1:

      return getMinLayer2Temp();

    case 2:

      return getMinLayer3Temp();

    default:

      console.log("Error, invalid layer number: " + layerNumber);

  }

}*/