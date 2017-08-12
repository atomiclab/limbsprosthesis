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
   return[dedo()]
}


function dedo(largo){
var o = [];
   
   for(var i=0; i<3; i++) {           // -- shell like
      var x = sin(i/5*180)*10;
      var y = cos(i/3*180)*10;
      o.push(circle({center: true}).scale(5-i/2).translate([x,y,0]));
   }


   return [
      linear_extrude({height: 5}, chain_hull(o)).translate([-20,0,0]), 
      chain_hull(o), 
      union(o).translate([20,0,0]),

   ];

}





