// title      : assembly
// author     : Gino Tubaro
// license    : MIT License
// description: General assembly document
//            Listed files are: conectores.jscad
//      Parts:
//                    UpperArm - Thumb short conector
//                    UpperArm - Palm connectorx2
//                    UpperArm - Finger Conector
//      Params:
//            conector(x,y,dual,baseh);
//            x: largo longitudinal, y: ancho radial, dual Boolean (doble o simple)
//            baseh: largo longitudinal de base //WARNING: sumar x+baseh
// file       : conectores.jscad
//!OpenSCAD

// To Implement:
//INCHS - MM -> util.INCH(x)



include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');

include ("esqueleto.jscad");
include ("conectores.jscad");
include ("barras.jscad");
include ("formulas.jscad");
include ("upperarm.jscad");
include ("pulgar.jscad");
include ("cover.jscad");
function getParameterDefinitions() {
    return [
/* PARAMETROS DE PIEZAS
      //parametros Palm connectorx2
                  {
                    name: 'x', //longitudinal
                    type: 'float',
                    initial: 20,
                    caption: "x alto:"
                  },
                  {
                    name: 'y', //radial
                    type: 'float',
                    initial: 5,
                    caption: "y ancho:"
                   },
                  {
                    name: 'dual', //Boolean de modo FIXED en 0
                    type: 'choice',
                    caption: "Doble",
                    values:["1", "0"],
                    captions:["Si", "No"],
                    initial: "Si"
                   },
                  {
                    name: 'baseh',
                    type: 'float',
                    initial: 4,
                    caption: "anchobase:"
                   },

  //parametros UpperArm - Thumb clip

                  {
                    name: 'x1',
                    type: 'float',
                    initial: 20,
                    caption: "CLIPx alto:"
                  },
                  {
                     name: 'y1',
                     type: 'float',
                     initial: 5,
                     caption: "y ancho:"
                   },
                  {
                    name: 'dual1',
                    type: 'choice',
                    caption: "Doble",
                    values:["1", "0"],
                    captions:["Si", "No"],
                    initial: "Si" },
                  {
                     name: 'baseh1',
                     type: 'float',
                     initial: 4,
                     caption: "anchobase:"
                   },
      //parametros UpperArm - Utilities
                  {
                    name: 'x2',
                    type: 'float',
                    initial: 20,
                    caption: "Utilitiesx alto:"
                  },
                  {
                    name: 'y2',
                    type: 'float',
                    initial: 5,
                    caption: "y ancho:"
                  },
                  {
                    name: 'dual2',
                    type: 'choice',
                    caption: "Doble",
                    values:["1", "0"],
                    captions:["Si", "No"],
                    initial: "Si" },
                  {
                    name: 'baseh2',
                    type: 'float',
                    initial: 4,
                    caption: "anchobase:"
                  },
//Barras
                  {
                    name: 'xbar',
                    type: 'float',
                    initial: 11,
                    caption: "BARRAx alto:"
                  },
                  {
                    name: 'ybar',
                    type: 'float',
                    initial: 6,
                    caption: "y ancho:"
                  },

          */
//Tamaño muñeca
          {
            name: 'xtop',
            type: 'float',
            initial: 70,
            caption: "Ancho Superior del muñon"
          },

//Tamaño muñon sup
          {
            name: 'x',
            type: 'float',
            initial: 50,
            caption: "Ancho de la muñeca"
          },
//Largo de la palma
            {
              name: 'ypalm',
              type: 'float',
              initial: 30,
              caption: "Largo del muñon"
            },

//Ancho Palma
            {
              name: 'zpalm',
              type: 'float',
              initial: 50,
              caption: "Ancho del muñon"
            },
//Largo Antebrazo
            {
              name: 'yua',
              type: 'float',
              initial: 50,
              caption: "Largo del Antebrazo"
            },
//Ancho Antebrazo
            {
              name: 'zua',
              type: 'float',
              initial: 50,
              caption: "Ancho del Antebrazo."
            },
//longitudinal Antebrazo inferior
            {
              name: 'xbottomua',
              type: 'float',
              initial: 50,
              caption: "Ancho inferior del Antebrazo"
            },


          ];
  }

function main(params) {
  util.init(CSG);
    var enableall = 0; // test mode
    if(enableall){
       return [
     conector(params.x,params.y,0,params.baseh), // UpperArm - Palm connectorx2
     conector(params.x,params.y,0,params.baseh).mirroredY(), // UpperArm - Palm connectorx2
     conector(params.x2,params.y2,1,params.baseh2).translate([30, 0, 0]), // UpperArm - Utilities
     conector(params.x2,params.y2,1,params.baseh2).translate([30, 30, 0]), // UpperArm - Utilities
     conector(params.x1,params.y1,0,params.baseh1).translate([-30, 30, 0]), // UpperArm - Thumb short conector
     barra(params.xbar,params.ybar)
          ];
              }else {// TEST AREA

                return[

 // Crear esqueleto del muñon

                    stumpE(params.xtop,params.x,params.ypalm,params.zpalm),
                    wristE(params.x,params.zpalm),
                    UpperArmE(params.x,params.xbottomua,params.yua,params.zua),

//Crear elementos de la protesis

pulgar()


                ];
             }
  }



// include:js
// endinject
