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


xbottom=
      union(
        difference(
        cube({size: [10, 30, 2.5], center: [true, true, false]}),
        cube({size: [100,30, 5], center: [true, true, false]}).rotateY(50).translate([5, 0, 0]),
        cube({size: [100,30, 5], center: [true, true, false]}).rotateY(-50).translate([-5, 0, 0])
      ),
      cube({size: [6, 30, 3.5], center: [true, true, false]})
);


// We can make arcs and circles:
var curvedpath = CSG.Path2D.arc({
  center: [0,0,0],
  radius: 10,
  startangle: 0,
  endangle: 180,
  resolution: 16,
}).scale([1.3,1,1]);

var curvedpathoutsider = CSG.Path2D.arc({
  center: [0,0,-40],
  radius: 12,
  startangle: -20,
  endangle: 200,
  resolution: 32,
}).scale([1.3,1,1]);



var csg = curvedpath.rectangularExtrude(2, 4, 16, true);   // w, h, resolution, roundEnds
var csgout = curvedpathoutsider.rectangularExtrude(3, 30, 16, true);   // w, h, resolution, roundEnds

var test =

union(

  csg,
  cube({size: [3,8,7], center: [true, true, false]}).translate([10*1.3, 1, 0]).fillet(1.4,'z+'),
  cube({size: [3,8,7], center: [true, true, false]}).translate([-10*1.3, 1, 0]).fillet(1.4,'z+'),
  cube({size: [30,15,1], center: [true, false, false]}).translate([0, -3, 0]),
  xbottom.rotateZ(90).translate([0, 3, -3])
);

var clean= difference(

  test,
  csgout.translate([0, 0, -10]),
  cylinder({r: 1, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 2.5, 5]),
  cylinder({r: 1, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -1, 3.5]),
  cube({size: [10, 100, 20], center: [true, true, true]}).rotateZ(45).translate([10, 15, 0]),
  cube({size: [100, 10, 20], center: [true, true, true]}).rotateZ(45).translate([-10, 15, 0])
);



return clean;



}
