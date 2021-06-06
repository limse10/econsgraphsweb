class Fill {
  constructor(ps) {
    this.ps = ps;
    this.psv = new Array(ps.length);
    this.hovering = false;
    this.focusing = false;
    this.c = color(255, 100, 20);
    this.alpha = 127;
    this.alpha2 = 200;
    this.suicide = false;
    this.colorpicking = false;
  }

  render() {
    try {
      this.psv = new Array(this.ps.length);

      for (var i = 0; i < this.ps.length; i++) {
        this.psv[i] = new createVector(this.ps[i].x, this.ps[i].y);
        if (isNaN(this.ps[i].x) || isNaN(this.ps[i].y)) {
          this.suicide = true;
        }
      }
      this.identifyCurves();
      this.psv = sortP(this.psv);
      this.checkHover();

      if (this.hovering || this.focusing) {
        fill(red(this.c), green(this.c), blue(this.c), this.alpha2);
      } else {
        fill(red(this.c), green(this.c), blue(this.c), this.alpha);
      }
      noStroke();
      beginShape();
      for (var p of Object.values(this.psv)) {
        w.wvertex(p.x, p.y);
      }
      endShape();
    } catch (e) {
      console.error(e);
      this.suicide = true;
    }

    if (this.focusing && !this.colorpicking) {
      this.cp = createColorPicker("#e66465");
      this.cp.size(u / 3, u / 3);
      this.cp.elt.onchange = () => this.updateColor();
      w.colorpicker(this.cp, w.mx, w.my);
      this.colorpicking = true;
    }
    if (!this.focusing && !!this.cp) {
      this.cp.remove();
      this.colorpicking = false;
    }
  }

  updateColor() {
    this.c = this.cp.color();
    this.cp.remove();
    this.colorpicking = false;
  }
  // renderColorPicker() {
  //   w.wrect(w.mx, w.my, u, u);
  // }
  checkHover() {
    if (this.inside([w.mx, w.my]) && int(mode) == 3 && mode != 3.1) {
      this.hovering = true;
    } else {
      this.hovering = false;
    }
  }

  inside(point) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var vs = new Array(0);
    for (var i = 0; i < this.psv.length; i++) {
      vs = append(vs, [this.psv[i].x, this.psv[i].y]);
    }
    var x = point[0],
      y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0],
        yi = vs[i][1];
      var xj = vs[j][0],
        yj = vs[j][1];

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

  identifyCurves() {
    var l;
    var curve;
    var index = 0;
    var p1 = new createVector();
    var p2 = new createVector();
    for (var i = 0; i < this.ps.length; i++) {
      if (this.ps[i].l1.n == 2 || this.ps[i].l2.n == 2) {
        if (this.ps[i].l1 == this.ps[(i + 1) % (this.ps.length - 1)].l1) {
          l = this.ps[i].l1;
          p1.x = this.ps[i].x;
          p1.y = this.ps[i].y;
          p2.x = this.ps[(i + 1) % (ps.length - 1)].x;
          p2.y = this.ps[(i + 1) % (ps.length - 1)].y;
          curve = this.generateCurve(l, p1.x, p1.y, p2.x, p2.y);
          index = i;
          this.psv = insert(this.psv, curve, index);
        } else if (
          this.ps[i].l1 == this.ps[(i + 1) % (this.ps.length - 1)].l2
        ) {
          l = this.ps[i].l1;
          p1.x = this.ps[i].x;
          p1.y = this.ps[i].y;
          p2.x = this.ps[(i + 1) % (this.ps.length - 1)].x;
          p2.y = this.ps[(i + 1) % (this.ps.length - 1)].y;
          curve = this.generateCurve(l, p1.x, p1.y, p2.x, p2.y);
          index = i;
          this.psv = insert(this.psv, curve, index);
        } else if (
          this.ps[i].l2 == this.ps[(i + 1) % (this.ps.length - 1)].l1
        ) {
          l = this.ps[i].l2;
          p1.x = this.ps[i].x;
          p1.y = this.ps[i].y;
          p2.x = this.ps[(i + 1) % (this.ps.length - 1)].x;
          p2.y = this.ps[(i + 1) % (this.ps.length - 1)].y;
          curve = this.generateCurve(l, p1.x, p1.y, p2.x, p2.y);
          index = i;
          this.psv = insert(this.psv, curve, index);
        } else if (
          this.ps[i].l2 == this.ps[(i + 1) % (this.ps.length - 1)].l2
        ) {
          l = this.ps[i].l2;
          p1.x = this.ps[i].x;
          p1.y = this.ps[i].y;
          p2.x = this.ps[(i + 1) % (this.ps.length - 1)].x;
          p2.y = this.ps[(i + 1) % (this.ps.length - 1)].y;
          curve = this.generateCurve(l, p1.x, p1.y, p2.x, p2.y);
          index = i;
          this.psv = insert(this.psv, curve, index);
        }
      }
    }
  }

  generateCurve(l, x1, y1, x2, y2) {
    var ps = new Array(0);
    var t = 0;
    while (t <= 1) {
      var x = 0;
      var y = 0;

      for (var i = 0; i <= l.n; i++) {
        x += choose(l.n, i) * pow(1 - t, l.n - i) * pow(t, i) * l.p[i].x;
        y += choose(l.n, i) * pow(1 - t, l.n - i) * pow(t, i) * l.p[i].y;
      }
      var p = new createVector(x, y);
      if (
        x > min(x1, x2) &&
        x < max(x1, x2) &&
        y > min(y1, y2) &&
        y < max(y1, y2)
      ) {
        ps = append(ps, p);
      }
      t += 0.005;
    }
    return ps;
  }

  delete() {
    this.cp.remove();
  }
}
