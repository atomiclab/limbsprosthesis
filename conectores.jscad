// title      : Conectores parametricos
// author     : Gino Tubaro
// license    : MIT License
// description: General assembly document
// file       : conectores.jscad
//  Functions:
//      Parts:            conectores.jscad
//                  pin_tapa(h, r, lh, lt) Devuelve pin con tapa
//                  pin(h, r, lh, lt, side) Devuelve pin sin tapa
//                  pin_doble(h, r, lh, lt, gap)
//      Params:
//                  h:altura, r: radio, lh: lipheight, lt: lipthickness
//                  bh: base_height  br: base_radius, gap: distancia entre pines


//Inicializar el archivo de forma unitaria.
//function main() {
//      util.init(CSG);
//      return [pin_doble(20,3,4,1,10),pin_doble(20,3,4,1,5),pin_tapa(20,3,4,1,10),pin(20,3,4,1,10)];
//}

function pin_tapa(h, r, lh, lt) {
  return union(
pin(h, r, lh, lt, 1),
difference(
pintack(h, r, lh, lt,lt+1,r+1).rotateX(90).snap(pin(h, r, lh, lt, 1),'y','outside-').translate([0, 0,  r*1.125-lt]),
cube([r*2, r*h, r]).translate([-r,0,r+lh-1]),
cube([r*2, r*h, r]).translate([-r,0,-lh])
)
  );

}
function pinhole(h, r, lh, lt, t=0.3) {
  tight=true;
  var ret = union(
    pin_solid(h, r+(t/2), lh, lt),
    cylinder({h:h+0.2, r:r}),
    // agrandado el agujero para que entre mas facil
    cylinder(h=lh/3, r2=r, r1=r+(t/2)+(lt/2)).translate([0, 0, -0.1])
  );
  // lo mismo pero mas detallado
  // cylinder(h=h+0.2, r=r+(t-0.2/2));
  if (tight == false) {
    ret = ret.union(cylinder({h:h+0.2, r:r+(t/2)+0.25}));
  }
  return ret;
}

// h = shaft height
// r = shaft radius
// lh = lip height
// lt = lip thickness
// side = boolean, true para vertical
function pin(h, r, lh, lt, side) {
  if (side) {
    return pin_horizontal(h,r,lh,lt);
  } else {
    return pin_vertical(h,r,lh,lt);
  }
}


// bh = base_height
// br = base_radius
function pintack(h, r, lh, lt, bh, br ) {
  return union(
    cylinder({h:bh, r:br})

  );
}

function pinpeg(h, r, lh, lt) {
  return union(
    pin(h/2+0.1, r, lh, lt, side=true).translate([0, -h/4+0.05, 0]),
    rotate([0, 0, 180],pin(h/2+0.1, r, lh, lt, side=true)).translate([0, h/4-0.05, 0])
  );
}


// h = shaft height
// r = shaft radius
// lh = lip height
// lt = lip thickness

function pin_vertical(h, r, lh, lt) {
  return difference(
    pin_solid(h, r, lh, lt),
    // center cut
    cube([r*0.5, r*2+lt*2, h]).translate([-r*0.5/2, -(r*2+lt*2)/2, h/4]),
    cylinder({h:h+lh, r:r/2.5, fn:20}).translate([0, 0, h/4]),
    // side cuts
    cube([r*4, lt*2, h+2]).translate([-r*2, -lt-r*1.125, -1]),
    cube([r*4, lt*2, h+2]).translate([-r*2, -lt+r*1.125, -1])
  );
}


// h = shaft height
// r = shaft radius
// lh = lip height
// lt = lip thickness
function pin_horizontal(h, r, lh, lt) {
  return rotate([90,0,0],pin_vertical(h, r, lh, lt)).translate([0, h/2, r*1.125-lt]);
}


function pin_solid(h, r, lh, lt) {
  return union(
    // shaft
    cylinder({h:h-lh, r:r, fn:30}),
    // lip
    cylinder({h:lh*0.25, r1:r, r2:r+(lt/2), fn:30}).translate([0, 0, h-lh]),
    cylinder({h:lh*0.25, r:r+(lt/2), fn:30}).translate([0, 0, h-lh+lh*0.25]),
    cylinder({h:lh*0.50, r1:r+(lt/2), r2:r-(lt/2), fn:30}).translate([0, 0, h-lh+lh*0.50])
  );
}
//Devuelve dos pines, gap es el espacio del medio.
function pin_doble(h, r, lh, lt, gap) {
  var temp;
  var g = difference(
                union(
                  pin_horizontal(h, r, lh, lt),
                  temp=cylinder({r: r+1, h: gap,center:true}).rotateX(90).translate([0, h/4, r*1.125-lt]).snap(pin_horizontal(h, r, lh, lt), 'y', 'outside-'),
                  pin_horizontal(h, r, lh, lt).rotateZ(180).translate([0, 10, 0]).snap(temp,'y','outside-')
                ),
                        cube([r*2, r*h, r]).translate([-r,0,r+lh-1]),
                        cube([r*2, r*h, r]).translate([-r,0,-lh])
                      );
    return g;
}
