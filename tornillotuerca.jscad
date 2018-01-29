//function main() {
// var alto = 30;
// var ancho = 5;
//return  tornillotuerca(alto,ancho)[1];
//}
  function tornillotuerca(alto,ancho,mirror) {


  	var cag = CAG.fromPoints([
  		[-1, -1, 0],
  		[1, -1, 0],
  		[1, 1, 0]
  	]).expand(1, CSG.defaultResolution2D);

  	var flatBottom = CSG.Polygon.createFromPoints(
  		cag.getOutlinePaths()[0].points
  	);

//20-4 Relacion Alto con dientes de tuerca variable numslices
//40-8
    var tornillo = flatBottom.solidFromSlices({
  	numslices: alto*3
  	,callback: function(t,k) {
      k=k+1;
  		var coef = t;
      var o = new Array();
  		if (coef < 0.01) coef = 0.01;//must not collapse polygon
  		var h = alto*t;
    //  var i = coef+1;
      var y = Math.sin(k+t);
      var x = Math.cos(k+t);
  o.push(
    circle({r: ancho, center: true}).translate([0,0, 0]),
    circle({r: ancho, center: true}).translate([x,y, 0])
         );



  cag =  hull(o); //.expand(1,CSG.defaultResolution2D)


  		return CSG.Polygon.createFromPoints(
  			cag.getOutlinePaths()[0].points
  		).translate([0, 0, h]);
  	}
    });

var tuerca=
      difference(cylinder({r: ancho+2, h: alto, center: [true, true, false]}),
      tornillo
    )
if (mirror) {
	tuerca=tuerca.mirroredX();
	tornillo=tornillo.mirroredX();
}
     return [tuerca.scale(1.05),tornillo];

}
