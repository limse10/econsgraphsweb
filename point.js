class Point {

  constructor(type, l1, l2, root, parent) {
    if (parent) {
      this.parent=parent;
    }
    if (root) {
      this.root=root;
    }

    this.type=type;
    this.l1=l1;
    this.l2=l2;
    this.x=NaN;
    this.y=NaN;
    this.r = u/3;
    this.exists = false;
    this.hovering = false;
    this.selected = false;
    this.shading = false;
    this.solve();
    this.ps = new Array(0);
    this.ls = new Array(0);
    if (type==0||type==1) {
      var xs = new Array(2);
      xs[0] = new createVector(this.x, this.y);
      xs[1] = new createVector(this.x, 0);
      var lx = new Line(2, xs);
      this.ls=append(this.ls, lx);
      var ys = new Array(2);
      ys[0] = new createVector(this.x, this.y);
      ys[1] = new createVector(0, this.y);
      var ly = new Line(2, ys);
      this.ls=append(this.ls, ly);
    }
  }

  render() {
    this.solve();
    if (sqrt(sq(w.mx-this.x)+sq(w.my-this.y))<0.5*this.r) {
      this.hovering = true;
    } else {
      this.hovering = false;
    }

    if (this.exists||this.selected) {
      if (this.type==0||this.type==1) {
        this.ls[0].p[0].x=this.x;
        this.ls[0].p[0].y=this.y;
        this.ls[0].p[1].x=this.x;
        this.ls[1].p[0].x=this.x;
        this.ls[1].p[0].y=this.y;
        this.ls[1].p[1].y=this.y;
        if (((this.hovering&&mode==1)||this.selected)&&this.exists) {
          for (var l of Object.values(this.ls)) {
            l.render();
          }
        }
      }
      if (mode==1) {
        stroke(0);
        noFill();
        if (this.selected) {
          stroke(255, 0, 0);
        } else if (this.hovering) {
          stroke(250, 127, 127);
        }
        if (this.type==0) {

          strokeWeight(2);
          w.wcircle(this.x, this.y, this.r);
        }
        strokeWeight(4);
        if (this.type==1||this.type==2) {
          if (this.hovering||this.selected) {
            if (this.hovering && this.parent) {
              w.wline(this.x, this.y, this.parent.x, this.parent.y);

              if (this.parent.parent && this.parent.type>=1) {

                w.wline(this.parent.x, this.parent.y, this.parent.parent.x, this.parent.parent.y);
              }
            }
            strokeWeight(2);
            w.wcircle(this.x, this.y, this.r);
          }
        }
      } else if (mode==3.1) {
        stroke(0);
        noFill();
        if (this.shading) {
          stroke(127, 127, 255);
        } else if (this.hovering&&mode==3.1) {
          stroke(80, 127, 80);
        }
        if (this.type==0) {
          strokeWeight(3);
          w.wcircle(this.x, this.y, this.r);
        }
        if (this.type==1||this.type==2) {
          if (this.hovering||this.shading) {
            if (this.hovering && this.parent) {
              w.wline(this.x, this.y, this.parent.x, this.parent.y);
              if (this.parent.parent) {
                w.wline(this.parent.x, this.parent.y, this.parent.parent.x, this.parent.parent.y);
              }
            }
            strokeWeight(2);
            w.wcircle(this.x, this.y, this.r);
          }
        }
      }
    }
  }

  solve() {
    if (this.type==-1) {

      this.x=NaN;
      this.y=NaN;
    } else if (this.l1.type==0&&this.l2.type==0) {
      if (this.l1.n==1&&this.l2.n==1) {////////////////////////////////////////////////////////////////solve 2 linear//////////////////////////////////////////////////////////////

        var y0=this.l1.p[0].y;
        var y1=this.l1.p[1].y;
        var y2=this.l2.p[0].y;
        var y3=this.l2.p[1].y;
        var x0=this.l1.p[0].x;
        var x1=this.l1.p[1].x;
        var x2=this.l2.p[0].x;
        var x3=this.l2.p[1].x;
        var tb=(x2-x0-(y2-y0)*(x1-x0)/(y1-y0))/(((x1-x0)*(y3-y2))/(y1-y0)-(x3-x2));
        if (tb>0&&tb<1) {
          this.x=x2+tb*(x3-x2);
          this.y=y2+tb*(y3-y2);
          if (((this.y-y0)/(y1-y0)>0&&(this.y-y0)/(y1-y0)<1)&&((this.y-y2)/(y3-y2)>0&&(this.y-y2)/(y3-y2)<1)) {
            this.exists=true;
          } else {
            this.exists = false;
          }
        } else {
          this.x=NaN;
          this.y=NaN;
          this.exists=false;
        }
      } else if (this.l1.n==1&&this.l2.n==2) {////////////////////////////////////////////////////////////solve linear + quad//////////////////////////////////////////////////
        var y0=this.l1.p[0].y;
        var y1=this.l1.p[1].y;
        var x0=this.l1.p[0].x;
        var x1=this.l1.p[1].x;
        var p0x=this.l2.p[0].x;
        var p0y=this.l2.p[0].y;
        var p1x=this.l2.p[1].x;
        var p1y=this.l2.p[1].y;
        var p2x=this.l2.p[2].x;
        var p2y=this.l2.p[2].y;

        var A = y1-y0;
        var B = x0-x1;
        var C = x0*(y1-y0)-y0*(x1-x0);
        var LP0 = A*p0x+B*p0y;
        var LP1 = A*p1x+B*p1y;
        var LP2 = A*p2x+B*p2y;
        var a=LP0-2*LP1+LP2;
        var b=-2*LP0+2*LP1;
        var c=LP0-C;
        var t=0;
        if (this.root==1) {
          t = (-b+sqrt(sq(b)-4*a*c))/(2*a);
        } else if (this.root==-1) {
          t = (-b-sqrt(sq(b)-4*a*c))/(2*a);
        }


        this.x=sq(1-t)*p0x+2*(1-t)*t*p1x+sq(t)*p2x;
        this.y=sq(1-t)*p0y+2*(1-t)*t*p1y+sq(t)*p2y;
        if (t>0&&t<1) {
          if ((this.y-y0)/(y1-y0)>0&&(this.y-y0)/(y1-y0)<1&&(this.x-x0)/(x1-x0)>0&&(this.x-x0)/(x1-x0)<1) {
            this.exists=true;
          } else {

            this.exists = false;
          }
        } else {
          this.x=NaN;
          this.y=NaN;
          this.exists=false;
        }
      } else if (this.l1.n==1&&this.l2.n==3) {//solve linear + cubic
      }
    } else if (this.l1.type==0&&this.l2.type==1) {//solve linear + AS
      if (this.l1.n==1) {


        var temps = new Array(2);
        this.y=this.l2.p[0].y;
        temps[0]=new createVector(0, this.y);
        temps[1]=new createVector(w.w, this.y);
        var l = new Line(2, temps);
        var p = new Point(0, l, this.l1,NaN,NaN);
        p.solve();

        if (p.x>this.l2.p[0].x&&p.x<this.l2.p[1].x-this.l2.asr) {

          this.x=p.x;
          this.y=p.y;
          this.exists=true;
        } else {
          temps = new Array(2);
          this.x=this.l2.p[1].x;
          temps[0]=new createVector(this.x, 0);
          temps[1]=new createVector(this.x, w.h);
          l = new Line(2, temps);
          p = new Point(0, l, this.l1,NaN,NaN);
          p.solve();
          if (p.y<this.l2.p[1].y&&p.y>this.l2.p[0].y+this.l2.asr) {
            this.x=p.x;
            this.y=p.y;
            this.exists=true;
          } else {
            var m = (this.l1.p[1].y-this.l1.p[0].y)/(this.l1.p[1].x-this.l1.p[0].x);
            var c = this.l1.p[0].y-m*this.l1.p[0].x;
            var x1=this.l2.p[1].x-this.l2.asr;
            var y1=this.l2.p[0].y+this.l2.asr;
            var A = sq(m)+1;
            var B = 2*(m*(c-y1)-x1);
            var C = sq(x1)+sq(c-y1)-sq(this.l2.asr);
            this.x=(-B+sqrt(sq(B)-4*A*C))/(2*A);
            this.y=m*this.x+c;
            this.exists = true;
          }
        }
      }
    } else if (this.l1.type==2&&this.l2.type==0) {
      if (this.l2.n==1) {//solve extension and linear
        if (this.l1.p[0].x==this.l1.p[1].x) {
          this.x=this.l1.p[0].x;
          var m = (this.l2.p[1].y-this.l2.p[0].y)/(this.l2.p[1].x-this.l2.p[0].x);
          var c = this.l2.p[0].y-m*this.l2.p[0].x;
          this.y=m*this.x+c;
        } else if (this.l1.p[0].y==this.l1.p[1].y) {

          this.y=this.l1.p[0].y;
          var m = (this.l2.p[1].y-this.l2.p[0].y)/(this.l2.p[1].x-this.l2.p[0].x);
          var c = this.l2.p[0].y-m*this.l2.p[0].x;
          this.x=(this.y-c)/m;
        }      
        this.exists = true;

        if (this.x>max(this.l2.p[0].x, this.l2.p[1].x)||this.x<min(this.l2.p[0].x, this.l2.p[1].x)||this.y>max(this.l2.p[0].y, this.l2.p[1].y)||this.y<min(this.l2.p[0].y, this.l2.p[1].y)) {
          this.x=NaN;
          this.y=NaN;
          this.exists=false;
        }
      } else if (this.l2.n==2) {//solve extension and quadratic
        var temps = new Array(2);
        if (this.l1.p[0].x==this.l1.p[1].x) {
          this.x=this.l1.p[0].x;
          temps[0]=new createVector(this.x, 0);
          temps[1]=new createVector(this.x, w.h);
          var l = new Line(0, temps);
          var p = new Point(0, l, this.l2, this.root,NaN);
          p.solve();
          this.x=p.x;
          this.y=p.y;
          this.exists=true;
        } else if (this.l1.p[0].y==this.l1.p[1].y) {
          this.y=this.l1.p[0].y;
          temps[0]=new createVector(0, this.y);
          temps[1]=new createVector(w.w, this.y);
          var l = new Line(0, temps);
          var p = new Point(0, l, this.l2, this.root,NaN);
          p.solve();
          this.x=p.x;
          this.y=p.y;
          this.exists=true;
        }
      }
    } else if (this.l1.type==3&&(this.l2.type==0||this.l2.type==2)) {
      if (this.l1.p[0].x==this.l1.p[1].x) {
        if (this.l2.p[0].y==this.l2.p[1].y) {
          this.y=this.l2.p[0].y;
          this.x=0;
        } else if (this.l2.p[0].x==this.l2.p[1].x) {
          this.x=NaN;
          this.y=NaN;
        } else {
          this.x=this.l1.p[0].x;
          var m = (this.l2.p[1].y-this.l2.p[0].y)/(this.l2.p[1].x-this.l2.p[0].x);
          var c = this.l2.p[0].y-m*this.l2.p[0].x;
          this.y=m*this.x+c;
        }
      } else if (this.l1.p[0].y==this.l1.p[1].y) {
        if (this.l2.p[0].x==this.l2.p[1].x) {
          this.y=0;
          this.x=this.l2.p[0].x;
        } else if (this.l2.p[0].y==this.l2.p[1].y) {
          this.x=NaN;
          this.y=NaN;
        } else {
          this.y=this.l1.p[0].y;
          var m = (this.l2.p[1].y-this.l2.p[0].y)/(this.l2.p[1].x-this.l2.p[0].x);
          var c = this.l2.p[0].y-m*this.l2.p[0].x;
          this.x=(this.y-c)/m;
        }
      }   
      this.exists = true;

      if (this.y>w.h||this.y<0) {
        this.x=NaN;
        this.y=NaN;
        this.exists=false;
      }
    } else if (this.l1.type==3&&this.l2.type==3) {
      this.x=0;
      this.y=0;
      this.exists=true;
    }
  }
}
