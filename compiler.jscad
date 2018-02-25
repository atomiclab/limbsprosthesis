include('lodash.js');

include("node_modules/jscad-utils/jscad-utils.jscad");
include("node_modules/jscad-utils/jscad-utils-color.jscad");

include('node_modules/jscad-utils/jscad-utils-parts.jscad');
include('node_modules/jscad-utils/jscad-boxes.jscad');

include ("palm.jscad");
include ("tornillotuerca.jscad");
include ("formulas.jscad");
include ("fingermechanismholderv2.jscad");
include ("conectores.jscad");

include ("bridev2.jscad");

include ("dedosv2.jscad");

include ("upperarm.jscad");
include ("barras.jscad");
include ("pulgar.jscad");
/*include ("esqueleto.jscad");
include ("conectores.jscad");

include ("formulas.jscad");
include ("cover.jscad");
include ("tornillotuerca.jscad");
*/
function getParameterDefinitions() {
  return [
    {
      name: 'x',
      type: 'float',
      initial: 25,
      caption: "X (ancho palma)"
    },
    {
      name: 'y',
      type: 'float',
      initial: 20,
      caption: "Y"
    },
    {
      name: 'z',
      type: 'float',
      initial: 50,
      caption: "Z (alto palma)"
    },
    {
      name:'lado',
      type:'choice',
      values: [0, 1],
      captions: ["Izquierda", "Derecha"],
      initial: 1
    },
    {
      name:'pulgar',
      type:'choice',
      values: [0, 1],
      captions: ["No", "Si"],
      initial: 1
    },
    {
      name: 'nombre',
      type: 'text',
      caption: 'Nombre',
      initial:"Gino Tubaro"
    }
  ];
}


function main(params) {
  console.log("parametros: lado: "+params.lado+" pulgarpresente "+params.pulgar+ " nombre: "+params.nombre+" height: "+params.z+" alto: "+params.x);
  util.init(CSG);
  /*Palma*/
  var lado=params.lado; //0 = izq 1 = der
  var pulgarpresente=params.pulgar; // 0 = no 1 = si
  var nombre=params.nombre;
  var height=params.z;
  var ancho=params.x/2;

  var palmageneratora=new Array();
  var palmageneratora= palmagenerator(ancho, height, pulgarpresente,nombre,lado);
  console.log("Palm created");
  console.log("Also, palm return coord for Thumb, x:"+ palmageneratora[1]+" Y: "+palmageneratora[2]+" Z: "+palmageneratora[3]);
  /////////////////////

  /* Finger mechanism holder */
  var mholders=mholder(ancho);
  console.log("Mechanism holder created");
  ////////////////////

  /* x2 */
  var x2s=x2(ancho*4+8,6,lado)
  .rotateX(90)
  .rotateY(180)
  .translate([-ancho*2-3.5, 0, -ancho]);
  console.log("X2 created");
  ////////////////////

  /* Dedos */
  var largo=6;
  var anchodedos=8;

  fingers=fingers(largo,ancho*5,lado,anchodedos)
  .rotateY(90)
  .translate([-ancho*2-1, 0, -15])
  console.log("Fingers created");
  //////////////////////

  /* Upper Arm */
  ua= UpperArm(params.x,height+height/2,pulgarpresente,lado)
  .translate([0, 2, height+4]);
  console.log("UpperArm created");
  //////////////////////

  /* Barras laterales */
  uax2=barralateral((height+height/2+8)+4,6)
  .rotateX(90)
  .rotateZ(-90)
  .snap(palmageneratora[0], 'x', 'outside+')
  .rotateX(-10)
  .translate([0, -4, -2]);

  uath=barralateral(height+5,3)
  .rotateX(90)
  .rotateZ(-90)
  .snap(palmageneratora[0], 'x', 'outside-')
  .rotateX(10)
  .translate([0, 28, height/2]); //center x +8

  console.log("UAX2 & UATH created");
  ////////////////

  /* Pulgar */
  if (pulgarpresente) {
    console.log();
    var anchoplano=4;
    if (lado) {
      pulgar=pulgar(ancho/2,lado/2,anchoplano)
        .translate([palmageneratora[1]-anchoplano, palmageneratora[3]*2, -palmageneratora[2]]);
    }else {
      pulgar=pulgar(ancho,lado,anchoplano)
        .translate([palmageneratora[1]+anchoplano, palmageneratora[3]*2, -palmageneratora[2]]);
    }
      console.log("Thumb created");
  }else {
    console.log("Thumb isn't requiered");
  }


  /////////////////
  return union(palmageneratora[0].rotateX(-90),pulgar);
  //return union(palma,mholders,x2s,fingers,ua,uax2,uath).rotateX(-90);


}
