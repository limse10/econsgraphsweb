class Window {
  constructor(x, y, w, h, m) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.m = m;
    var mx, my;
    var axes;
  }

  renderWindow() {
    this.w = width - this.x;
    this.h = height - this.y;
    this.mx = mouseX - this.x - 3 * this.m;
    this.my = height - this.y + this.m - mouseY;
    if (!exporting) {
      fill(0);
      textAlign(TOP, RIGHT);
      //text(int(this.mx) + ", " + int(this.my), u, height - u / 5);
    }
  }

  renderAxes() {
    strokeWeight(1.5);
    stroke(0);
    this.wline(0, 0, 0, this.h - 3 * this.m);
    this.wline(0, 0, this.w - 10 * this.m, 0);
    this.wline(0, this.h - 3 * this.m, -this.m / 4, this.h - 3.5 * this.m);
    this.wline(0, this.h - 3 * this.m, this.m / 4, this.h - 3.5 * this.m);
    this.wline(this.w - 10 * this.m, 0, this.w - 10.5 * this.m, this.m / 4);
    this.wline(this.w - 10 * this.m, 0, this.w - 10.5 * this.m, -this.m / 4);
  }

  createAxes() {
    var tempy = new Array(2);
    tempy[0] = new createVector(0, 0);
    tempy[1] = new createVector(0, this.h);
    yaxis = new Line(3, tempy);
    var tempx = new Array(2);
    tempx[0] = new createVector(0, 0);
    tempx[1] = new createVector(this.w, 0);
    xaxis = new Line(3, tempx);
    axes[0] = xaxis;
    axes[1] = yaxis;
  }

  wrect(x, y, w, h) {
    rect(this.x + 3 * this.m + x, height - this.m - y, w, h);
  }

  wline(x1, y1, x2, y2, dot) {
    if (dot) {
      var gap = 20;
      if (x1 == x2) {
        var ystart = min(y1, y2);
        var yend = max(y1, y2);
        var yx = ystart;
        while (yx < yend - gap) {
          this.wline(x1, yx, x2, yx + gap / 2);
          yx += gap;
        }
        this.wline(x1, yx, x2, yend);
      }
      if (y1 == y2) {
        var xstart = min(x1, x2);
        var xend = max(x1, x2);
        var xy = xstart;
        while (xy < xend - gap) {
          this.wline(xy, y1, xy + gap / 2, y2);
          xy += gap;
        }
        this.wline(xy, y1, xend, y2);
      }
    } else {
      line(
        this.x + 3 * this.m + x1,
        height - this.m - y1,
        this.x + 3 * this.m + x2,
        height - this.m - y2
      );
    }
  }

  wcircle(x, y, r) {
    ellipse(this.x + 3 * this.m + x, height - this.m - y, r, r);
  }

  wcurve(a, b, c, x1, x2, r) {
    for (var x = x1; x < x2; x += 2) {
      this.wline(
        x,
        a * sq(x) + b * x + c,
        x + 2,
        a * sq(x + 2) + b * (x + 2) + c
      );
    }
  }

  warc(x1, y1, r) {
    for (var x = x1; x < x1 + r; x += 2) {
      this.wline(
        x,
        -sqrt(sq(r) - sq(x - x1)) + y1,
        x + 2,
        -sqrt(sq(r) - sq(x + 2 - x1)) + y1
      );
    }
  }
  wpoint(x, y, r) {
    this.wline(x - r, y - r, x + r, y + r);
    this.wline(x - r, y + r, x + r, y - r);
  }

  wtextbox(input, x, y) {
    input.position(this.x + 3 * this.m + x, height - this.m - y + 49);
  }
  colorpicker(cp, x, y) {
    cp.position(this.x + 3 * this.m + x, height - this.m - y + 50);
  }
  write(txt, x, y) {
    text(txt, this.x + 3 * this.m + x, height - this.m - y);
  }

  wvertex(x, y) {
    vertex(this.x + 3 * this.m + x, height - this.m - y);
  }
  wNewPoint(x,y){
    stroke(color(193, 111, 34))
    fill(color(rgb(254, 207, 162)))
    ellipse(x,y,10,10);
  }
}
