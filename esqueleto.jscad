
function stumpE(xtop,x,ypalm,zpalm) {
  var h = hull(
    //xtop
     square({size: [1,1]}).translate([(xtop/2)-1, ypalm, 0]),
     square({size: [1,1]}).translate([-xtop/2, ypalm, 0]),
     square({size: [1,1]}).translate([(x/2)-1, 0, 0]),
     square({size: [1,1]}).translate([-x/2, 0, 0])
      );
return  linear_extrude({ height: zpalm }, h).color('red',0.5);
}

function wristE(x,z) {
    return  cube({size: [x, 5, z], center: [true, true, false]}).color('red',0.5);
}

function UpperArmE(x,xbottomua,yua,zua) {
var h = hull(
    //xtop
     square({size: [1,1]}).translate([(xbottomua/2)-1, -yua, 0]),
     square({size: [1,1]}).translate([-xbottomua/2, -yua, 0]),

     square({size: [1,1]}).translate([(x/2)-1, 0, 0]),
     square({size: [1,1]}).translate([-x/2, 0, 0])
      );
return  linear_extrude({ height: zua }, h).color('red',0.5);

}
