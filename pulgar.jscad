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

/*function main()
{
var ancho=20;
var anchoplano=4;
var lado=0;
util.init(CSG);
return pulgar(ancho,lado,anchoplano);
}*/

function plano(ancho,alto,tornilloconector,pinconector,anchoplano){

    var result=
    difference(
        union(
            linear_extrude({height: anchoplano},
                hull(
                    circle({r: 14, center: true}).translate([(-ancho-7),-11,0]), //circ grande
                    circle({r: 8, center: true}).translate([-ancho+3,-9,0]), //circ chico
                    square({size: [10,15], center: true}).translate([0, -10, 0]) //cuadrado
                )
            )
        ),

        cylinder({r:tornilloconector, h:alto, center: true}).translate([(-ancho-7),-11,0]),
        cylinder({r:pinconector, h:alto, center: true}).translate([-ancho+3,-5,0])); //pinconector
        return result.mirroredY();

    }

    function bodyfalange(alto) {

        var part =
        hull(
            square([20,20,alto]),
            circle(11).translate([alto,alto,0]).scale([1.25,1,1])
        );

        part=linear_extrude({ height: 20 }, part);


        var cbox = Boxes.Hollow(part,7);

        return union(cbox).fillet(2,'z-')
        .fillet(2,'z+');
    }

    function pulgar(ancho,lado,anchoplano) {

        var alto=ancho;
        var pinconector=2;
        var tornilloconector=3;

        var falange=bodyfalange(alto);
        var planox=plano(ancho,alto,tornilloconector,pinconector,anchoplano);
        if (lado) {
            var resultado=
            falange.union(planox.snap(falange, 'z', 'center+')
            .rotateX(45)
            .translate([0, 9, -2]))
            .mirroredZ()
            .rotateY(90)
            .rotateZ(135)
            .translate([0, 0, -ancho-7]);
        }else {
            var resultado=
            falange.union(planox.snap(falange, 'z', 'center+')
            .rotateX(45)
            .translate([0, 9, -2]))
            .rotateY(90)
            .rotateZ(225)
            .translate([0, 0, -ancho-7]);
        }

        return resultado;
    }
