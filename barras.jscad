// title      : Generador de barras laterales
// author     : Gino Tubaro
// license    : MIT License
// description: the two sliders parametrics
// file       : barras.jscad
//Hay que poner los pines
//Toma
//Slider
// X = Pos inicial,  Y = Pos final, Z = Apertura de curva
//Devuelve
//Objeto
//
//



 var r = [], y = [], t = [];
 var result,xbottom,cono, ext, int, pata, l;


function main() {
  return sider(0,10,1); // X = Pos inicial,  Y = Pos final, Z = Apertura de curva
}

function sider(x,y,p) {

    var vals = calculate(0,y,2,0);
var g = new Array();
for (var i = 0; i < (y-x+1); i++) {

  var x =  (vals[0]*Math.pow(i,2)) + (vals[1]*i) + vals[2];


    g.push(circle({r: 3, center: true}).translate([x, i, 0]))


}
x= difference(
linear_extrude({ height: 5 }, chain_hull(g)),
cylinder({r: 1, h: 6, center: [true, true, false]}).translate([0, y, 0]), //PONER PINES.
cylinder({r: 1, h: 6, center: [true, true, false]})

)
return x;


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


   //
