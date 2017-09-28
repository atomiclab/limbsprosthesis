// OpenJSCAD port of the OpenSCAD
// Pin Connectors V2 by
// Tony Buser <tbuser@gmail.com>
// see http://www.thingiverse.com/thing:10541
//
// ported by Chris Jackson http://www.thingiverse.com/faithhack/about

// h = shaft height
// r = shaft radius
// lh = lip height
// lt = lip thickness
// t = tolerance
// tight = set to false if you want a joint that spins easily

function main() {

  return pin();

}
function pinhole({h=10, r=4, lh=3, lt=1, t=0.3, tight=true} = {}) {
  var ret = union(
    pin_solid(h, r+(t/2), lh, lt),
    cylinder({h:h+0.2, r:r}),
    // widen the entrance hole to make insertion easier
    cylinder(h=lh/3, r2=r, r1=r+(t/2)+(lt/2)).translate([0, 0, -0.1])
  );
  // widen the cylinder slightly
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
// side = set to true if you want it printed horizontally
function pin({h=10, r=4, lh=3, lt=1, side=false} = {}) {
  if (side) {
    return pin_horizontal(h, r, lh, lt);
  } else {
    return pin_vertical(h, r, lh, lt);
  }
}


// bh = base_height
// br = base_radius
function pintack({h=10, r=4, lh=3, lt=1, bh=3, br=8.75} = {}) {
  return union(
    cylinder({h:bh, r:br}),
    pin(h, r, lh, lt).translate([0, 0, bh])
  );
}

function pinpeg({h=20, r=4, lh=3, lt=1} = {}) {
  return union(
    pin(h/2+0.1, r, lh, lt, side=true).translate([0, -h/4+0.05, 0]),
    rotate([0, 0, 180],pin(h/2+0.1, r, lh, lt, side=true)).translate([0, h/4-0.05, 0])
  );
}

// just call pin instead, I made this module because it was easier to do the rotation option this way
// since openscad complains of recursion if I did it all in one module
// h = shaft height
// r = shaft radius
// lh = lip height
// lt = lip thickness

function pin_vertical({h=10, r=4, lh=3, lt=1} = {}) {
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

// call pin with side=true instead of this
// h = shaft height
// r = shaft radius
// lh = lip height
// lt = lip thickness
function pin_horizontal({h=10, r=4, lh=3, lt=1} = {}) {
  return pin_vertical(h, r, lh, lt).rotate([90, 0, 0]).translate([0, h/2, r*1.125-lt]);
}

// this is mainly to make the pinhole module easier
function pin_solid({h=10, r=4, lh=3, lt=1} = {}) {
  return union(
    // shaft
    cylinder({h:h-lh, r:r, fn:30}),
    // lip
    cylinder({h:lh*0.25, r1:r, r2:r+(lt/2), fn:30}).translate([0, 0, h-lh]),
    cylinder({h:lh*0.25, r:r+(lt/2), fn:30}).translate([0, 0, h-lh+lh*0.25]),
    cylinder({h:lh*0.50, r1:r+(lt/2), r2:r-(lt/2), fn:30}).translate([0, 0, h-lh+lh*0.50])
  );
}
