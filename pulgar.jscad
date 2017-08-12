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
 var result,xbo
function main()
{
return plano();

}
 function plano(){
     var result=
        difference(
                  union(

                        linear_extrude({height: 2},

                                        hull(
                                                circle({r: 8, center: true}).translate([-15,10,0]),
                                                circle({r: 8, center: true}).translate([-7,9,0]),
                                                square({size: [10,10], center: true})
                                                )
                                        )
                ),

                cylinder({r:3, h:5, center: true}).translate([-15,10,0]),
                cylinder({r:2, h:5, center: true}).translate([-5,12,0]));



                return result;
        }

        function body() {
          var cyl = Parts.Cylinder(20, 20)
          var cbox = Boxes.Hollow(cyl, 2/*,
            function (box) {
                    return box
                      .fillet(2, 'z+')
                      .fillet(2, 'z-');
            }*/
          );

//  var box = Boxes.Rabett(cbox, 3, 0.5, 11, 5)

  return cbox;

        }

function pulgar() {
         var o = plano();

        return o;

}




   //
