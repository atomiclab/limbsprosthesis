function main() {
  var alto = 15;
  var ancho = 5;
return  tornillotuerca(alto,ancho);

}

  function tornillotuerca(alto,ancho) {


  	var cag = CAG.fromPoints([
  		[-1, -1, 0],
  		[1, -1, 0],
  		[1, 1, 0]
  	]).expand(1, CSG.defaultResolution2D);

  	var flatBottom = CSG.Polygon.createFromPoints(
  		cag.getOutlinePaths()[0].points
  	);


    var tornillo = flatBottom.solidFromSlices({
  	numslices: alto
  	,callback: function(t,k) {
      k=k+1;
  		var coef = t;
      var o = new Array();
  		if (coef < 0.01) coef = 0.01;//must not collapse polygon
  		var h = alto*t;
      var i = coef+1;
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
     return union(tuerca.scale(1.05),tornillo.translate([3*ancho, 0, 0]));

}
