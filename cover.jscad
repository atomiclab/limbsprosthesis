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
