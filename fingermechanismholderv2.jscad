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

function main(params) {
	util.init(CSG);
	return mholder(10);
}

function mholder(alto) { //limpiar

	var o = new Array(); //shape of the palm
	var g = new Array(); //object 3D
	var d = new Array(); //object 3D
	var x = new Array();
	var k = new Array();
	var b = new Array();
	var last=1;
	var long=0;
	var th=2;
	for (var i = 1; i >= 0; i--) {
		x.push(square({size: [alto*4,alto*4]}).center('x'));
		o.push(circle({r:alto-(i*th), center:true}).translate([alto,0,0]));
		o.push(circle({r:alto-(i*th), center:true}).translate([-alto,0,0]));
		g.push(linear_extrude({ height: 9 }, hull(o)));
		d.push(linear_extrude({ height: 11 }, hull(x)));
		b.push(union(g).subtract(union(d)));
		///cuerpo sin parteabajoish
		k.push(square({size: [alto*4-(2*i*th),10], center: true}).translate([0, 5, 0]));

		b.push(linear_extrude({ height: 9 }, hull(k)));

	}
	var i = union(b[0],b[1]).translate([0, 0, 1-3.5]);
	var o = difference(union(b[2],b[3]),i);


	var todo = union(
		Parts.Triangle(6, alto*4-10).translate([0, -1, -1]),
		Parts.Triangle(6, alto*4-10).translate([5, -1, -1]),
		cube({size: [6, 7, alto*4-10], center: [true, true, false]}).translate([2.5, -5, -1])
	).translate([(-alto/2)+2, 0, 6]);



	todo= union(
		o,
		todo
		.rotateX(-270)
		.snap(union(b), 'z', 'outside-')
		.translate([0, alto*2, -0.7])
		.rotateZ(90)
		.scale(0.90)
	);
	todo= difference(
		todo,
		cylinder({r: 1, h: alto*2, center: true})
		.rotateX(90)
		.snap(todo, 'z', 'outside-')
		.translate([0, 0, -2.5]),
		cylinder({r: 1, h: 100, center: [true, true, true]})
		.rotateY(90)
		.snap(todo,'z','outside+')
		.translate([0, 0, 4]),
		cylinder({r: 1, h: 100, center: [true, true, true]})
		.rotateY(90)
		.snap(todo,'z','outside+')
		.translate([0, 5, 5]),
		cylinder({r:6, h: 100, center: [true, true, true]})
		.rotateY(90)
		.snap(todo,'z','outside+')
		.snap(todo,'y','outside+')
		.translate([0, 6, 6])

	);


	return  todo
		.fillet(2, 'z-')
		.translate([0, 0, -9])
		.subtract(i.translate([0, 0, -10]))
		;

}
