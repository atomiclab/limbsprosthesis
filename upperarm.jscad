// title      : assembly
// author     : Gino Tubaro
// license    : MIT License
// description: General assembly document
//            Listed files are: conectores.jscad
//      Parts:
//                    UpperArm - Thumb short conector
//                    UpperArm - Palm connectorx2
//                    UpperArm - Finger Conector
//      Params:
//            conector(x,y,dual,baseh);
//            x: largo longitudinal, y: ancho radial, dual Boolean (doble o simple)
//            baseh: largo longitudinal de base //WARNING: sumar x+baseh
// file       : conectores.jscad
//!OpenSCAD

// To Implement:
//INCHS - MM -> util.INCH(x)

//function UpperArm(xtop,x,ypalm,zpalm) {


include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');

function main(params) {
  util.init(CSG);
  var thing = thingTwisted(10, 30);
  return thing;



function cuerpoconectores() {
var op = difference(
  cube({size: [((Math.sin(4.8)+8)*4)+14, (Math.sin(4.8)+7), (Math.sin(4.8)+7)], center: [true, true, true]}),
  cylinder({r: 1.5, h: 100, center: [true, true, true]}).rotateY(90), // cylinder para los tornillos
  cube({size: [((Math.sin(4.8)+8)*4)+7.6, (Math.sin(4.8)+7), (Math.sin(4.8)+7)], center: [true, true, true]})

);

return op;


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

      var r = Math.sin(coef*4.8)+8;
        o.push(circle({r:r, center:true}).translate([10,0,0]));
        o.push(circle({r:r, center:true}).translate([-10,0,0]));
        o.push(square({size: [((Math.sin(coef*4.8)+8)*4)+10,(Math.sin(coef*4.8)+8)], center: true}).translate([0, (Math.sin(coef*4.8)+8)*0.5, 0]));

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
var op=
difference(
  union(thing,

  cuerpoconectores().snap(thing, 'z', 'outside+').translate([0, 3, 0])),

  thing.scale([0.85,0.8,1.3]).translate([0, 0, -1]),
  cube({size: [50, 100, 70], center: [true, false, true]}).translate([0, 6, 0]), //corta a la mitad
  cylinder({r: 14, h: 50, center: [true, true, true]}).rotateX(90).translate([0, 0, 10]), //cylinder que contornea la parte superior
  //cube({size: [24, 24, 22], center: [true, true, true]}), //cubo conectando a la parte superior
  //cylinder({r: 2, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 2, 4]), // cylinder para los tornillos
  cylinder({r: 12, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -12,0]), // contornosuperior
  cylinder({r: 14, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 8,height]) // contornosuperior

);

     return op.fillet(1.5,'z+');
  }



}
