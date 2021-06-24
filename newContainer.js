// 07-06-2021
//uses font aweseome 4.7 icons
let attributeListMainButton = {
  lineModeButton: {
    func: "switchMode(0)",
    icon: '<i class="fa fa-pencil fa-lg" aria-hidden="true"></i><p>Lines</p>',
  },
  pointModeButton: {
    func: "switchMode(1)",
    icon: '<i class="fa fa-dot-circle-o fa-lg" aria-hidden="true"></i><p>Points</p>',
  },
  textModeButton: {
    func: "switchMode(2)",
    icon: '<i class="fa fa-font fa-lg" aria-hidden="true"></i><p>Text</p>',
  },
  shadingModeButton: {
    func: "switchMode(3)",
    icon: '<i class="fa fa-area-chart fa-lg" aria-hidden="true"></i><p>Fills</p>',
  },
};
// line sub modes
let attributeListLineMode = {
  addLineButton: {
    func: "addLine()",
    icon: "<p>Add Line</p>",
  },
  addCurveButton: {
    func: "addCurve()",
    icon: "<p>Add Curve</p>",
  },
  BezierCurveButton: {
    func: "addBezier()",
    icon: "<p>Bezier Curve</p>",
  },
  addASButton: {
    func: "addAS()",
    icon: "<p>Add AS</p>",
  },
  DeleteLineButton: {
    func: "deleteLine() onmouseover='makeTrue()' onmouseout='makeFalse()'",
    icon: "<p>Delete Line</p>",
  },
};
//text sub modes
let attributeListTextMode = {
  LabelAxis: {
    func: "generateTextBoxes();",
    icon: "<p>Label Axes</p>",
  },
  AddText: {
    func: "addTextBox()",
    icon: "<p>Add Text Box</p>",
  },
  DeleteText: {
    func: "deleteText();",
    icon: "<p>Delete Text Box</p>",
  },
};
//shading area sub modes
let attributeListShadeMode = {
  SelectArea: {
    func: "selectArea()",
    icon: "<p>Select Area</p>",
  },
  DeleteShade: {
    func: "deleteFill()",
    icon: "<p>Delete Fill</p>",
  },
};

function switchMode(modes) {
  mode = modes;
  if (modes == 1 || modes == 3) {
    calculatePoints();
  }
  if (modes == 3) {
    for (var p of Object.values(points)) {
      for (var x of Object.values(p.ps)) {
        x.shading = false;
      }
      p.shading = false;
    }
  }
}

function findSpaceForLine(points) {
  for (var l of Object.values(lines)) {
    count = 0;
    for (let i = 0; i < l.p.length; i++) {
      if (l.p[i].equals(points[i])) {
        count += 1;
      }
    }
    if (count == points.length) {
      for (let i = 0; i < points.length; i++) {
        points[i].x += 50;
      }
      return findSpaceForLine(points);
    }
  }
  return points;
}

function wratio(ratio) {
  return w.axis_width * ratio;
}
function hratio(ratio) {
  return w.axis_height * ratio;
}

//Line Functions
function addLine() {
  var p = new Array(2);
  p[0] = new createVector(0, hratio(0.7));
  p[1] = new createVector(hratio(0.7), 0);
  p = findSpaceForLine(p);
  var l = new Line(0, p);
  lines = append(lines, l);
}
function addCurve() {
  var p = new Array(3);

  p[0] = new createVector(wratio(0.2), hratio(0.9));
  p[1] = new createVector(wratio(0.4), hratio(0.4));
  p[2] = new createVector(wratio(0.8), hratio(0.9));
  p = findSpaceForLine(p);
  var l = new Line(0, p);
  lines = append(lines, l);
}
function addBezier() {
  var p = new Array(4);
  p[0] = new createVector(wratio(0.2), hratio(0.5));
  p[1] = new createVector(wratio(0.5), hratio(0.3));
  p[2] = new createVector(wratio(0.3), hratio(0.8));
  p[3] = new createVector(wratio(0.7), hratio(0.7));
  p = findSpaceForLine(p);
  var l = new Line(0, p);
  lines = append(lines, l);
}
function addAS() {
  var p = new Array(2);
  p[0] = new createVector(wratio(0.1), wratio(0.1));
  p[1] = new createVector(wratio(0.9), wratio(0.9));
  p = findSpaceForLine(p);
  var l = new Line(1, p);
  lines = append(lines, l);
}
//Text function
function addTextBox() {
  var tb = new TextBox(-90, 570, u, u / 3);
  tbs = append(tbs, tb);
}
//Shading mode functions
function selectArea() {
  mode = 3.1;
}

function renderSubModeButtons() {
  if (mode == 0) {
    subMainLineMode.visBool = true;
    subMainTextMode.visBool = false;
    subMainShadeMode.visBool = false;
    selectionLoop('mainButtonContainer','lineModeButton')
  } else if (int(mode) == 1) {
    subMainLineMode.visBool = false;
    subMainTextMode.visBool = false;
    subMainShadeMode.visBool = false;
    selectionLoop('mainButtonContainer','pointModeButton')
  } else if (int(mode) == 2) {
    subMainTextMode.visBool = true;
    subMainLineMode.visBool = false;
    subMainShadeMode.visBool = false;
    selectionLoop('mainButtonContainer','textModeButton')
  } else if (int(mode) == 3) {
    subMainShadeMode.visBool = true;
    subMainLineMode.visBool = false;
    subMainTextMode.visBool = false;
    selectionLoop('mainButtonContainer','shadingModeButton')
  }
  subMainLineMode.checkVis();
  subMainShadeMode.checkVis();
  subMainTextMode.checkVis();
}

class newButtonContainer {
  //will render a list of html buttons with reference to a set of coordinates
  //takes in list number of buttons and passes in their functions
  //stylised by css file
  constructor(
    defaultVis,
    idContainer,
    containerClass,
    attributeList,
    cssPresetToUseButton
  ) {
    this.visBool = false;
    this.contClass = containerClass;
    this.list = attributeList;
    this.css = cssPresetToUseButton;
    this.idMain = idContainer;
    //render last

    this.thisContainer = this.render();
    this.thisContainer.style.visibility = defaultVis;
  }
  //as in create
  render() {
    let divContainer = document.createElement("div");
    divContainer.setAttribute("class", this.contClass);
    divContainer.setAttribute("id", this.idMain);

    for (let currKey of Object.keys(this.list)) {
      let currAttribute = this.htmlFrameButton(currKey);
      divContainer.insertAdjacentHTML("beforeend", currAttribute);
    }
    document.body.appendChild(divContainer);
    return divContainer;
  }

  htmlFrameButton(key) {
    let currChar = this.list[key];
    let onclickFunc = currChar["func"];
    let innerIcon = currChar["icon"];
    let buttonHtmlStr = `<button id=${key} onclick=${onclickFunc}  class=${this.css}>${innerIcon}</button>`;
    return buttonHtmlStr;
  }

  //check visibility
  checkVis() {
    if (this.visBool == false) {
      this.thisContainer.style.visibility = "hidden";
    } else if (this.visBool == true) {
      this.thisContainer.style.visibility = "visible";
    }
  }
}
function makeTrue() {
  buttonHighlight = true;
}
function makeFalse() {
  buttonHighlight = false;
}


function selectedAesthetic(buttonID){
  let el = document.getElementById(buttonID)
  let child = el.childNodes;
  //change text visbility
  child[1].style.visibility = 'visible'
  el.style.color = ' rgb(235, 146, 52)';
}

function deselectAesthetic(buttonID){

  let el = document.getElementById(buttonID)
  let child = el.childNodes;
  //change text visbility
  child[1].style.visibility = 'hidden'
  el.style.background = ' transparent';

}

function selectionLoop(IDcont, IDButton){
  let container = document.getElementById(IDcont)
  let childs = container.childNodes
  let len = childs.length
  for(let cnt = 0; cnt<len; cnt++){
    let thisId = childs[cnt].id

    if(thisId != IDButton){

      deselectAesthetic(thisId)
    }
    else{
      selectedAesthetic(thisId)
    }
  }
}

