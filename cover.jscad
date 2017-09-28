// title      : AtomicLabCover
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad
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


//include('lodash.js');

//include("node_modules/jscad-utils/jscad-utils.jscad");
//include("node_modules/jscad-utils/jscad-utils-color.jscad");

//include('node_modules/jscad-utils/jscad-utils-parts.jscad');
//include('node_modules/jscad-utils/jscad-boxes.jscad');

//include('conectores.jscad');
//include('tornillotuerca.jscad');
//function main() {
//  util.init(CSG);
//return AtomicLabCover(30,2); // AtomicLabCover(60);
//}
function AtomicLabCover(base,alto) {

  var alto=base/2

  var l = vector_text(0,0,"ATOMIC LAB");
  var o = [];
  l.forEach(function(pl) {
   o.push(rectangular_extrude(pl, {w: 3, h: 5}).scale([base/200,base/200,base/100]));
});

  var h = hull( square({size: [base,1], center: true}),circle({r: base/3, center: true}).translate([0,alto,0]) );
  var temp;
  var tapa =

  union(
      temp=linear_extrude({ height: 1 }, h) .fillet(0.5, 'z+'),
      tornillotuerca(base/3,2.5)[1].snap(temp,'z','outside+').translate([0, 3, 0])
);
tapa= difference(tapa,
     union(o).snap(tapa,'z','outside-').translate([-base/2+base/25, base/80, -0.5])
  );
  return tapa.rotateX(90);

}
