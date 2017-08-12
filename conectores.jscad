  // title      : connectors
  // author     : Gino Tubaro
  // license    : MIT License
  // description: "libreria" de conectores para:
  //                    UpperArm - Thumb short conector
  //                    UpperArm - Palm connectorx2
  //                    UpperArm - Finger Conector
  // file       : conectores.jscad
  //!OpenSCAD


  function conector (x,y,dual,baseh) {
    

        var result=[];

        var assembly =
        difference(
                union(
                    chooser(baseh,y,dual),
                         //cilindro base
                            cylinder({r:  y-1, h:  x}), //cilindro estructural
                            cylinder({r1:  y, r2:  y-1, h:  y+3}).translate([0,0, x-4]),
                            cylinder({r1:  y, r2:  y-2, h:  y+3}).mirroredZ().translate([0,0, x-4])
                          ),
                            cylinder({r:  y*2, h:  x}).translate([0,0, x]),
                            cube({size: [ y*3, y/4, x+ x-8],center:true}).translate([0,0, x])

                     );
               result.push(assembly);
               if (dual==1){
                 result.push(assembly.mirroredZ());
                return rotate([90,90,0],result);
              }else {
                return rotate([0,90,90],result);}
  }



  function chooser (baseh,y,dual){
      if (dual==1){
          return cylinder({r:  y+1, h:  baseh}).fillet(3,'z+');
        }else {
          return  cylinder({r:  y+1, h:  baseh}).fillet(3,'z-').fillet(3,'z+');;
        };
      }
       //


  // include:js
  // endinject
