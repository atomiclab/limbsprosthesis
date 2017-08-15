// title      : thumb
// author     : Gino Tubaro
// license    : MIT License
// description: just a thumb
// file       : pulgar.jscad
//!OpenSCAD
//Hay que corregir los agujeros en el agulo

include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');

function getParameterDefinitions() {
  return [
    { name: 'largodedos', type: 'float', initial: 5, caption: "x:" },
    { name: 'y', type: 'float', initial: 30, caption: "y:" },
    { name: 'z', type: 'float', initial: 8, caption: "z:" },
    { name: 'altopata', type: 'float', initial: 20, caption: "altopata" },
    { name: 'colors', type: 'choice', caption: "Colores", values:["red", "blue", "black"], captions:["Rojo", "Azul", "Negro"], initial: "Rojo" },
  ];
}
 var r = [], y = [], t = [];
 var result,xbo;
 var alto=20;
 var pinconector=2;
 var tornilloconector=3;
function main()
      {
        util.init(CSG);
        var thing = thingTwisted(10, 30);
        return thing;
      }

function conector() {

    var o = new Array();
    var g = new Array();
    var e = new Array();
    var largo=20;
    var last=1;
    var long=0;



  o.push(circle({r:10, center:true}).translate([10,0,0]));
  o.push(circle({r:10, center:true}).translate([-10,0,0]));
  o.push(square({size: [40,10], center: true}).translate([0, 5, 0]));

  g.push(linear_extrude({ height: 5 }, hull(o)).translate([0, 0, 0]));



var todo = union(
    Parts.Triangle(5, 50).translate([0, -1, -1]),
    Parts.Triangle(5, 50).translate([5, -1, -1]),
    cube({size: [5, 10, 50], center: [true, true, false]}).translate([2.5, -6, 0])
  );



  todo= union(g).subtract(todo.rotateX(-90).rotateZ(90).snap(union(g), 'x', 'inside-').translate([-1, -1, 0]));
  todo= todo.subtract(cylinder({r: 1, h: 20, center: true}).rotateX(-90).snap(todo, 'x', 'center-').translate([-1,0, 2]));


return todo;


}

function cuerpo() {

  var o = new Array();
  var g = new Array();
  var e = new Array();
    var largo=20;
    var last=1;
    var long=0;

for (var i = 0; i < largo; i=i+0.25) {

  o.push(circle({r:10, center:true}).translate([10,0,0]));
  o.push(circle({r:10, center:true}).translate([-10,0,0]));
  o.push(circle({r: 0.5*Math.sign(i) * Math.sign( Math.abs(i)/4-2)*(1-Math.pow(Math.abs(Math.abs(i)/2-1), 1.5) )+0.5, center:true}).translate([15,2,0]));
  o.push(square({size: [40,10], center: true}).translate([0, 5, 0]));

  g.push(linear_extrude({ height: 1 }, hull(o)).translate([0, 0, i]));
o=[];

}
var todo = union(g);
          var cbox = difference(todo,todo.scale([0.9,0.9,1.2]));

  return union(cbox);



}


function thingTwisted(radius, height) {

	var cag = CAG.fromPoints([
		[-radius, -radius, 0],
		[radius, -radius, 0],
		[radius, radius, 0]
	]).expand(1, CSG.defaultResolution2D);

	var flatBottom = CSG.Polygon.createFromPoints(
		cag.getOutlinePaths()[0].points
	);


  var thing = flatBottom.solidFromSlices({
	numslices: height
	,callback: function(t) {
		var coef = 1+t;
    var o = new Array();
		if (coef < 0.01) coef = 0.01;//must not collapse polygon
		var h = height * t;


o.push(circle({r:10, center:true}).translate([10,0,0]));
o.push(circle({r:10, center:true}).translate([-10,0,0]));
o.push(circle({r:Math.sin(coef*4.8)+8, center:true}).translate([13,9,0]));
o.push(square({size: [40,10], center: true}).translate([0, 5, 0]));

var cag =  hull(o).expand(2,CSG.defaultResolution2D);

var cage = CAG.circle({
            center: [0,0],
            radius: 3*Math.sin(coef*1.2),
            resolution: 32
       }).expand(2, CSG.defaultResolution2D);

    var cags = CAG.fromPoints([
			[-radius, -radius, h],
			[radius, -radius, h],
	 		[radius , radius, h],
			[-radius, radius, h]
		]).expand(2, CSG.defaultResolution2D);

		return CSG.Polygon.createFromPoints(
			cag.getOutlinePaths()[0].points
		).translate([0, 0, h]);
	}
  });
   return thing;
}
