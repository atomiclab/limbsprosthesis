// title      : X1
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad

function getParameterDefinitions() {
  return [
    { name: 'x', type: 'float', initial: 80, caption: "x:" },
    { name: 'y', type: 'float', initial: 30, caption: "y:" },
    { name: 'z', type: 'float', initial: 8, caption: "z:" },
    { name: 'altopata', type: 'float', initial: 20, caption: "altopata" },
    { name: 'colors', type: 'choice', caption: "Colores", values:["red", "blue", "black"], captions:["Rojo", "Azul", "Negro"], initial: "Rojo" },
  ];
}
 var r = [], y = [], t = [];
 var result,xbottom,cono, ext, int, pata;

function main(params) {

        xbottom=
difference(
            union(
                    CSG.roundedCube({ // rounded cube
                        center: [0, 0, 0],
                        
                      radius: [params.y, params.x, params.z],
                        roundradius: 2,
                        resolution: 8,
                    }),

                    CSG.roundedCylinder({               // and its rounded version
                      start: [-params.y, -params.x, 0],
                      end: [-params.y, params.x, 0],
                      radius: params.z,
                      resolution: 16
                    }),
                    CSG.roundedCylinder({               // and its rounded version
                      start: [params.y, -params.x-8, 0],
                      end: [params.y, params.x+8, 0],
                      radius: params.z,
                      resolution: 16
                            })
                )

                //sphere({r: params.y, h: params.z*2,fn:20}).translate([0,params.y,-params.z])    
                //sphere({r: params.y, h: params.z*2}).translate([0,-params.y,-params.z])    

);
return xbottom;
   
    
}






