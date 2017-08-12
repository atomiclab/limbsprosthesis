// title      : Finger Mechanism Holder
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad
include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');
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
 var result,xbottom,cono, ext, int, flat;
 var pi = 180;
function main(params) {
  util.init(CSG);
cacas=screw();

//var test=caca.union(cube({size: [10,10,10], center: [true, true, true]}))
caca=cube({size: [100, 10, 1], center: [true, true, true]})
return cacas;
}




function screw(params) {
    util.init(CSG);

var  vueltas = 4;
var  espacio = 10;
var  radius = 5;

var vagrados = vueltas *360;


var sqrt3 = Math.sqrt(3) / 2;

  	var hex = CSG.Polygon.createFromPoints([
  			[radius, 0, 0],
  			[radius / 2, radius * sqrt3, 0],
  			[-radius / 2, radius * sqrt3, 0],
  			[-radius, 0, 0],
  			[-radius / 2, -radius * sqrt3, 0],
  			[radius / 2, -radius * sqrt3, 0]
  	]);



  	return hex.solidFromSlices({
  		numslices: vagrados,

            callback: function(t, slice) {

        			return this.translate([radius * espacio* t, t, 0]).rotate(
        						[0,40,0], //ancho
        						[1, 0, 0], //-1 cambia el sentido de rosca
        					  slice //z
        					);
        		}


  	});


}
