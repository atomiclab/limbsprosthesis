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
CSG.cylinder({
  start: [0, -1, 0],
  end: [0, 1, 0.0],
  radiusStart: 1.5,                   // start- and end radius defined, partial cones
  radiusEnd: 2,
  resolution: 32
});



return xbottom;
   
    
}






