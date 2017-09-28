// title      : X1
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad

function x1(x,y,z) {

        xbottom=
difference(
            union(
                    CSG.roundedCube({ // rounded cube
                        center: [0, 0, 0],

                      radius: [y, x, z],
                        roundradius: 2,
                        resolution: 8,
                    }),

                    CSG.roundedCylinder({               // and its rounded version
                      start: [-y, -x, 0],
                      end: [-y, x, 0],
                      radius: z,
                      resolution: 16
                    }),
                    CSG.roundedCylinder({               // and its rounded version
                      start: [y, -x-8, 0],
                      end: [y, x+8, 0],
                      radius: z,
                      resolution: 16
                            })
                )


);
return xbottom.translate([0, 0, z]);


}
