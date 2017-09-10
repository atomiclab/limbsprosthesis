// title      : thumb
// author     : Gino Tubaro
// license    : MIT License
// description: just a thumb
// file       : palma.jscad
//!OpenSCAD
//Hay que parametrizar

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

function slider() {

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


function bajorelieve(height,prof) {

  var h = hull(
    square({size: [30,1], center: true}).translate([0, height,0 ]),
    circle({r: 15, center: true}).translate([0,height/6,0])
  );
    var tapa = linear_extrude({ height: prof }, h);
    return tapa.rotateX(90);
}

function conectores(alto) {
  var o = new Array();
  o.push(cube({size: [100, 2, alto/3], center: [true, true, true]}).translate([0, 2, alto/3]));
  o.push(cube({size: [100, 2, alto/3], center: [true, true, true]}).translate([0, -2, alto/3]));
  o.push(cylinder({r: 2.75, h: alto, center: [true, true, true]}).rotateX(90).rotateZ(90).translate([0, 5, alto-5]));


  return union(o);
}
function contornos(alto) {
  var o = new Array();
  o.push(cylinder({r: 10, h: alto, center: [true, true, true]}).rotateX(90).rotateZ(90).translate([0, -10, alto]));
  o.push(cylinder({r: 15, h: alto, center: [true, true, true]}).rotateX(90).translate([0, -10, alto-5]));
  return union(o);
}
function cuerpito(h) {
var o = new Array();
  o.push(circle({r:10, center:true}).translate([10,0,0]));
  o.push(circle({r:10, center:true}).translate([-10,0,0]));
  o.push(square({size: [40,10], center: true}).translate([0, 5, 0]));
  o.push(square({size:[40,40], center:true}).translate([0, 20, 0]))
o = linear_extrude({ height: h }, hull(o));

  return o.scale([0.75,0.7,2]);
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
 height=50;

  var thing = flatBottom.solidFromSlices({
	numslices: height
	,callback: function(t) {
		var coef = t;
    var o = new Array();
		if (coef < 0.01) coef = 0.01;//must not collapse polygon
		var h = height*t;
    var y = 0;
    //var e = 1/(Math.sqrt(1+(Math.pow(coef*0.01,3)))); //Hay que hacer una parabola para limitar el comienzo y final dl pulgar
    var b = 10+Math.sin(coef*3);
o.push(circle({r:b, center:true}).translate([10,0,0]));
o.push(circle({r:b, center:true}).translate([-10,0,0]));
if ((h>=height/6)&&(h<=(height*2/3))){
y=(h-height/6)*(h-(height*2/3))*0.6+2;
o.push(circle({r:y/10, center:true}).translate([17,9,0]));
};
o.push(square({size: [40,10], center: true}).translate([0, 5, 0]));



cag =  hull(o); //.expand(1,CSG.defaultResolution2D)

var cage = CAG.circle({
            center: [0,0],
            radius: 3*Math.sin(coef*1.2),
            resolution: 32
       }).expand(1, CSG.defaultResolution2D);

    var cags = CAG.fromPoints([
			[-radius, -radius, h],
			[radius, -radius, h],
	 		[radius , radius, h],
			[-radius, radius, h]
		]).expand(1, CSG.defaultResolution2D);

		return CSG.Polygon.createFromPoints(
			cag.getOutlinePaths()[0].points
		).translate([0, 0, h]);
	}
  });

  var palma=
  difference(
    union(thing,slider().mirroredZ()).fillet(3,'z+'),
    cuerpito(height),
    conectores(height),
    contornos(height)


  );
  function oppulgar() {
    var cubo = new Array();

    cubo.push(cube({size: [3.5, 10, 28], center: [true, false, false]})
          .snap(palma,'y','outside-')
          .translate([18, -8, 0])
        );
    cubo.push(
      cylinder({r: 2, h: 100, center: [true, true, true]})
      .snap(palma,'y','outside-')
      .rotateY(90)
      .translate([0, -7, height/2.5])
    );
    return union(cubo);
  }


//  palma= palma.snap(bajorelieve(height), 'x', 'center-');
    todo= bajorelieve(height,8)
            .snap(palma, 'y', 'outside+')
            .translate([0, 3, height/3]);



todo=difference(palma,todo,oppulgar());
   return todo;

}
