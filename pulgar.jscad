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
        return pulgar();
      }

function plano(){
     var result=
        difference(
              union(
                  linear_extrude({height: alto/5},
                      hull(
                              circle({r: 14, center: true}).translate([-18,-11,0]), //circ grande
                              circle({r: 8, center: true}).translate([-7,-9,0]), //circ chico
                              square({size: [10,20], center: true}).translate([0, -10, 0]) //cuadrado
                              )
                      )
          ),

                cylinder({r:tornilloconector, h:alto, center: true}).translate([-18,-11,0]),
                cylinder({r:pinconector, h:alto, center: true}).translate([-7,-5,0])); //pinconector
                return result.mirroredY();
    }

function body(params) {

    var part =
       hull(
            square([20,20,alto]),
            circle(10).translate([20,20,0]).scale([1.25,1,1])
           );

          part=linear_extrude({ height: 1 }, part);


          var cbox = Boxes.Hollow(part,7).scale([1,1,alto]);

          return union(cbox).fillet(2,'z-')
          .fillet(2,'z+');
    }

function pulgar() {
    var dedo=body();
    var planox=plano();
    var resultado=
    dedo.union(planox.snap(dedo, 'z', 'center+')
        .rotateX(45)
        .translate([0, 9, -2]));
    return resultado;
}
