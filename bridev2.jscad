// title      : X1
// author     : Gino Tubaro
// license    : MIT License
// description: Conector inferior x1 (bottom)
// file       : xbottom.jscad

// Curvatura dada por elipsoide

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
    ];
}
 var r = [], y = [], t = [];
 var result,xbottom,cono, ext, int, pata;

function main() {
    util.init(CSG);
var ancho = 40;
var alt = 7;
var array = conectores(ancho);
  var arco =
        union(
          array[0],
          array[1],
          ext(ancho,alt)
            //int(ancho-3).translate([0, 0, 1.5])
          );
return  arco
      .fillet(0.5,'z-')
      .fillet(0.5,'z+');
}



  function ext(dist,alt) {

  	var cag = CAG.fromPoints([
  		[-1, -1, 0],
  		[1, -1, 0],
  		[1, 1, 0]
  	]).expand(1, CSG.defaultResolution2D);

  	var flatBottom = CSG.Polygon.createFromPoints(
  		cag.getOutlinePaths()[0].points
  	);
   height=dist*2;
   var t = 0;
   var x1 =0;
   var x2 =0;


    var thing = flatBottom.solidFromSlices({
  	numslices: height
  	,callback: function() {

      //dista=2*Math.abs(Math.pow((1-(Math.pow(k,2)/(Math.pow(dist/2,2)))),2));
      //dista=Math.abs(1*Math.sqrt((Math.pow(dist,2)-(Math.pow(k,2)/9))));
      var vals = calculate(0,dist,alt,0);
      //console.log("Val0"+vals[0]+"Val1"+vals[1]+"Val2"+vals[2]);
      var x =  (vals[0]*Math.pow(t,2)) + (vals[1]*t) + vals[2];

      var valsy = calculate(0,dist,2,5);

      var y =  (valsy[0]*Math.pow(t,2)) + (valsy[1]*t) + valsy[2];

      if (x>=0) {
        x1=x;
        console.log("x1 es" + x1);
      }else{
        x2=x;
        console.log("x2 es" + x2);
      }
    //  var x = -0.16*Math.pow(t,2)+dist/2;
    //  var y = 0.16*Math.pow(t,2)-dist/2;



      var coef = t;

  		if (coef < 0.01) coef = 0.01;//los poligonos no deben colapsar

      var h = height+t*5;


      var o = new Array();
    o.push(
    circle({r: y, center: true}).scale([0.5,1,1]).translate([x1,0,0])
  //  circle({r: 1, center: true}).translate([x2,0,0])
         );



  cag =  hull(o); //.expand(1,CSG.defaultResolution2D)

var all = CSG.Polygon.createFromPoints(
  cag.getOutlinePaths()[0].points
).translate([0, 0, t]);

   t=t+0.5;
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

<!--EVALUATING THE DELTA DETERMINANT -->
delta = (a*f*k)+(b*g*i)+(c*e*j)-(c*f*i)-(a*g*j)-(b*e*k);
//document.output.x.value = delta;

<!--EVALUATING THE X NUMERATOR & ANSWER -->
xnum = eval((d*f*k)+(b*g*l)+(c*h*j)-(c*f*l)-(d*g*j)-(b*h*k));
xans =eval(xnum/delta);

<!--EVALUATING THE Y NUMERATOR & ANSWER -->
ynum = eval((a*h*k)+(d*g*i)+(c*e*l)-(c*h*i)-(a*g*l)-(d*e*k));
yans =eval(ynum/delta);

<!--EVALUATING THE Z NUMERATOR & ANSWER -->
znum = eval((a*f*l)+(b*h*i)+(d*e*j)-(d*f*i)-(a*h*j)-(b*e*l));
zans =eval(znum/delta);
if (yans<0) {sgnb=" "};
if (zans<0) {sgnc=" "};
xans = xans;
yans = sgnb + yans;

return [xans,yans,zans];
}


function conectores(alto) {

  var bajo = hull(
      square({size: [4,9.5], center: true}),
      circle(1).translate([-2,5,0]),
      circle(1).translate([-2,-6.5,0])
    );
  bajo= linear_extrude({ height: 1}, bajo).translate([-1.5, 0, alto-1.5]);

  var superior = hull(
      square({size: [4,9.5], center: true}),
      circle(1).translate([-2,5,0]),
      circle(1).translate([-2,-6.5,0])
    );
  superior= linear_extrude({ height: 1}, superior).translate([-1.5, 0, 0]);

    return [bajo,superior];
}
