class Button {
  constructor(type, t, icon, x1, y1, x2, y2, d, c1, c2, mode) {
    var pressed = false;
    var hovered = false;
    var visible = false;
    //var bs = new Array(0);
    this.t = t;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.d = d;
    this.c1 = c1;
    this.c2 = c2;
    this.type = type;
    this.icon = icon;
    this.mode = mode;
    this.c3 = 130;
    this.textsize = 16;
  }

  //Button(color c, Button parent, int i) {
  //  this.c=c;
  //  this.parent=parent;
  //  this.i=i;
  //  type=SUBSUB;
  //  d=parent.d*4/5;
  //  x1=(parent.x1+parent.x2)/2+d*(i%3-1);
  //  y1=parent.y1+parent.d+d*(i/3);
  //}

  render() {
    if (this.type < 2) {
      this.hovered = false;
      if (this.visible) {
        fill(this.c1);

        if (
          dist(mouseX, mouseY, this.x1, this.y1) < this.d / 2 ||
          dist(mouseX, mouseY, this.x2, this.y2) < this.d / 2 ||
          (mouseX > this.x1 &&
            mouseX < this.x2 &&
            mouseY > this.y1 - this.d / 2 &&
            mouseY < this.y2 + this.d / 2)
        ) {
          this.hovered = true;
          fill(this.c2);
        }
        if (int(mode) == this.mode) {
          fill(this.c3);
          this.textsize = 18;
        } else {
          this.textsize = 16;
        }
        if (this.type == MAIN) {
          noStroke();
          strokeWeight(2);
          ellipse(this.x1, this.y1, this.d, this.d);

          textSize(this.textsize);
          textAlign(CENTER, CENTER);
          fill(0);
          text(this.t, this.x1, this.y1 + 0.7 * this.d);
          image(
            this.icon,
            this.x1 - this.icon.width / 2,
            this.y1 - this.icon.height / 2
          );
        } else if (this.type == SUB) {
          noStroke();
          strokeWeight(2);
          ellipse(this.x1, this.y1, this.d, this.d);
          ellipse(this.x2, this.y2, this.d, this.d);
          rect(this.x1, this.y1 - this.d / 2, this.x2 - this.x1, this.d);
          textSize(16);
          textAlign(CENTER, CENTER);
          fill(0);
          text(this.t, (this.x1 + this.x2) / 2, this.y1);
        }
      }
      if (this.visible) {
        if (this.bs) {
          for (var b in this.bs) {
            if (b.visible) {
              b.render();
            } else {
              b.hovered = false;
            }
          }
        }
      }
    } else if (type == 2) {
      hovered = false;
      if (dist(mouseX, mouseY, x1, y1) < d / 2) {
        hovered = true;
      }
      if (visible) {
        fill(c, alpha);
        if (hovered) {
          noFill();
          stroke(127);
          strokeWeight(3);
          ellipse(x1, y1, d, d);
          fill(c, alpha2);
        }

        noStroke();
        strokeWeight(2);
        ellipse(x1, y1, 0.9 * d, 0.9 * d);
      }
    }
  }
}
