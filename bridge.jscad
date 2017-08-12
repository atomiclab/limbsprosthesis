// title      : X1
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad

function getParameterDefinitions() {
  return [
    { name: 'x', type: 'float', initial: 80, caption: "x:" },
    { name: 'y', type: 'float', initial: 30, caption: "y:" },
    { name: 'z', type: 'float', initial: 8, caption: "z:" },
    ];
}
 var r = [], y = [], t = [];
 var result,xbottom,cono, ext, int, pata;

function main(params) {

      //  puente=torus({ro:2,ri:0.5,roti:45}).translate([1,0,0]).scale([1,1,3]).subtract(cube({size: [10,20,30], center: [false,true,true]}));
puente=
          union(
                                difference(
                                                sphere({r: 10, h: 10,fn:20}).scale([2,3,1]),
                                                sphere({r: 8, center: [true, true, true]}).scale([2.3,3,1]),
                                                cylinder({r: 25, h: 10, center: [true, true, false]}).scale([1,2,1]).translate([30,0,0]),
                                                cylinder({r: 25, h: 10, center: [true, true, false]}).scale([1,2,1]).translate([-30,0,0]),
                                                cube({size: ([30,300,10]), center: [false,true,false]}).mirroredZ(),
                                                cube({size: ([30,300,10]), center: [false,true,false]}).mirroredZ().mirroredX(),
                                                cube({size: ([30,49,8]), center: true, round: true,fn:10})
                                          ),

                                                CSG.roundedCylinder({               // and its rounded version
                                                  start: [7, -25, 1],
                                                  end: [7, -22, 1],
                                                  radius: 1,
                                                  resolution: 8
                                                }),

                                                CSG.roundedCylinder({               // and its rounded version
                                                  start: [7, -25, 1],
                                                  end: [7, -22, 1],
                                                  radius: 1,
                                                  resolution: 8
                                                }).mirroredX(),
                                                  CSG.roundedCylinder({               // and its rounded version
                                                  start: [7, -25, 1],
                                                  end: [7, -22, 1],
                                                  radius: 1,
                                                  resolution: 8
                                                }).mirroredY(),
                                                CSG.roundedCylinder({               // and its rounded version
                                                  start: [7, -25, 1],
                                                  end: [7, -22, 1],
                                                  radius: 1,
                                                  resolution: 8
                                                }).mirroredY().mirroredX()

                 );


xbottom=puente;
return xbottom;


}
