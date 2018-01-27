// title      : thumb
// author     : Gino Tubaro
// license    : MIT License
// description: just a thumb
// file       : palma.jscad
//!OpenSCAD
//Hay que parametrizara

include('lodash.js');

include("formulas.jscad");

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');

include("tornillotuerca.jscad");
// TODO:
// Arreglar protuberancia pulgar
// arreglar tapa
// ver que pasa cuando proporcion alto => long*1/4
// posicion tuerca pulgar
// thinkness
// agregar texto "Atomic Lab" y el nombre de usuario
//curvabezier en contornos
var result,xbo;
var long=60;
var alto=10;
var muneca=15;// nada
var pinconector=2;
var tornilloconector=3;
var pulgar =1;
function main()
{
	util.init(CSG);
	var palma = palmagenerator(alto, long, muneca, pulgar);
	//console.log(palma.getfeatures(['volume']));
	return palma;
}


function slider(alto) { //limpiar

	var o = new Array(); //shape of the palm
	var g = new Array(); //object 3D
	var d = new Array(); //object 3D
	var x = new Array();
	var k = new Array();
	var b = new Array();
	var last=1;
	var long=0;
	x.push(square({size: [alto*4,alto*4]}).center('x'));
	o.push(circle({r:alto, center:true}).translate([alto,0,0]));
	o.push(circle({r:alto, center:true}).translate([-alto,0,0]));
	g.push(linear_extrude({ height: 5 }, hull(o)));
	d.push(linear_extrude({ height: 8 }, hull(x)));
	b.push(union(g).subtract(union(d)));
	///cuerpo sin parteabajoish
	k.push(square({size: [alto*4,10], center: true}).translate([0, 5, 0]));

	b.push(linear_extrude({ height: 5 }, hull(k)));


	var todo = union(
		Parts.Triangle(5, alto*5).translate([0, -1, -1]),
		Parts.Triangle(5, alto*5).translate([5, -1, -1]),
		cube({size: [5, 10, alto*5], center: [true, true, false]}).translate([2.5, -6, 0])
	);



	todo= union(b).subtract(todo.rotateX(-90).rotateZ(90).snap(union(b), 'x', 'inside-').translate([-1, -1, 0]));
	todo= todo.subtract(cylinder({r: 1, h: 20, center: true}).rotateX(-90).snap(todo, 'x', 'center-').translate([-1,0, 2]));

	todo=todo.subtract(cube({size: [10, 10, 5], center: [true, true, true]}).snap(todo,'y','outside+').translate([5, 0, 0]) );

	return todo;

}


function bajorelieve(height,prof, alto) { //corregir el cilindro
	var h = hull(
		square({size: [(alto*4)-10,1], center: true}).translate([0, height-height/4,0 ]),
		circle({r: alto, center: true}).translate([0,-height*0.003125,0])
	);
	var tapa = linear_extrude({ height: prof }, h);


	return tapa.rotateX(90);

}

function conectores(alto) {
	var o = new Array();
	o.push(cube({size: [alto*4, 2, alto/2], center: [true, true, true]}).translate([0, 2, alto/2.5]));
	o.push(cube({size: [alto*4, 2, alto/2], center: [true, true, true]}).translate([0, -2, alto/2.5]));
	o.push(cylinder({r: 2.75, h: alto, center: [true, true, true]}).rotateX(90).rotateZ(90).translate([0, 5, alto-5]));


	return union(o);
}
function contornos(alto,ancho) {
	var o = new Array();
	console.log("gino"+ancho);
	o.push(cylinder({r: ancho, h: alto, center: [true, true, true]}).rotateX(90).rotateZ(90).translate([0, -ancho, alto])); //contorno de conectores
	o.push(cylinder({r: ancho+ancho/2, h: alto, center: [true, true, true]}).rotateX(90).translate([0, -ancho, alto-ancho/2])); //contorno de tapa
	return union(o);
}
function cuerpito(h,ancho) {
	var o = new Array();
	var thi=10;
	o.push(circle({r:ancho-thi/2, center:true}).translate([ancho,0,0]));
	o.push(circle({r:ancho-thi/2, center:true}).translate([-ancho,0,0]));
	o.push(square({size: [ancho*4-thi,10], center: true}).translate([0, 5, 0]));
	o.push(square({size:[ancho*4-thi,40], center:true}).translate([0, 20, 0]))


	o = linear_extrude({ height: h }, hull(o));


	return o //o.scale([0.75,0.7,2]);
}


function palmagenerator(ancho, height,muneca,pulgar) {

	var cag = CAG.fromPoints([
		[-1, -1, 0],
		[1, -1, 0],
		[1, 1, 0]
	]).expand(1, CSG.defaultResolution2D);
	var flatBottom = CSG.Polygon.createFromPoints(
		cag.getOutlinePaths()[0].points
	);

	var tope;

	var thing = flatBottom.solidFromSlices({
		numslices: height
		,callback: function(t) {
			var coef = t;

			var o = new Array();
			if (coef < 0.01) coef = 0.01;//must not collapse polygon
			var h = height*t;
			var y = 0;
			var b = alto+Math.sin(coef*4);

			o.push(circle({r:b, center:true}).translate([ancho,0,0]).subtract(square({size: [alto*4,alto*4]}).center('x')));
			o.push(circle({r:b, center:true}).translate([-ancho,0,0]).subtract(square({size: [alto*4,alto*4]}).center('x')));
			if (pulgar) {
				//				if ((h>=height/7)&&(h<=(height*2/3))){
				if (height*2/3>=50) { //pongo valor de altura fijo a la curvatura pulgar
					tope = 50;
				}else {
					tope=height*2/3;
				}

				if ((h>=0.1)&&(h<=(tope))){
					var vals = calculate(0.1,tope,alto+4,0);
					x = (vals[0]*Math.pow(h,2)) + (vals[1]*h) + vals[2];
					o.push(circle({r: x/2, center: true}).translate([alto*2, 8, 0]))
				}
			}

			o.push(square({size: [alto*4,10], center: true}).translate([0, 5, 0]));

			cag =  hull(o); //.expand(1,CSG.defaultResolution2D)

			var cage = CAG.circle({
				center: [0,0],
				ancho: 3*Math.sin(coef*1.2),
				resolution: 32
			}).expand(1, CSG.defaultResolution2D);

			var cags = CAG.fromPoints([
				[-1, -1, h],
				[1, -1, h],
				[1 , 1, h],
				[-1, 1, h]
			]).expand(1, CSG.defaultResolution2D);

			return CSG.Polygon.createFromPoints(
				cag.getOutlinePaths()[0].points
			).translate([0, 0, h]);
		}
	});

	var palma=
	difference(
		union(thing,slider(alto).mirroredZ()).fillet(3,'z+'),
		cuerpito(height,ancho),
		conectores(height),
		contornos(height,ancho)


	);
	function oppulgar() {
		var cubo = new Array();
		var th=3;
		cubo.push(cube({size: [th, 10, long/2-4], center: [true, false, false]})
		.snap(palma,'y','outside-')
		.translate([(alto*2)-th, -alto+th, 4])
	);

	return union(cubo);
}


//  palma= palma.snap(bajorelieve(height), 'x', 'center-');
todo= bajorelieve(height,8,alto)
.snap(palma, 'y', 'outside+')
.translate([0, 3, height/3]);



todo=difference(palma,todo,oppulgar());
var todosin=todo;
todo=
union(
	difference(
		todo,
		cylinder({r: 3, h: alto*4, center: [true, true, true]}) //cilindrotapa
		.rotateX(90)
		.translate([0, 0, (height/2.5)+5]),
		cylinder({r: 3, h: muneca/2, center: [true, true, true]}) //cilindropulgar
		.rotateY(90)
		.snap(palma,'y','outside-')
		.snap(palma,'x','outside-')
		.translate([-6.25, -alto, tope*0.5])

	),
	tornillotuerca(4,2.5)[0]//tuerca de tapa
	.rotateX(90)
	.snap(todo,'y','outside+')
	.translate([0, 4, (height/2.5)+5]),

	tornillotuerca(6,1.75)[0] //tuerca de pulgar
	.rotateY(90)
	.snap(palma,'y','outside-')
	.snap(palma,'x','outside-')
	.translate([-6.25, -alto, tope*0.5])
)
todo =
difference(
	todo,
	difference(cylinder({r:8, h:8, center:[true,true,true]})//tuerca de pulgar
	.rotateY(90)
	.snap(palma,'y','outside-')
	.snap(palma,'x','outside-')
	.translate([-6.25, -alto, tope*0.5]),
	todosin)
);


return todo;//difference(todo,difference(todo,todosin));

}
