// title      : Barras laterales
// author     : Gino Tubaro
// license    : MIT License
// description: General assembly document
// file       : barras.jscad
//  Functions:
//      Parts:
//                  slider(y,p) Devuelve barra curvada de Y long con pines
//                  pin(h, r, lh, lt, side) Devuelve pin sin tapa
//                  pin_doble(h, r, lh, lt, gap)
//      Params:
//                  h:altura, r: radio, lh: lipheight, lt: lipthickness
//                  bh: base_height  br: base_radius, gap: distancia entre pines


function slider(y,p) {

    var x=0;
    var vals = calculate(0,y,p,0);
    var r=1.5;h=5;
    var g = new Array();
      for (var i = 0; i < (y-x+1); i++) {
      x =  (vals[0]*Math.pow(i,2)) + (vals[1]*i) + vals[2];
      g.push(circle({r: 3, center: true}).translate([x, i, 0]))
    }

x= difference(
      linear_extrude({ height: h }, chain_hull(g)),
      cylinder({r: r, h: h, center: [true, true, false]}).translate([0, y, 0]),
      cylinder({r: r, h: h, center: [true, true, false]}),
      pinhole(h,r,3,1,0.3),
      pinhole(h,r,3,1,0.3).translate([0,y,0])

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
