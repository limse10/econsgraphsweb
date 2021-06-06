class Container {
  constructor(buttons, labels, icons, type) {
    var x1, y1, x2, y2;
    var cols;
    this.buttons = buttons;
    this.labels = labels;
    this.type = type;
    this.icons = icons;

    if (this.type == 0) {
      for (var i = 0; i < buttons.length; i++) {
        this.buttons[i] = new Button(
          MAIN,
          labels[i],
          icons[i],
          u,
          (i + 1.5) * 1.4 * u,
          u,
          (i + 1.5) * 1.4 * u,
          u,
          color(190),
          color(170),
          (mode = i - 1)
        );
        this.buttons[i].visible = true;
      }
      this.x1 = u;
      this.y1 = 1.5 * 1.4 * u;
      this.x2 = u;
      this.y2 = (buttons.length - 1 + 1.5) * 1.4 * u;
    } else if (type == SUB) {
      for (var i = 0; i < buttons.length; i++) {
        this.buttons[i] = new Button(
          SUB,
          labels[i],
          null,
          (1.3 * i + 2) * 1.4 * u,
          0.8 * u,
          (1.3 * i + 2) * 1.4 * u + 0.8 * u,
          0.8 * u,
          0.8 * u,
          color(200),
          color(150)
        );
        this.buttons[i].visible = false;
      }
      this.x1 = 1.5 * 1.4 * u;
      this.y1 = u;
      this.x2 = (buttons.length - 1 + 1.5) * 1.4 * u;
      this.y2 = u;
    }
  }

  //Container(Button[] buttons, color[] cols, Button parent, int type) {
  //  this.buttons=buttons;
  //  this.cols=cols;
  //  this.type=type;
  //  float x = parent.x1;
  //  float y = parent.y1;
  //  if (type==SUBSUB) {
  //    for (int i=0; i<cols.length; i++) {
  //      this.buttons[i]=new Button(cols[i], parent, i);
  //      this.buttons[i].visible=false;
  //    }
  //  }
  //}

  render() {
    if (this.type == MAIN) {
      noStroke();
      fill(200);
      rect(
        this.x1 - 0.7 * u,
        this.y1 - 0.4 * u,
        1.4 * u,
        this.y2 - this.y1 + 0.8 * u
      );
      ellipse(this.x1, this.y1 - 0.4 * u, 1.4 * u, 1.4 * u);
      ellipse(this.x1, this.y2 + 0.4 * u, 1.4 * u, 1.4 * u);
    } else if (this.type == SUB) {
    }
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].render();
    }
  }
}
