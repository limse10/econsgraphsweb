class TextBox {
  constructor(x, y, w, h) {
    this.xoff;
    this.yoff;
    this.focusing = false;
    this.moving = false;
    this.hovering = false;
    this.reg = 20;
    this.x = x;
    this.y = y;
    this.w = w;
    this.varw = w;
    this.h = h;
    this.marg = h / 3;
    this.input = createInput();
    this.input.position(this.x, this.y);
    this.input.size(w, h);
  }

  render() {
    //for(int i =0;i<t.length;i++){
    //println(t[i]);
    //}
    //    println("________________________________________");

    this.checkHover();

    if (this.focusing) {
      mode = 2;
      if (mouseIsPressed) {
        this.moving = true;
      } else {
        this.moving = false;
      }
    }
    if (this.moving) {
      this.x = w.mx - this.xoff;
      this.y = w.my - this.yoff;
    }

    textSize(20);
    let twid = textWidth(this.input.value());
    if (twid < this.w - 20) {
      this.varw = this.w;
    } else {
      this.varw = textWidth(this.input.value() + 20);
    }

    this.input.size(this.varw, this.h);
    if (mode == 2 && (this.hovering || this.moving || this.focusing)) {
      noFill();
      w.wrect(
        this.x - this.marg,
        this.y + this.marg,
        this.varw + 2 * this.marg,
        this.h + 2 * this.marg
      );
    }
    strokeWeight(2);
    noFill();
    w.wtextbox(this.input, this.x, this.y);

    if (mode == 2) {
      this.input.style("display", "block");
      noFill();
      w.wrect(this.x, this.y, this.varw, this.h);
    } else {
      this.input.style("display", "none");
      noStroke();
      fill(0);
      textAlign(LEFT, TOP);
      w.write(this.input.value(), this.x + 2, this.y - 4);
    }
  }

  checkPress() {
    return (
      w.mx > this.x - this.marg &&
      w.mx < this.x + this.varw + this.marg &&
      w.my < this.y + this.marg &&
      w.my > this.y - this.h - this.marg
    );
  }

  checkHover() {
    if (
      w.mx > this.x - this.marg &&
      w.mx < this.x + this.varw + this.marg &&
      w.my < this.y + this.marg &&
      w.my > this.y - this.h - this.marg &&
      !(
        w.mx > this.x &&
        w.mx < this.x + this.varw &&
        w.my < this.y &&
        w.my > this.y - this.h
      )
    ) {
      this.hovering = true;
    } else {
      this.hovering = false;
    }
  }

  delete() {
    this.input.remove();
  }
}
