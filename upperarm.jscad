// title      : assembly
// author     : Gino Tubaro
// license    : MIT License
// description: General assembly document
//            Listed files are: conectores.jscad
//      Parts:
//                    UpperArm - Thumb short conector
//                    UpperArm - Palm connectorx2
//                    UpperArm - Finger Conector
//      Params:
//            conector(x,y,dual,baseh);
//            x: largo longitudinal, y: ancho radial, dual Boolean (doble o simple)
//            baseh: largo longitudinal de base //WARNING: sumar x+baseh
// file       : conectores.jscad
//!OpenSCAD

// To Implement:
//INCHS - MM -> util.INCH(x)

//function UpperArm(xtop,x,ypalm,zpalm) {


include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');

function main(params) {
  util.init(CSG);


  var curvedpath = [];
  var yua = 70; //largo
  var xbottomua=40; // bajo DIAMETRO
  var zua=3;  //Alto
  var x = 30;  //Superior
  var j = 0;
  var g = 0;
  var csg = new Array();
  var y;
  var dif=(xbottomua-x)/2;


for (var i = 0; i < yua; i++) {
  curvedpath[i]=
                CSG.Path2D.arc({
                  center: [0,0,0],
                  radius: (xbottomua/2)-((i*dif)/yua),
                  startangle: 0,
                  endangle: 180,
                  resolution: 16,
              })
        y=i;
        csg.push(curvedpath[i].rectangularExtrude(2, 2, 16, true).translate([0, 0, i]));
}

curvedpath[y]=
                CSG.Path2D.arc({
                  center: [0,0,0],
                  radius: (xbottomua/2)-((y*dif)/yua),
                  startangle: 0,
                  endangle: 180,
                  resolution: 16,
                })

                csg.push(curvedpath[y].rectangularExtrude(2,10, 16, true).translate([0, 0, y+2])); //OJO CON OFFSET de 10

var chanfleo = CSG.Path2D.arc({
                center: [0,0,0],
                radius: 6,
                startangle: 90,
                endangle: 270,
                resolution: 16,
              })


var csgout = chanfleo.rectangularExtrude(3, xbottomua*xbottomua, 16, true).rotateY(90).translate([-xbottomua, 3.5, yua+6]);   // w, h, resolution, roundEnds

var esqueleto =
                difference(
                  union(csg),

                  // IDEA: cuadrados para conectores
                  cube({size: [xbottomua*2, -x/2, ((yua/2)+2)], center: [true, false, false]}).translate([0, 22, (yua/2)+10]), //xbottomua/2+5
                  cylinder({r: x/2, h: xbottomua*2, center: [true, true, true]}).rotateY(90).translate([0, 22, (yua/2)+10]),
                  csgout, // superior
                  cylinder({r: 2, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 3, yua+6]),


                  cube({size: [xbottomua+10,1,yua/6], center: [true, true, true]}).fillet(0.5,'z+').fillet(0.5,'z-').translate([0, 2, yua/1.5]),
                  cube({size: [xbottomua+10,1,yua/6], center: [true, true, true]}).fillet(0.5,'z+').fillet(0.5,'z-').translate([0, 4, yua/1.5]),

                  cube({size: [xbottomua+10,1,yua/6], center: [true, true, true]}).fillet(0.5,'z+').fillet(0.5,'z-').translate([0, 2, yua/2.5]),
                  cube({size: [xbottomua+10,1,yua/6], center: [true, true, true]}).fillet(0.5,'z+').fillet(0.5,'z-').translate([0, 4, yua/2.5]),


                  cylinder({r: 8, h: xbottomua+10, center: [true, true, true]}).rotateY(90).scale([1,1.5,1.5]).translate([0, -1, -2])
                ).fillet(1.5,'z-');

                var diagonal = sqrt((dif*dif) + (yua*yua));
                var Ang = acos(((diagonal*diagonal)+(dif*dif)-(yua*yua))/(2*diagonal*dif));

                var cubo=cube({size: [10, 2, 10], center: [false, false, false]}).rotateZ(Ang).translate([xbottomua/2-dif/2, -yua+yua/4, -10]).fillet(1,'z-');
                var mirrorcubo=cubo.mirroredX();


<!--Angulo del los conectores
// diagonal = sqrt((dif*dif) + (yua*yua));
//Ang = acos(((diagonal*diagonal)+(dif*dif)-(yua*yua))/2*diagonal*dif);
-->

return [union(esqueleto.rotateX(90).fillet(1,'z+'), cubo,mirrorcubo)];//.rotateX(90)



}
