let svg = new SVG();

let mains = new Array(5);
let labels = ["FILE", "LINES", "POINTS", "TEXT", "SHADING"];
let sub0 = new Array(5);
let labels0 = [
  "Add Line",
  "Add Curve",
  "Add Super\nCool Curve",
  "Add AS",
  "Delete Line",
];
let sub1 = new Array(0);
let labels1 = ["Add/Remove\nFree Points"];
let sub2 = new Array(3);
let labels2 = ["Auto Add\nText Boxes", "+1 Text Box", "Delete Text"];
let sub3 = new Array(2);
let labels3 = ["Select Area", "Delete Shade"];
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

let x = 0;
let imageCount = 0;
var u;
let focus = false;
let mode = -2;
let keyTyped = false;
let DOTTED = 1;
let exporting = false;

let MAIN = 0;
let SUB = 1;
let SUBSUB = 2;

let bg;

let alpha = 127;
let alpha2 = 200;

let mobile = false;

let mainButtonContainer;
let subMainLineMode;
let subMainTextMode;
let subMainShadeMode;
let currContainerToShow;
//test implement interactions - Joen :>
let testButtonInt;

function setup() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    mobile = true;
  } else {
    mobile = false;
  }

  var mainicons = [];
  for (var i = 0; i < 5; i++) {
    mainicons[i] = loadImage("icons/main/" + str(i) + ".png");
  }

  colors = [
    color(0, 128, 255),
    color(0, 255, 0),
    color(255, 0, 0),
    color(0, 255, 255),
    color(255, 255, 0),
    color(255, 0, 255),
  ];
  createCanvas(min(int(window.innerWidth), 1300), int(window.innerHeight - 50));
  //fullScreen();
  //surface.setResizable(true);
  if (mobile) {
    u = width / 10;
  } else {
    u = height / 10;
  }
  bg = color(245);
  textFont("Arial");

  background(bg);

  keys[0] = false;
  keys[1] = false;
  keys[2] = false;

  w = new Window(1.5 * u, u, width - 1.5 * u, height - u, u / 2);

 //main = new Container(mains, labels, mainicons, 0); // creates container for main buttons
 subs[0] = new Container(sub0, labels0, null, SUB);
  subs[1] = new Container(sub1, labels1, null, SUB);
  subs[2] = new Container(sub2, labels2, null, SUB);
  subs[3] = new Container(sub3, labels3, null, SUB);
  subs[4] = new Container(sub4, labels4, null, SUB);

  let tempy = new Array(2);
  tempy[0] = new createVector(0, 0);
  tempy[1] = new createVector(0, w.h);
  yaxis = new Line(3, tempy);
  let tempx = new Array(2);
  tempx[0] = new createVector(0, 0);
  tempx[1] = new createVector(w.w, 0);
  xaxis = new Line(3, tempx);
  axes[0] = xaxis;
  axes[1] = yaxis;
  mode = -2;
  calculatePoints();
  mainButtonContainer = new newButtonContainer('visbile',"mainButtonContainer","flexWrapContainerMainButton",attributeListMainButton,'newMainButtonPreset')
  subMainLineMode = new newButtonContainer('hidden','subMainLineContainer','flexWrapContainerSubMain',attributeListLineMode, 'newSubMainPreset');
  subMainTextMode =new newButtonContainer('hidden','subMainLineContainer','flexWrapContainerSubMain',attributeListTextMode, 'newSubMainPreset');
  subMainShadeMode =new newButtonContainer('hidden','subMainLineContainer','flexWrapContainerSubMain',attributeListShadeMode, 'newSubMainPreset');
  background(bg);
  
}

function draw() {
  
  resizeCanvas(windowWidth, windowHeight);
  if (mobile) {
    renderMobile();
    // render(bg, false);
  } else {
    render(bg, false);
    renderSubModeButtons();
  }
}

function renderMobile() {
  textAlign(CENTER, CENTER);
  textSize(20);
  noStroke();
  text(
    "this app sucks on mobile\nbc im bad at programming :<\n\nplease view on desktop instead :)",
    width / 2,
    height / 3
  );
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}