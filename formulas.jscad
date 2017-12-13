// title      : formulas
// author     : Gino Tubaro
// license    : MIT License
// description: File used to put the code that is used for parabolic calcs, among others
//            Files using this are: UpperArm.jscad and Barras.jscad
//
//      Functions:
//            calculate: parabolic function with 2 free points in space (x fixed)
//            calculate2: parabolic funciton with 3 points. All of them free in space.
//



function calculate(x1,x2,y,yaux) //parabola de dos puntos libres
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

function calculate2(x0,y0,x1,y1,x2,y2) //parabola de 3 puntos libres
{
    sgnb=" +"; sgnc=" +";
    a = x0; //x1
    a=a*a;
    b = x0; //x1
    c = 1;
    d = y0; //y1

    e = x1;//x2
    e=e*e;
    f = x2; //x2
    g = 1;
    h = y1; //y2

    i = x2; //x3
    i=i*i;
    j = x2; //x3
    k = 1;
    l = y2; //y3

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
