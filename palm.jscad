// title      : Palm
// author     : Gino Tubaro
// license    : MIT License
// description: just a thumb
// file       : palma.jscad

include('lodash.js');

include("formulas.jscad");

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');

include("tornillotuerca.jscad");

function main()
{
	var lado=1; //0 = der 1 = izq
	var pulgarpresente=1;
	var nombre= "Capitan";
	var height=70;
	var ancho=15;
	util.init(CSG);
	var palma = palmagenerator(ancho, height, pulgarpresente,nombre,lado);
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
	g.push(linear_extrude({ height: 6 }, hull(o)));
	d.push(linear_extrude({ height: 8 }, hull(x)));
	b.push(union(g).subtract(union(d)));
	///cuerpo sin parteabajoish
	k.push(square({size: [alto*4,10], center: true}).translate([0, 5, 0]));

	b.push(linear_extrude({ height: 6 }, hull(k)));


	var todo = union(
		Parts.Triangle(6, alto*5).translate([0, -1, -1]),
		Parts.Triangle(6, alto*5).translate([5, -1, -1]),
		cube({size: [6, 10, alto*5], center: [true, true, false]}).translate([2.5, -6, 0])
	).translate([(-alto/2)+3, 0, 0]);



	todo= union(b).subtract(todo.rotateX(-90).rotateZ(90).snap(union(b), 'x', 'inside-').translate([-1, -1, 0]));
	todo= todo.subtract(cylinder({r: 1, h: alto*2, center: true}).rotateX(-90).snap(todo, 'x', 'center-').translate([-1,0, 2]));

	todo=todo.subtract(cube({size: [10, 10, 6], center: [true, true, true]}).snap(todo,'y','outside+').translate([6, 0, 0]) );

	return todo;

}


function bajorelieve(height,prof, alto) { //corregir el cilindro

	var h = hull(
		square({size: [(alto*2)-3,1], center: true}).translate([0,height-alto,0 ]),//alto*4 - thickness
		circle({r: alto/2, center: true}).translate([0,10+alto/2,0])
	);
	h=h.subtract(square({size: [alto*4,alto]}).translate([-alto*2,height-alto,0]));
	var tapa = linear_extrude({ height: prof }, h);

	/*	var h = hull(
	square({size: [(alto*4)-10,1], center: true}).translate([0, height-height/4,0 ]),
	circle({r: alto, center: true}).translate([0,-height*0.003125,0])
);
var tapa = linear_extrude({ height: prof }, h);
*/

return tapa.rotateX(90);

}

function conectores(alto, pulgarpresente) {
	var o = new Array();
	o.push(cube({size: [alto*4, 2, alto/2], center: [true, true, true]}).translate([0, 2, alto/2.5])); // velcro inf
	o.push(cube({size: [alto*4, 2, alto/2], center: [true, true, true]}).translate([0, -2, alto/2.5]));// velcro sup
	o.push(cylinder({r: 2.75, h: alto*4, center: [true, true, true]}).rotateX(90).rotateZ(90).translate([0, 5, alto-5]));

	if (!pulgarpresente){
		o[0]=o[0].scale([1,1,0.75]).rotateX(15);
		o[1]=o[1].scale([1,1,0.75]).rotateX(15);
	}
	return union(o);
}
function contornos(alto,ancho) {
	var o = new Array();
	var porc=1-(((alto/2)-5)/alto);
	o.push(cylinder({r: ancho, h: alto*4, center: [true, true, true]}).rotateX(90).rotateZ(90).translate([0, -ancho, alto])); //contorno de conectores
	o.push(cylinder({r: ancho+ancho/4, h: alto, center: [true, true, true]}).scale([1,porc,1]).rotateX(90).translate([0, -ancho, alto-ancho/2])); //contorno de tapa
	return union(o);
}
function cuerpito(h,ancho) {
	var o = new Array();
	var thi=15;
	o.push(circle({r:ancho-thi/2, center:true}).translate([ancho,0,0]));
	o.push(circle({r:ancho-thi/2, center:true}).translate([-ancho,0,0]));
	o.push(square({size: [ancho*4-thi,10], center: true}).translate([0, 5, 0]));
	o.push(square({size:[ancho*4-thi,40], center:true}).translate([0, 20, 0]))


	o = linear_extrude({ height: h }, hull(o));


	return o //o.scale([0.75,0.7,2]);
}


function palmagenerator(ancho, height,pulgarpresente,nombre,lado) {

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
			var b = ancho+Math.sin(coef*4);

			o.push(circle({r:b, center:true}).translate([ancho,0,0]).subtract(square({size: [ancho*4,ancho*4]}).center('x')));
			o.push(circle({r:b, center:true}).translate([-ancho,0,0]).subtract(square({size: [ancho*4,ancho*4]}).center('x')));

			//				if ((h>=height/7)&&(h<=(height*2/3))){
			if (height*2/3>=50) { //pongo valor de altura fijo a la curvatura pulgar
				tope = 50;
			}else {
				tope=height*2/3;
			}
			if (pulgarpresente) {
				if ((h>=0.1)&&(h<=(tope))){
					var vals = calculate(0.1,tope,ancho+4,0);
					x = (vals[0]*Math.pow(h,2)) + (vals[1]*h) + vals[2];
					o.push(circle({r: x/2, center: true}).translate([ancho*2, 8, 0]))
				}
			}

			o.push(square({size: [ancho*4,10], center: true}).translate([0, 5, 0]));

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
		union(thing,slider(ancho).mirroredZ()).fillet(3,'z+'),
		cuerpito(height,ancho),
		conectores(height,pulgarpresente),
		contornos(height,ancho)


	);
	function oppulgar(pulgarpresente,alto,long) { //operacionpulgar
		var cubo;
		var th=3;
		if (pulgarpresente) {
			cubo = cube({size: [th, ancho, long/2-4], center: [true, false, false]})
			.snap(palma,'y','outside-')
			.translate([(alto*2)-th, -alto+th, 4])
		}else {
			cubo= cylinder({r: long/4, h: alto, center: [true, true, true]})
			.rotateY(90)
			.scale([1,0.5,1])
			.snap(palma,'y','outside-')
			.center('x')
			.translate([(alto*2)-3, -alto/4, tope/2])
		}

		return cubo;
	}


	//  palma= palma.snap(bajorelieve(height), 'x', 'center-');
	todo= bajorelieve(height,8,ancho)
	.snap(palma, 'y', 'outside+')
	.translate([0, 3, 0]);



	todo=difference(palma,todo,oppulgar(pulgarpresente,ancho,height));
	var todosin=todo;
	vals = calculate(0.1,tope,tope/2,0);
	//x = (vals[0]*Math.pow(tope/2,2)) + (vals[1]*tope/2) + vals[2]; //calculo curva ymax
	var s = todo.size();
	if (ancho>=17) {
		x=(s.y/2)-10; //offset
	}else {
		x=(s.y/2)-5; //offset
	}



	if (pulgarpresente) {
		todo=
		union(
			difference(
				todo,
				cylinder({r: 3, h: ancho*4, center: [true, true, true]}) //cilindrotapa
				.rotateX(90)
				.translate([0, 0, (height/2.5)]),
				cylinder({r: 3, h: ancho, center: [true, true, true]}) //cilindropulgar
				.rotateY(90)
				.translate([(ancho*2), x, (tope*0.5)])

			),
			tornillotuerca(4,2.5,lado)[0]//tuerca de tapa
			.rotateX(90)
			.snap(todo,'y','outside+')
			.translate([0, 4, (height/2.5)]),


			tornillotuerca(ancho/2,1.75,lado)[0] //tuerca de pulgar
			.rotateY(90)
			.translate([(ancho*2), x, (tope*0.5)])


		)
	}else {
		todo=
		union(
			difference(
				todo,
				cylinder({r: 3, h: ancho*4, center: [true, true, true]}) //cilindrotapa
				.rotateX(90)
				.translate([0, 0, (height/2.5)])
			),
			tornillotuerca(4,2.5,lado)[0]//tuerca de tapa
			.rotateX(90)
			.snap(todo,'y','outside+')
			.translate([0, 4, (height/2.5)])
		)
	}

	if (pulgarpresente) {
		todo =
		difference(
			todo,
			//.translate([(alto*2)+8, x-5, (tope*0.5)]),
			difference(
				cylinder({r:8, h:ancho*1.5, center:[true,true,true]})//tuerca de pulgar
				.rotateY(90)
				.translate([(ancho*2), x, (tope*0.5)]),
				todosin
			)
		);
		if (lado) { //mirroreo texto
			todo=difference(
				todo,
				util.label("Atomic Lab") //CC
				.rotateX(90)
				.scale([1,4,1])
				.fit([s.x - ancho*2-10, s.y - ancho, s.z-5],true)
				.snap(todo, 'y', 'outside+')
				.translate([0, 2.5, 5])
				.mirroredX(),

				util.label(nombre+","+ancho+","+height) //Nombre + data
				.rotateZ(180)
				.scale([1,1,5])
				.fit([s.x - ancho*2, s.y - ancho, s.z-5],true)
				.center('z')
				.translate([0, -ancho/2, 0])
				.mirroredX(),

				cylinder({r:4.5, h:3, center:[true,true,true]})//bajorelieve de pulgar
				.rotateY(90)
				.snap(palma,'x','outside-')
				.translate([-3, x, (tope*0.5)])

			);
		}else {
			todo=difference(
				todo,
				util.label("Atomic Lab") //CC
				.rotateX(90)
				.scale([1,4,1])
				.fit([s.x - ancho*2-10, s.y - ancho, s.z-5],true)
				.snap(todo, 'y', 'outside+')
				.translate([0, 2.5, 5]),

				util.label(nombre+","+ancho+","+height) //Nombre + data
				.rotateZ(180)
				.scale([1,1,5])
				.fit([s.x - ancho*2, s.y - ancho, s.z-5],true)
				.center('z')
				.translate([0, -ancho/2, 0]),

				cylinder({r:4.5, h:3, center:[true,true,true]})//bajorelieve de pulgar
				.rotateY(90)
				.snap(palma,'x','outside-')
				.translate([-3, x, (tope*0.5)])

			);
		}


	}else {

	if (lado) {
		todo=difference(
			todo,
			util.label("Atomic Lab") //CC
			.rotateX(90)
			.scale([1,4,1])
			.fit([s.x - ancho*2-10, s.y - ancho, s.z-5],true)
			.snap(todo, 'y', 'outside+')
			.translate([0, 2.5, 5])
			.mirroredX(),

			util.label(nombre+","+ancho+","+height) //Nombre + data
			.rotateZ(180)
			.scale([1,1,5])
			.fit([s.x - ancho*2, s.y - ancho, s.z-5],true)
			.center('z')
			.translate([0, -ancho/2, 0])
			.mirroredX()
		);
	}else {
		todo=difference(
			todo,
			util.label("Atomic Lab") //CC
			.rotateX(90)
			.scale([1,4,1])
			.fit([s.x - ancho*2-10, s.y - ancho, s.z-5],true)
			.snap(todo, 'y', 'outside+')
			.translate([0, 2.5, 5]),

			util.label(nombre+","+ancho+","+height) //Nombre + data
			.rotateZ(180)
			.scale([1,1,5])
			//.align(todo, 'xy')
			//.align(todo, 'xy')
			.fit([s.x - ancho*2, s.y - ancho, s.z-5],true)
			.center('z')
			.translate([0, -ancho/2, 0])
		);
	}

	}




	if (lado) {
		todo=todo.mirroredX();
	}

	return todo//difference(todo,difference(todo,todosin));
}
