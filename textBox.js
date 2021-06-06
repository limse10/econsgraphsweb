class TextBox {
  constructor(x,y,w,h) {
    this.xoff;
    this.yoff;
    this.t = new Array(0);
    this.substring=0;
    this.subscript = new Array(0);
    this.focusing = false;
    this.moving = false;
    this.hovering = false;
    this.reg = 20;
    this.sub = 15;
    this.t=append(this.t, "");
    this.subscript=append(this.subscript, false);
    this.x=x;
    this.y=y;
    this.wid=w;
    this.h=h;

    
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
        this.moving =false;
      }
    }
    if (this.moving) {
      this.x=w.mx-this.xoff;
      this.y=w.my-this.yoff;
    }

   

    this.wid=0;
    for (var i=0; i<this.t.length; i++) {
      if (this.subscript[i]) {
        textSize(this.sub);
      } else {
        textSize(this.reg);
      }
      this.wid+=textWidth(this.t[i]);
    }


    this.writeToScreen();
    if (this.focusing) {
      if (this.subscript[this.substring]) {
        w.write(" |", this.x+this.wid, this.y-this.reg+this.sub);
      } else {
        w.write(" |", this.x+this.wid, this.y);
      }
    }




    if (this.wid<u) {
      this.wid=u;
    } else {
      textSize(this.reg);
      this.wid=this.wid+textWidth("lol");
    }
 if (this.hovering||this.focusing) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    if (mode!=2) {
      noStroke();
    }
    noFill();


    w.wrect(this.x, this.y, this.wid, this.h);
    
  }


  writeToScreen() {
    textAlign(LEFT, TOP);
    fill(0);
    strokeWeight(0);
    for (var i = 0; i < this.t.length; i++) {
    
      var offset=0;
      for (var j=0; j<i; j++) {
        if (this.subscript[j]) {
          textSize(this.sub);
        } else {
          textSize(this.reg);
        }
        offset+=textWidth(this.t[j]);
      }

      if (this.subscript[i]) {
        textSize(this.sub);
        w.write(" "+this.t[i], this.x+offset, this.y-this.reg+this.sub);
      } else {
        textSize(this.reg);
        w.write(" "+this.t[i], this.x+offset, this.y);
      }
    }
  }
  
  write(key) {
    print(key);
    
    this.t[this.substring]=this.t[this.substring]+key;
  }
  
  backspace() {
    for (var i = this.t.length-1; i>=0; i--) {
      if (this.t[i].length==0) {
        this.t=del(this.t, i);
        this.subscript=del(this.subscript, i);
        this.substring--;
      }
    }
    this.t[this.substring]=this.t[this.substring].substring(0, this.t[this.substring].length-1);
  }
   checkHover() {
    if (w.mx>this.x&&w.mx<this.x+this.wid&&w.my<this.y&&w.my>this.y-this.h) {
      this.hovering=true;
    } else {
      this.hovering = false;
    }
  }
}
