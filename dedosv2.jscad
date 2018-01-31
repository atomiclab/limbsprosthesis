// title      : dedos
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad

//Hay que corregir los agujeros en el agulo

include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');




function CuatroDedos(largodedos,alto,anchodedo){ //Cuatro dedos
  var w = new Array();
  var separaciondedos = alto/4;
  for (var i =0; i<=3; i+=1) {
    l = largodedos+abs((sin(i*50))); //curva dedos
    w.push(translate([ 0, 0, i*separaciondedos], dedo(l,anchodedo))); //uno arriba del otro separado
    if (i <=2){ // cubos en el medio
      w.push(cube({size:[separaciondedos,5,separaciondedos], center:[true,true,false], round:true}).translate([5,0,(i*separaciondedos+3)]).rotateZ(25));
    }
  }


  return w;
}

function dedo(largo,ancho){ //Un dedo con largo variable

  var o = [];
  var oin=[];
  var y=0;
  var x;
  for(var i=0; i<4; i++) {
    x = i*1.5*(largo);
    y = floor(i*i*2);
    o.push(circle({center: true}).scale(6-i/1.5).translate([x,y,0]));
    if (i>=2) { //guardo ultimos los cilindro para sacarlos
      oin.push(circle({center: true}).scale(5-i/1).translate([x,y,0]));
    }
  }

  var fwhole=difference(
    linear_extrude({height: ancho}, chain_hull(o)) //anchodedos
    .fillet(2,'z+')
    .fillet(2,'z-'),
    linear_extrude({height:ancho*2}, chain_hull(oin)))//anchocorteinternodedos
    return [fwhole];
  }


function fingers(largo,alto,r,anchodedos) {
    var th=2;
    var result =
    difference(
      union(CuatroDedos(largo,alto,anchodedos)),
      union(
        cylinder({d: 30, h: anchodedos/4}), // cilindro bajo
        cylinder({d: 20, h: alto-anchodedos-anchodedos}).translate([3,0,anchodedos*0.75]), //cilindro pasador
        cylinder({d: 30, h: anchodedos}).translate([0,0,alto-anchodedos]), //cilindro superior
        cylinder({d: 45, h: alto, fn:32}).translate([-13,0,0])
      ).translate([-11,0,0]), //desfasaje
      cylinder({d:3, h:alto}).translate([1,-2,0]),
      cylinder({d:3, h:alto}).translate([1,3,0])
      //  cube({size: [params.largodedos*2.5,5,45],round:true}).rotateZ(43-params.largodedos).translate([3.4*(params.largodedos),1.2*(log(params.largodedos*2)*2),-5])
      );

      if (r==1) {
        return  result; //Dedos Der
      }else {
        var piso= cube({size: [1, 1, 1], center: [true, true, false]})
        return  result
        .mirroredZ()
        .snap(piso,'z-','inside-'); //dedos IZQ
      }

    }

    function main() {

      var largo=6;
      var alto=40;
      var r=1; //Der = 1, Izq = 0;
      var anchodedos=6;
      util.init(CSG);
      //return fingers(largo,alto,r);
    return  fingers(6,alto,r,anchodedos);




    }




    //
