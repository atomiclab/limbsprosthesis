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
 var result,xbottom,cono, ext, int, pata, l;


function CuatroDedos(largodedos){ //Cuatro dedos
var w = [];
   for (var i =0; i<=3; i+=1) {
          l = largodedos+abs((sin(i*50))); //curva dedos
          w.push(translate([ 0, 0, i*10], dedo(l))); //uno arriba del otro separado
          if (i <=2){ // cubos en el medio
            w.push(cube({size:[10,5,8], center:[true,true,false], round:true}).translate([5,0,(i*10+3)]).rotateZ(25));
          }else{}
    }


    return w;
}

function dedo(largo){ //Un dedo con largo variable

 var o = [];
   for(var i=0; i<4; i++) {
      var x = i*1.7*(largo);
      var y = i*(log(largo*i+2)*2);
      o.push(circle({center: true}).scale(6-i/1.5).translate([x,y,0]));
   }
   return [linear_extrude({height: 5}, chain_hull(o))
     .fillet(2,'z+')
     .fillet(2,'z-')
   ];
}


function main(params) {
    util.init(CSG);
    var result =
    difference(
            union(
              CuatroDedos(params.largodedos)),
            union(
                cylinder({d: 30, h: 2}), // cilindro bajo
                cylinder({d: 20, h: 25}).translate([3,0,5]), //cilindro pasador
                cylinder({d: 30, h: 20}).translate([0,0,32.5]), //cilindro superior
                cylinder({d: 45, h: 50, fn:32}).translate([-13,0,0])
             ).translate([-11,0,0]), //desfasaje
                cylinder({d:3, h:40}).translate([1,-2,0]),
                cylinder({d:3, h:40}).translate([1,3,0]),
                cube({size: [params.largodedos*2.5,5,45],round:true}).rotateZ(43-params.largodedos).translate([3.4*(params.largodedos),1.2*(log(params.largodedos*2)*2),-5])
    );
   return result;

}




   //
