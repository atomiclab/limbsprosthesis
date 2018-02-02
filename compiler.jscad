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

/*include ("esqueleto.jscad");
include ("conectores.jscad");
include ("barras.jscad");
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

  util.init(CSG);
  /*Palma*/
  var lado=params.lado; //0 = izq 1 = der
  var pulgarpresente=params.pulgar; // 0 = no 1 = si
  var nombre=params.nombre;
  var height=params.z;
  var ancho=params.x/2;

  var palma = palmagenerator(ancho, height, pulgarpresente,nombre,lado);
  /////////////////////

  /* Finger mechanism holder */
  var mholders=mholder(ancho);
  ////////////////////

  /* x2 */
  var x2s=x2(ancho*4+8,6,lado)
  .rotateX(90)
  .rotateY(180)
  .translate([-ancho*2-3.5, 0, -ancho]);
  ////////////////////

  /* Dedos */
  var largo=6;
  var anchodedos=6;

  fingers=fingers(largo,height,lado,anchodedos)
      .rotateY(90)
      .translate([-ancho*2-1, 0, -15])

  return union(palma,mholders,x2s,fingers);


}
