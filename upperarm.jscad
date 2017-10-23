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
include('conectores.jscad')

function main(params) {
  util.init(CSG);
  var min;
  alto=50;
return              redondeo(-4,alto/2,0,0,alto,0).translate([0, 0, alto-13]);
  return UpperArm(40,50)

}

function UpperArm(anchomuneca,alto) {

    var grosor = 3;
    var shelter1 = 0;
    var shelter2 = 0;

    var body =
            difference(
                shelter(anchomuneca/2+grosor+5, alto),
                shelter(anchomuneca/2+5,alto).translate([0, grosor, 0])
              );

    var op=
            difference(
                union(
                    body,
                    cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([anchomuneca/2, 4, 0]),
                    cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([-anchomuneca/2-3, 4, 0])



                    ),

              cube({size: [80, 100, alto*2], center: [true, false, true]}).translate([0, 6, 0]), //corta a la mitad

              //cube({size: [24, 24, 22], center: [true, true, true]}), //cubo conectando a la parte superior

             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -17,9]),
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -15,7]),
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -14,5]),
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -13,0]), // contornosuperior
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 7,alto]), // contornosuperior
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 5,alto]),
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 3,alto]),
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 1,alto]),
             cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 0,alto])

    );

  /*  op= union(
            op,
            difference(
            conectoreslaterlates(anchomuneca/2+grosor+5,alto).snap(body,'y','outside-').translate([0, -6, 0]),

            conectoreslaterlates(anchomuneca/2+5,alto).snap(body,'y','outside-').translate([0, -6, 0]),
            cylinder({r: 4, h: 10, center:false}).rotateY(90).snap(body,'y','outside-').snap(body,'x','inside+').translate([0, -2, alto/2])

          ),

difference(
            sphere({r: 5, center: [true, true, true]}).snap(body,'y','outside-').snap(body,'x','inside+').translate([1, -4, alto/2]),
            pinhole(5,2,5,2,0).rotateY(90).snap(body,'y','outside-').snap(body,'x','inside+').translate([0, -2, alto/2])
)
          )*/
            return op;
          }

function cuerpoconectores(anchomuneca,height) {

      var op = difference(
        cube({size: [3,8,7], center: [false, true, true]}),
        cylinder({r: 1.5, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -1, 0]) // cylinder para los tornillos
      );
      return op;
      //.fillet(1,'z-');
}

function conectoreslaterlates(anchomuneca,height) {

  var cag = CAG.fromPoints([
    [-1, -1, 0],
    [1, -1, 0],
    [1, 1, 0]
  ]).expand(1, CSG.defaultResolution2D);

  var flatBottom = CSG.Polygon.createFromPoints(
    cag.getOutlinePaths()[0].points
  );
  radius=7;
  ancho=anchomuneca;
  anchoprocesado=ancho-radius*2;
  var t = height/3; //pos inicial

  var thing = flatBottom.solidFromSlices({
  numslices: 15 //tamano de objeto
  ,callback: function() {

    if (coef < 0.01) coef = 0.01;//must not collapse polygon

    var valsx = calculate(0,height*1.5,5,1);
    var x =  (valsx[0]*Math.pow(t,2)) + (valsx[1]*t) + valsx[2];
    var coef = t;
    if (coef < 0.01) coef = 0.01;//los poligonos no deben colapsar
    var h = height+t*5;
    var o = new Array();
    var r = x + anchoprocesado/2;

  o.push(square({size: [(r*4)+radius*2,12], center: true}).translate([0, radius*0.5 , 0]));

    cag =  hull(o); //.expand(1,CSG.defaultResolution2D)

  var all = CSG.Polygon.createFromPoints(
    cag.getOutlinePaths()[0].points
  ).translate([0, 0, t]);

     t=t+1;
        return all;
      }
      });

   return thing;



}




  function shelter(anchomuneca, height) {

  	var cag = CAG.fromPoints([
  		[-1, -1, 0],
  		[1, -1, 0],
  		[1, 1, 0]
  	]).expand(1, CSG.defaultResolution2D);

  	var flatBottom = CSG.Polygon.createFromPoints(
  		cag.getOutlinePaths()[0].points
  	);
    radius=7;
    ancho=anchomuneca;
    anchoprocesado=ancho-radius*2;
    var t = 0;

    var thing = flatBottom.solidFromSlices({
  	numslices: height
  	,callback: function() {

  		if (coef < 0.01) coef = 0.01;//must not collapse polygon

      var valsx = calculate(0,height*1.5,5,1);
      var x =  (valsx[0]*Math.pow(t,2)) + (valsx[1]*t) + valsx[2];
      var coef = t;
  		if (coef < 0.01) coef = 0.01;//los poligonos no deben colapsar
      var h = height+t*5;
      var o = new Array();
      var r = x + anchoprocesado/2;

      o.push(circle({r:radius+r, center:true}).translate([r,0,0]));
      o.push(circle({r:radius+r, center:true}).translate([-r,0,0]));
      o.push(square({size: [(r*4)+radius*2,r], center: true}).translate([0, radius*0.5 , 0]));

      cag =  hull(o); //.expand(1,CSG.defaultResolution2D)

    var all = CSG.Polygon.createFromPoints(
      cag.getOutlinePaths()[0].points
    ).translate([0, 0, t]);

       t=t+1;
      		return all;
      	}
        });

     return thing;

     //.fillet(1.5,'z+');
  }



  function redondeo2(x0,y0,x1,y1,x2,y2) {

      var a = [];
      var valsy = calculate2(x0,y0,(x0+x1/2),(y0+((y0-y1)/2)),x2,y2);
      console.log("a" + valsy[0] +"b"+ valsy[1] + "c"+valsy[2]);
      for (var t = 0; t < x2; t++) {
        var y =  (valsy[0]*Math.pow(t,2)) + (valsy[1]*t) + valsy[2];

        a.push(square({size: [1, 1, 1]}).translate([0, t, t]));
      }

      return linear_extrude({ height: 1 }, chain_hull(a));
      // (-10,10,alto/3-13,alto-13);
  }



  function redondeo(x0,y0,x1,y1,x2,y2) {
    var cag = CAG.fromPoints([
      [-1, -1, 0],
      [1, -1, 0],
      [1, 1, 0]
    ]).expand(1, CSG.defaultResolution2D);

    var flatBottom = CSG.Polygon.createFromPoints(
      cag.getOutlinePaths()[0].points
    );

    var t = 0;

    var thing = flatBottom.solidFromSlices({
    numslices: x2
    ,callback: function() {

      if (coef < 0.01) coef = 0.01;//must not collapse polygon
      var valsy = calculate2(x0,y0,(x0+x1/2),(y0+((y0-y1)/2)),x2,y2);

      var y =  (valsy[0]*Math.pow(t,2)) + (valsy[1]*t) + valsy[2];
      console.log("a" + valsy[0] +"b"+ valsy[1] + "c"+valsy[2]);

      var coef = t;
      if (coef < 0.01) coef = 0.01;//los poligonos no deben colapsar
      var h = x1+t*5;
      var o = new Array();


      o.push(square({size: [1, 10, 14]}).translate([t, 0, 0]));

      cag =  hull(o); //.expand(1,CSG.defaultResolution2D)

    var all = CSG.Polygon.createFromPoints(
      cag.getOutlinePaths()[0].points
    ).translate([0, 0, y]);

       t=t+1;
          return all;
        }
        });

     return thing;

  }



function calculate(x1,x2,y,yaux)
{
    sgnb=" +"; sgnc=" +";
    a = x1; //x1
    a=a*a;
    b = x1; //x1
    c = 1;
    d = yaux; //y1

    e = ((x1+x2)/2);//x2
    e=e*e;
    f = ((x1+x2)/2); //x2
    g = 1;
    h = y; //y2

    i = x2; //x3
    i=i*i;
    j = x2; //x3
    k = 1;
    l = yaux; //y3

<!--Diferenciales -->
delta = (a*f*k)+(b*g*i)+(c*e*j)-(c*f*i)-(a*g*j)-(b*e*k);
//document.output.x.value = delta;

<!--Valor de A-->
xnum = eval((d*f*k)+(b*g*l)+(c*h*j)-(c*f*l)-(d*g*j)-(b*h*k));
xans =eval(xnum/delta);

<!--Valor de B -->
ynum = eval((a*h*k)+(d*g*i)+(c*e*l)-(c*h*i)-(a*g*l)-(d*e*k));
yans =eval(ynum/delta);

<!--Valor de C-->
znum = eval((a*f*l)+(b*h*i)+(d*e*j)-(d*f*i)-(a*h*j)-(b*e*l));
zans =eval(znum/delta);
if (yans<0) {sgnb=" "};
if (zans<0) {sgnc=" "};
xans = xans;
yans = sgnb + yans;

return [xans,yans,zans];
}

function calculate2(x0,y0,x1,y1,x2,y2)
{
    sgnb=" +"; sgnc=" +";
    a = x0; //x1
    a=a*a;
    b = x0; //x1
    c = 1;
    d = y0; //y1

    e = x1;//x2
    e=e*e;
    f = x2; //x2
    g = 1;
    h = y1; //y2

    i = x2; //x3
    i=i*i;
    j = x2; //x3
    k = 1;
    l = y2; //y3

<!--Diferenciales -->
delta = (a*f*k)+(b*g*i)+(c*e*j)-(c*f*i)-(a*g*j)-(b*e*k);
//document.output.x.value = delta;

<!--Valor de A-->
xnum = eval((d*f*k)+(b*g*l)+(c*h*j)-(c*f*l)-(d*g*j)-(b*h*k));
xans =eval(xnum/delta);

<!--Valor de B -->
ynum = eval((a*h*k)+(d*g*i)+(c*e*l)-(c*h*i)-(a*g*l)-(d*e*k));
yans =eval(ynum/delta);

<!--Valor de C-->
znum = eval((a*f*l)+(b*h*i)+(d*e*j)-(d*f*i)-(a*h*j)-(b*e*l));
zans =eval(znum/delta);
if (yans<0) {sgnb=" "};
if (zans<0) {sgnc=" "};
xans = xans;
yans = sgnb + yans;

return [xans,yans,zans];
}
