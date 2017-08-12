// title      : Finger Mechanism Holder
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad
include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');
function getParameterDefinitions() {
  return [
    { name: 'x', type: 'float', initial: 80, caption: "x:" },
    { name: 'y', type: 'float', initial: 30, caption: "y:" },
    { name: 'z', type: 'float', initial: 8, caption: "z:" },
    { name: 'altopata', type: 'float', initial: 20, caption: "altopata" },
    { name: 'colors', type: 'choice', caption: "Colores", values:["red", "blue", "black"], captions:["Rojo", "Azul", "Negro"], initial: "Rojo" },

  ];
}
 var r = [], y = [], t = [];
 var dentado,xbottom,cono, ext, int, flat;
 var pi = 180;

function main (){
  util.init(CSG);
  var ptornillo=tornillo(15,8,0,0);

  var newTornillo=ptornillo.dentado;
  var newTuerca = ptornillo.tuerca;

  newAtomicLabCover = AtomicLabCover(40);

  return newAtomicLabCover;

}

/**
* Toma:
* -----> Alto del tornillo zscrew
* -----> Ancho del tornillo sizescrew
* -----> Alto de la rosca znut
* -----> Ancho de la rosca sizenut
*
* prototipo:
* -----> tornillo(zscre,sizescrew,znut,sizenut))
*
* Devuelve:
* -----> Tornillo y tuerca
*  var ptornillo=tornillo();
*  var newTornillo= ptornillo.dentado;
*  var newTuerca = ptornillo.tuerca;
*
*/

function tornillo(zscrew,sizescrew,znut,sizenut) {

  var cuerpoint = sizescrew;
  var alto = (round(zscrew/10)*10);
  var cuerpo= cylinder({r: cuerpoint, h: alto, center: [true, true, false]});
  var vueltas = round(alto/10);
  var vangl = 360 * vueltas;
  var cuerpotuerca = cuerpoint+5;
  var rosca= circle(4).translate([cuerpoint/2,0,0]).extrude({offset: [0,0,alto], twistangle: vangl/2, twiststeps: 100});

dentado= difference(cuerpo,rosca);

tuerca=
          union(
              rosca,
                  difference(
                        cylinder({r: cuerpotuerca, h: alto, center: [true, true, false]}),
                        cylinder({r: cuerpoint, h: alto, center: [true, true, false]})
                    )
          )
  return {
    dentado:dentado.scale(.95,.95,.95),
    tuerca:tuerca
  }
};


/**
* Toma:
* -----> Base de tapa
* -----> Alto de tapa
* -----> Alto de la rosca znut
* -----> Ancho de la rosca sizenut
*
* prototipo:
* -----> tornillo(zscre,sizescrew,znut,sizenut))
*
* Devuelve:
* -----> Tornillo y tuerca
*  var ptornillo=tornillo();
*  var newTornillo= ptornillo.dentado;
*  var newTuerca = ptornillo.tuerca;
*
*/

function AtomicLabCover(base) {

  var alto=base/2
  var ptornillo=tornillo(5,alto/6,0,0);
  var newTornillo=ptornillo.dentado;

  var h = hull( square({size: [base,1], center: true}),circle({r: base/3, center: true}).translate([0,alto,0]) );

  var tapa =
difference(
  union(
      linear_extrude({ height: 3 }, h) .fillet(0.5, 'z+'),
      newTornillo.rotateX(180).translate([0, 4, 0])
    )
  );
  return tapa.rotateX(90);

}
