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
include('conectores.jscad');
include('formulas.jscad');

function main(params) {
  util.init(CSG);
  var min;
  alto=50;
  ancho=25;
  pulgarpresente=1;
  lado=1;
  var UpperArme = new Array();
  UpperArme=UpperArm(ancho,alto,pulgarpresente,lado);
  var ptomedio=UpperArme[1]-(UpperArme[1]-ancho/2);
  console.log("asd"+UpperArme[1]+" 2"+UpperArme[2]+" 3"+UpperArme[3]+" "+ptomedio+"opuestopulgar"+UpperArme[4]);

  return union(UpperArme[0], cube({size: [1, 1, 1], center: [true, true, true]}).translate([UpperArme[1], UpperArme[2], UpperArme[3]] ) );
}

function UpperArm(anchomuneca,alto,pulgarpresente,lado) {

  var grosor = 3;
  var shelter1, shelter2=0;
  var pconectors = new Array();
  var body =
  difference(
    shelter(anchomuneca/2+grosor+5, alto,pulgarpresente),
    shelter(anchomuneca/2+5,alto,pulgarpresente).translate([0, grosor, 0])
  );

  if (pulgarpresente) {
    var op=
    difference(
      union(
        body,
        cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([anchomuneca/2, 4, 0]),
        cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([-anchomuneca/2-3, 4, 0])
        //conectores de barras
        //conectoreslaterlates(anchomuneca,alto,pulgarpresente)

      ),

      cube({size: [ancho*4, alto*2, (alto/2)-5], center: [true, false, true]}).translate([0, 6, 0]), //corta a la mitad
      cube({size: [ancho*4, alto*2, alto*0.75], center: [true, false, false]}).translate([0, 6, (alto/2)+2.5]), //corta a la mitad

      //cube({size: [24, 24, 22], center: [true, true, true]}), //cubo conectando a la parte superior

      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -17,9]),// contornosuperior
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -15,7]),
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -14,5]),
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -13,0]),
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 7,alto]),
      // contornoinferior
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 5,alto]),
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 3,alto]),
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 1,alto]),
      cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 0,alto]), //---
      velcros(grosor,alto,anchomuneca)

    );
    //op=  op.rotateX(-90);
    op =
    difference(op,
      cylinder({r: 3, h: alto, center: [true,false, true]}).rotateY(90).translate([0, 8, (alto/2)-10]), //cilindro conectores
      difference(
        cube({size: [anchomuneca*2, 24, 30], center: [true, false, true]}).translate([0, 6, (alto/2)-12]),
        cylinder({r: 12, h: alto, center: [false, true, true]}).rotateY(90).translate([0, 7, (alto/2)+1])

      ));
      pconectors[0]=op.getBounds()[1].x; //x conector
      pconectors[1]=11; //y conector
      pconectors[2]=(alto/2)-10; //z conector
      pconectors[3]=-(op.getBounds()[1].x); //x2 conector (opuesto)
      return [op,pconectors[0],pconectors[1],pconectors[2],pconectors[3]];
    }else {
      if (lado) { //dejo el lado IZQUIERDO para conector de dedos

        var op=
        difference(
          union(
            body,
            cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([anchomuneca/2, 4, 0]),
            cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([-anchomuneca/2-3, 4, 0])

          ),

          cube({size: [ancho*4, alto*2, (alto/2)-5], center: [true, false, true]}).translate([0, 6, 0]), //corta a la mitad inferior
          cube({size: [ancho*4, alto*2, alto*0.75], center: [true, false, false]}).translate([0, 6, (alto/2)+2.5]), //corta a la mitad superior
          cube({size: [ancho*2, alto, alto], center: [true, false, false]}).translate([ancho/2, 6, 0]), //corta a la mitad inferior

          //cube({size: [24, 24, 22], center: [true, true, true]}), //cubo conectando a la parte superior

          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -17,9]),// contornosuperior
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -15,7]),
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -14,5]),
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -13,0]),
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 7,alto]),
          // contornoinferior
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 5,alto]),
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 3,alto]),
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 1,alto]),
          cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 0,alto]), //---
          velcros(grosor,alto,anchomuneca)

        );
        //op=  op.rotateX(-90);
        op =
        difference(op,
          cylinder({r: 3, h: alto, center: [true,false, true]}).rotateY(90).translate([0, 8, (alto/2)-10]),
          difference(
            cube({size: [anchomuneca*2, 24, 30], center: [true, false, true]}).translate([0, 6, (alto/2)-12]),
            cylinder({r: 12, h: alto, center: [false, true, true]}).rotateY(90).translate([0, 7, (alto/2)+1])

          ));
          pconectors[0]=-(op.getBounds()[1].x); //x2 conector (opuesto)
          pconectors[1]=11;
          pconectors[2]=(alto/2)-10;
          return [op,pconectors[0],pconectors[1],pconectors[2]];
        }else { //dejo el lado DERECHO para conector de dedos
          var op=
          difference(
            union(
              body,
              cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([anchomuneca/2, 4, 0]),
              cuerpoconectores(anchomuneca,alto).snap(body, 'z', 'outside+').translate([-anchomuneca/2-3, 4, 0])
              //conectores de barras
              //conectoreslaterlates(anchomuneca,alto,pulgarpresente)

            ),

            cube({size: [ancho*4, alto*2, (alto/2)-5], center: [true, false, true]}).translate([0, 6, 0]), //corta a la mitad
            cube({size: [ancho*4, alto*2, alto*0.75], center: [true, false, false]}).translate([0, 6, (alto/2)+2.5]), //corta a la mitad
            cube({size: [ancho*2, alto, alto], center: [true, false, false]}).translate([-ancho/2, 6, 0]), //corta a la mitad inferior

            //cube({size: [24, 24, 22], center: [true, true, true]}), //cubo conectando a la parte superior

            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -17,9]),// contornosuperior
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -15,7]),
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -14,5]),
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -13,0]),
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 7,alto]),
            // contornoinferior
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 5,alto]),
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 3,alto]),
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 1,alto]),
            cylinder({r: 13, h: 100, center: [true, true, true]}).rotateY(90).translate([0, 0,alto]), //---
            velcros(grosor,alto,anchomuneca)

          );
          //op=  op.rotateX(-90);
          op =
          difference(op,
            cylinder({r: 3, h: alto, center: [true,false, true]}).rotateY(90).translate([0, 8, (alto/2)-10]),
            difference(
              cube({size: [anchomuneca*2, 24, 30], center: [true, false, true]}).translate([0, 6, (alto/2)-12]),
              cylinder({r: 12, h: alto, center: [false, true, true]}).rotateY(90).translate([0, 7, (alto/2)+1])

            ));

            pconectors[0]=op.getBounds()[1].x;
            pconectors[1]=11;
            pconectors[2]=(alto/2)-10;
            return [op,pconectors[0],pconectors[1],pconectors[2]];

            //op = figura
            //pconectors[x,y,z]
          }
        }
      }

function cuerpoconectores(anchomuneca,height) {

  var op = difference(
    cube({size: [3,8,7], center: [false, true, true]}),
    cylinder({r: 1.5, h: 100, center: [true, true, true]}).rotateY(90).translate([0, -1, 0]) // cylinder para los tornillos
  );
  return op;
  //.fillet(1,'z-');
}

function velcros(grosor,alto,anchomuneca) {
  var des=2.5;
  velcros= union(
    //velcros ext

    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([(anchomuneca/2)+5, grosor/2, alto/des]),
    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([-(anchomuneca/2)-12, grosor/2, alto/des]),

    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([(anchomuneca/2)+5, -5+grosor/2, alto/des]),
    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([-(anchomuneca/2)-12, -5+grosor/2, alto/des]),


    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([(anchomuneca/2)+5, grosor/2, alto/des+alto/des-9]),
    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([-(anchomuneca/2)-12, grosor/2, alto/des+alto/des-9]),

    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([(anchomuneca/2)+5, -5+grosor/2, alto/des+alto/des-7]),
    cylinder({r: grosor/2, h: 10}).rotateY(90).translate([-(anchomuneca/2)-12, -5+grosor/2, alto/des+alto/des-7]),

    cube({size: [10,grosor,alto/des-9]}).translate([(anchomuneca/2)+5, 0, alto/des]),//izq
    cube({size: [10,grosor,alto/des-9]}).translate([-(anchomuneca/2)-12, 0, alto/des]), //der
    //velcro inter
    cube({size: [10,grosor,alto/des-7]}).translate([(anchomuneca/2)+5, -5, alto/des]), //des = ancho para velcro 2 = espacio
    cube({size: [10,grosor,alto/des-7]}).translate([-(anchomuneca/2)-12, -5, alto/des]) //der
  );
  return velcros;
}



function shelter(anchomuneca, height,pulgarpresente) {

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
  var tope=0;
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
      o.push(square({size: [(r*4)+radius*2,18], center: true}).translate([0, 10 , 0]));

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
  //console.log("a" + valsy[0] +"b"+ valsy[1] + "c"+valsy[2]);
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
      //console.log("a" + valsy[0] +"b"+ valsy[1] + "c"+valsy[2]);

      var coef = t;
      if (coef < 0.01) coef = 0.01;//los poligonos no deben colapsar
      var h = x1+t*5;
      var o = new Array();


      o.push(square({size: [1, 10, 1]}).translate([t, 0, 0]));

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
