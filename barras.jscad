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

//include ("formulas.jscad");
//include ("conectores.jscad");
function barralateral(y,p) {

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
/*
function main() {
    return slider(90,3);
}
   //
*/
