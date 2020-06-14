

//let svg = new SVG();

let mains = new Array(5);
let labels = ["FILE", "LINES", "POINTS", "TEXT", "SHADING"];
let sub0 = new Array(5);
let labels0 = ["Add Line", "Add Curve", "Add Super\nCool Curve", "Add AS", "Delete Line" ];
let sub1 = new Array(0);
let labels1 = ["Add/Remove\nFree Points"];
let sub2 = new Array(3);
let labels2 = ["Auto Add\nText Boxes", "+1 Text Box", "Delete Text"];
let sub3 = new Array(3);
let labels3 = ["Select Area", "Colour", "Delete Shade"];
let sub4 = new Array(3);
let labels4 = ["Clear", "Export PNG", "Export SVG"];
let colorbuttons = new Array(6);
let colors;

let w;

let main;
let subs = new Array(5);
let cols;

let lines = new Array(0);
let yaxis;
let xaxis;
let axes = new Array(2);

let points = new Array(0);

let fills = new Array(0);
let fillpts = new Array(0);
let tempfill;
let fillcol;

let keys = new Array(3);
let copied;

let tbs = new Array(0);

let x=0;
let imageCount = 0;
var u;
var focus = false;
let mode=-2;
let keyTyped = false;
let DOTTED = 1;
let exporting = false;

let MAIN = 0;
let SUB = 1;
let SUBSUB = 2;


let bg; 

let alpha = 127;
let alpha2 = 200;



function setup() {

  var mainicons = [];
  for (var i = 0; i < 5; i++) {
  mainicons[i] = loadImage("icons/main/"+str(i)+".png");
  }


  colors = [color(0, 128, 255), color(0, 255, 0), color(255, 0, 0), color(0, 255, 255), color(255, 255, 0), color(255, 0, 255)];
  createCanvas(1200, 800);
  //fullScreen();
  //surface.setResizable(true);
  u = height/10;
  bg = color(230);

  background(bg);

  keys[0]=false;
  keys[1]=false;
  keys[2]=false;


  w = new Window(1.5*u, u, width-1.5*u, height-u, u/2);

  main = new Container(mains, labels, mainicons, 0);
  subs[0] = new Container(sub0, labels0, null, SUB);
  subs[1] = new Container(sub1, labels1, null, SUB);
  subs[2] = new Container(sub2, labels2, null, SUB);
  subs[3] = new Container(sub3, labels3, null, SUB);
  subs[4] = new Container(sub4, labels4, null, SUB);


  //  for (let i=0; i<colors.length; i++) {
  //    colorbuttons[i]=new Button(colors[i], subs[3].buttons[1], i);
  //    colorbuttons[i].visible=false;
  //  }
  //  subs[3].buttons[1].bs=colorbuttons;




  //  let tempy = new Array(2);
  //  tempy[0]=new createVector(0, 0);
  //  tempy[1]=new createVector(0, w.h);
  //  yaxis=new Line(3, tempy);
  //  let tempx = new Array(2);
  //  tempx[0]=new createVector(0, 0);
  //  tempx[1]=new createVector(w.w, 0);
  //  xaxis=new Line(3, tempx);
  //  axes[0]=xaxis;
  //  axes[1]=yaxis;
}


function draw() { 
  
  rect(100,100,100,100);
  render(bg, false);
}
