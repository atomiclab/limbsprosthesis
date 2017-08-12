// title      : slider generator
// author     : Gino Tubaro
// license    : MIT License
// description: the two sliders parametrics
// file       : pulgar.jscad
//!OpenSCAD
//Hay que corregir los agujeros en el agulo

 var r = [], y = [], t = [];
 var result,xbottom,cono, ext, int, pata, l;

 function barra(x,y){
     var result=
        difference(
                  union(

                        linear_extrude({height: 2},

                                      chain_hull(
                                                circle({r: y, center: true}),
                                                circle({r: y-2, center: true}).translate([x,0,0])


                                                )
                                        )
                ),
                cylinder({r:3, h:5, center: true}).translate([0,0,0]),
                cylinder({r:3, h:5, center: true}).translate([-x,0,0]));

             var g=   union(result,result.mirroredX().translate([x*2,0,0]))


                return g;
        }


    




   //
