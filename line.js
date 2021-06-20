class Line {

  constructor(type, p) {
    this.type=type;
    if (this.type==0||this.type==2) {
      this.n=p.length-1;
    }   
    this.p=p;
    this.transoff = new Array(p.length);
    for (var i = 0; i < this.transoff.length; i++) {
      this.transoff[i]=new createVector(0, 0);
    }

    this.tres=0.005;
    this.r = u/4;
    this.asr = 2*u;
    this.translating = false;
    this.focusing;
    this.hovering = false;  
    this.curr = new createVector(0, 0);
    this.next = new createVector(0, 0);
    this.exselected=true;
    this.c1 = color(255, 200, 71);
    this.c2 = color(0, 0, 255);
    this.c3 = color(255, 160, 71);
    this.newColorline = 80;
    this.linept = 1.5;
    this.dotpt = 0.75;
  }


  render() {
    this.hovering = false;
    if (this.type<=1) {
      if (this.focusing&&mode==0) {
        this.move();
      }
    }
    if (this.type==0) {////////////////////////////////////////////draw bezier///////////////////////////////////////////////
      var t=0;
      while (t<=1) {

        this.curr.x=0;
        this.curr.y=0;
        this.next.x=0;
        this.next.y=0;
        for (var i = 0; i <= this.n; i++) {
          this.curr.x+=choose(this.n, i)*pow(1-t, this.n-i)*pow(t, i)*this.p[i].x;
          this.curr.y+=choose(this.n, i)*pow(1-t, this.n-i)*pow(t, i)*this.p[i].y;
          this.next.x+=choose(this.n, i)*pow(1-(t+this.tres), this.n-i)*pow((t+this.tres), i)*this.p[i].x;
          this.next.y+=choose(this.n, i)*pow(1-(t+this.tres), this.n-i)*pow((t+this.tres), i)*this.p[i].y;
        }


        stroke(this.newColorline);
        strokeWeight(this.linept);

        if (this.focusing&&mode==0) {
          stroke(this.c1);
          strokeWeight(this.linept);
        }

        w.wline(this.curr.x, this.curr.y, this.next.x, this.next.y);
        t+=this.tres;

        if (abs(this.curr.x-w.mx)<0.5*this.r&&abs(this.curr.y-w.my)<0.5*this.r) {
          this.hovering=true;
        }
      }
      if ((this.focusing||this.hovering)&&mode==0) {

        if (this.n==2) {
          strokeWeight(this.dotpt);
          stroke(127);
          w.wline(this.p[0].x, this.p[0].y, this.p[1].x, this.p[1].y);
          w.wline(this.p[2].x, this.p[2].y, this.p[1].x, this.p[1].y);
        } else if (this.n==3) {
          strokeWeight(this.dotpt);
          stroke(127);
          w.wline(this.p[0].x, this.p[0].y, this.p[1].x, this.p[1].y);
          w.wline(this.p[2].x, this.p[2].y, this.p[3].x, this.p[3].y);
        }

        for (var x of Object.values(this.p)) {

          if (x.z==1) {
            stroke(this.c3);
            strokeWeight(this.linept*2);
            w.wpoint(x.x, x.y, this.r/1.5);
          } else {
            stroke(this.c3);
            strokeWeight(this.linept*2);
            w.wpoint(x.x, x.y, this.r/2.5);
          }
        }

        this.translating = true;
        for (x of Object.values(this.p)) {
          if (x.z==1) {
            this.translating = false;
          }
        }
      }
    }

    if (this.type==1) {//////////////////////////////////draw AS/////////////////////////////////



      if ((abs(w.mx-this.p[1].x)<0.5*this.r&&w.my>this.p[0].y+this.asr&&w.my<this.p[1].y)||
        (abs(w.my-this.p[0].y)<0.5*this.r&&w.mx>this.p[0].x&&w.mx<this.p[1].x-this.asr)||
        ((sq(w.mx-this.p[1].x+this.asr)+sq(w.my-this.p[0].y-this.asr))>sq(this.asr-0.5*this.r)&&(sq(w.mx-this.p[1].x+this.asr)+sq(w.my-this.p[0].y-this.asr))<sq(this.asr+0.5*this.r))&&w.mx>this.p[1].x-this.asr&&w.my<this.p[0].y+this.asr) {
        this.hovering = true;
      }
      stroke(this.newColorline);
      strokeWeight(this.linept);
      if (this.focusing&&mode==0) {
        stroke(this.c1);
        strokeWeight(this.linept);
        
      }
      w.wline(this.p[0].x, this.p[0].y, this.p[1].x-this.asr, this.p[0].y);
      w.wline(this.p[1].x, this.p[1].y, this.p[1].x, this.p[0].y+this.asr);
      w.warc(this.p[1].x-this.asr, this.p[0].y+this.asr, this.asr);
      if ((this.focusing||this.hovering)&&mode==0) {

        for (var x of Object.values(this.p)) {

          if (x.z==1) {
            stroke(this.c3);
            strokeWeight(this.linept*2);
            w.wpoint(x.x, x.y, this.r/1.5);
          } else {
            stroke(this.c3);
            strokeWeight(this.linept*2);
            w.wpoint(x.x, x.y, this.r/2.5);
          }
        }

        this.translating = true;
        for (var x of Object.values(this.p)) {
          if (x.z==1) {
            this.translating = false;
          }
        }
      }
    }
    if (this.type==2) {//////////////////////////////////////////////////draw extension //////////////////////////////////////////////////////
      if (mode==1) {
        if (this.p[0].x==this.p[1].x) {
          if (abs(w.mx-this.p[0].x)<0.5*this.r&&w.my<this.p[0].y-this.r&&w.my>this.p[1].y) {
            this.hovering = true;
          } else {
            this.hovering = false;
          }
        } else if (this.p[0].y==this.p[1].y) {
          if (abs(w.my-this.p[0].y)<0.5*this.r&&w.mx<this.p[0].x-this.r&&w.mx>this.p[1].x) {
            this.hovering = true;
          } else {
            this.hovering = false;
          }
        }
      }
      strokeWeight(this.dotpt);
      stroke(this.newColorline);
      if (this.hovering&&mode==1) {
        stroke(this.c1);
      }

      if (this.exselected||this.hovering) {
        w.wline(this.p[1].x, this.p[1].y, this.p[0].x, this.p[0].y, DOTTED);
      }
    }
  }

  move() {
    for (var x of Object.values(this.p)) {
      if (abs(x.x-w.mx)<1.5*this.r&&abs(x.y-w.my)<1.5*this.r) {
        this.hovering = true;
        x.z=1;
        for (var c of Object.values(this.p)) {
          if (c!=x) {
            c.z=0;
          }
        }
      }
    } 


    if (this.translating&&mouseIsPressed) {
      for (var i = 0; i < this.p.length; i++) {
        this.p[i].x=w.mx-this.transoff[i].x;
        this.p[i].y=w.my-this.transoff[i].y;
      }
    }
    for (x of Object.values(this.p)) {
      if (mouseIsPressed) {
        if (x.z==1) {
          x.x=w.mx;
          x.y=w.my;
        }
      } else {
        x.z=0;
      }
    }
  }
}
