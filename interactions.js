//const { create } = require("domain");

//Creates Button
class buttonCreation {
  constructor(iconIMG, funcToExec, text, classOfButtonPreset) {
    this.img = iconIMG;
    this.exe = funcToExec;
    this.text = text;
    this.idName = classOfButtonPreset;
    this.buttonState = false;
    this.buttonCnt = 0;
    this.visibility = true;
    this.NewButton = createButton(this.text);
  }
  renderButton() {
    this.NewButton.class(this.idName + " " + this.img);
    //NewButton.position(this.x, this.y);
    this.NewButton.mouseOver(this.buttonIsHover);
    this.NewButton.mouseOut(this.buttonIsNotHover);
    this.NewButton.mouseClicked(this.exe);

    if (this.visibility) {
      this.NewButton.style("visibility", "visible");
    } else {
      this.NewButton.style("visibility", "hidden");
    }
  }

  buttonIsHover() {
    buttonHighlight = true;
  }
  buttonIsNotHover() {
    buttonHighlight = false;
  }
}

function makeFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}
