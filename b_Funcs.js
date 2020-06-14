function new_diagram() {

  lines = new Array(0);
  points = new Array(0);
  fills = new Array(0);
  fill = new Array(0);
  tbs = new Array(0);
}


function render(bg, svg) {
  background(bg);

  for (var i = fills.length-1; i>=0; i--) { 
    if (fills[i].suicide) {
      fills=del(fills, i);
    } else {
      fills[i].render();
    }
  }
  if (tempfill!=null) { 
    tempfill.render();
  }
  for (var l of Object.values(lines)) {
    l.render();
  }

  for (var p of Object.values(points)) {
    p.render();
    for (var x of Object.values(p.ps)) {
      x.render();
    }
  }

  for (var tb of Object.values(tbs)) {
    tb.render();
  }
  if (!svg) {
    main.render();
    for (var c of Object.values(subs)) {
      //console.log(subs);
      for (var b of Object.values(c.buttons)) {
        if (b) {
          b.render();
        }
        //for (var b1 of Object.values(b.bs)) {
        //  if (b1) {
        //    b1.render();
        //  }
        //}
      }
    }
  }


  if (mode==3.3) {

    stroke(0);
    fill(fillcol);
    w.wcircle(w.mx, w.my, u/2);
  }

  w.renderWindow();   

  w.renderAxes();
}




function endfill() {


  fills=append(fills, tempfill);


  for (var p of Object.values(points)) {
    for (var x of Object.values(p.ps)) {

      x.shading=false;
    }
    p.shading=false;
  }
  tempfill=null;
  mode = 3;
}

function generateTextBoxes() {
  for (var p of Object.values(points)) {
    for (var x of Object.values(p.ps)) {
      //TextBox tb = new TextBox( x.x-u/2, x.y-u/10, u, u/3);
      //tbs=(TextBox[])append(tbs, tb);
    }
    var tb = new TextBox( p.x-u/2, p.y-u/10, u, u/3);
    tbs=append(tbs, tb);
  }

  for (var l of Object.values(lines)) {
    var px=0;
    var py=0;
    for (var p of Object.values(l.p)) {
      if (p.x>px) {
        px=p.x;
        py=p.y;
      }
    }
    var tb = new TextBox( px-u/4, py+u/2, u, u/3);
    tbs=append(tbs, tb);
  }
}


function insert(input, insertion, index) {
  var output = new Array(input.length+insertion.length);
  for (var i = 0; i <= index; i++) {
    output[i]=input[i];
  }
  for (var i = 0; i <= insertion.length-1; i++) {
    output[i+index+1]=insertion[i];
  }
  for (var i = 0; i <= input.length-index-2; i++) {
    output[i+index+insertion.length+1]=input[i+index+1];
  }

  return output;
}




function sortP(input) {

  var size = input.length;
  var output = new Array(size);
  var xt = 0;
  var yt = 0;
  for (var p of Object.values(input)) {
    xt+=p.x;
    yt+=p.y;
  }
  var xbar=xt/size;
  var ybar=yt/size;
  var angles = new Array(size);
  for (var i = 0; i<size; i++) {
    angles[i] = atan2((input[i].y-ybar), (input[i].x-xbar));
  }
  var sortedangles = sort(angles);
  for (var i = 0; i<sortedangles.length; i++) {
    for (var j = 0; j<angles.length; j++) {
      if (sortedangles[i]==angles[j]) {
        output[i]=input[j];
      }
    }
  }


  return output;
}


//void calculatePoints() {
//  for (int i = points.length-1; i>=0; i--) {
//    for (int j = points[i].ps.length-1; j >=0; j--) {
//      if (Float.isNaN(points[i].ps[j].x)||Float.isNaN(points[i].ps[j].y)||(points[i].ps[j].x==0&&points[i].ps[j].y==0)) {
//        points[i].ps=del(points[i].ps, j);
//      }
//    }
//    if (Float.isNaN(points[i].x)||Float.isNaN(points[i].y)||(points[i].x==0&&points[i].y==0)) {
//      points[i].ps=del(points, i);
//    }
//  }
//  for (Line l : lines) {
//    for (Line k : lines) {
//      if (l!=k) {
//        boolean solved=false;
//        for (Point p : points) {
//          if ((p.l1==l&&p.l2==k)||(p.l1==k&&p.l2==l)) {
//            solved=true;
//          }
//        }
//        if (!solved) {
//          if (l.type==0&&k.type==0) {
//            if (l.n==1&&k.n==1) {
//              Point p = new Point(0, l, k);
//              points=(Point[])append(points, p);
//            } else if (l.n==1&&k.n==2) {
//              Point p = new Point(0, l, k, -1);
//              points=(Point[])append(points, p);
//              p = new Point(0, l, k, 1);
//              points=(Point[])append(points, p);
//            } else if (l.n==1&&k.n==3) {
//            }
//          } else if (l.type==0&&k.type==1) {
//            Point p = new Point(0, l, k);
//            points=(Point[])append(points, p);
//          }
//          if (Float.isNaN(points[points.length-1].x)||Float.isNaN(points[points.length-1].y)) {
//            points=del(points, points.length-1);
//          }
//        }
//      }
//    }
//    for (Line k : axes) {
//      if (l.type==0&&l.n==1) {
//        boolean solved=false;
//        for (Point p : points) {
//          if ((p.l1==k&&p.l2==l)||(p.l1==l&&p.l2==k)) {
//            solved=true;
//          }
//        }
//        if (!solved) {
//          Point p = new Point(2, k, l);
//          points=(Point[])append(points, p);
//        }
//      }
//    }
//  } 



//  for (Point x : points) {
//    if (!Float.isNaN(x.x)&&!Float.isNaN(x.y)) {
//      for (Line l : x.ls) {
//        for (Line k : lines) {

//          if (l!=k&&k!=x.l1&&k!=x.l2) {
//            boolean solved=false;
//            for (Point p : x.ps) {
//              if ((p.l1==l&&p.l2==k)||(p.l1==k&&p.l2==l)) {
//                solved=true;
//              }
//            }


//            if (!solved) {
//              if (Float.isNaN(x.x)) {
//                Point p = new Point(-1, l, k);
//                x.ps=(Point[])append(x.ps, p);
//              } else 
//              if (k.type==0) {
//                if (k.n==1) {
//                  Point p = new Point(1, l, k, x);
//                  x.ps=(Point[])append(x.ps, p);
//                } else if (k.n==2) {
//                  Point p = new Point(1, l, k, -1, x);
//                  x.ps=(Point[])append(x.ps, p);
//                  p = new Point(1, l, k, 1, x);
//                  x.ps=(Point[])append(x.ps, p);
//                }
//              }
//            }
//          }
//        }


//        for (Line k : axes) {
//          if (l.type==2) {
//            boolean solved=false;
//            for (Point p : x.ps) {
//              if ((p.l1==k&&p.l2==l)||(p.l1==l&&p.l2==k)) {
//                solved=true;
//              }
//            }
//            if (!solved) {
//              Point p = new Point(2, k, l, x);
//              x.ps=(Point[])append(x.ps, p);
//            }
//          }
//        }
//      }


//      //////////////////////////////////////////////////////////////  
//      for (Point c : x.ps) {
//        for (Line l : c.ls) {
//          for (Line k : axes) {

//            if (l!=k&&k!=x.l1&&k!=x.l2) {
//              boolean solved=false;
//              for (Point p : x.ps) {
//                if ((p.l1==l&&p.l2==k)||(p.l1==k&&p.l2==l)) {
//                  solved=true;
//                }
//              }


//              if (!solved) {
//                if (Float.isNaN(x.x)) {
//                  Point p = new Point(-1, l, k, c);
//                  x.ps=(Point[])append(x.ps, p);
//                } else 
//                if (k.type==0) {
//                  if (k.n==1) {
//                    Point p = new Point(1, l, k, c);
//                    x.ps=(Point[])append(x.ps, p);
//                  } else if (k.n==2) {
//                    Point p = new Point(1, l, k, -1, c);
//                    x.ps=(Point[])append(x.ps, p);
//                    p = new Point(1, l, k, 1, c);
//                    x.ps=(Point[])append(x.ps, p);
//                  }
//                }
//              }
//            }
//          }


//          for (Line k : axes) {
//            if (l.type==2) {
//              boolean solved=false;
//              for (Point p : x.ps) {
//                if ((p.l1==k&&p.l2==l)||(p.l1==l&&p.l2==k)) {
//                  solved=true;
//                }
//              }
//              if (!solved) {
//                Point p = new Point(2, k, l, c);
//                x.ps=(Point[])append(x.ps, p);
//              }
//            }
//          }
//        }
//      }
//      ////////////////////////////////////////////////////////////
//    }
//  }

//  for (var i = points.length-1; i>=0; i--) {
//    for (var j = points[i].ps.length-1; j >=0; j--) {
//      if (Float.isNaN(points[i].ps[j].x)||Float.isNaN(points[i].ps[j].y)||(points[i].ps[j].x==0&&points[i].ps[j].y==0)) {
//        points[i].ps=del(points[i].ps, j);
//      }
//    }
//    if (Float.isNaN(points[i].x)||Float.isNaN(points[i].y)||(points[i].x==0&&points[i].y==0)) {
//      for (int k = points[i].ps.length-1; k >=0; k--) {
//        points[i].ps=del(points[i].ps, i);
//      }
//      points=del(points, i);
//    }
//  }
//  var originadded=false;
//  for (Point p : points) {
//    if (p.x==0&&p.y==0) {
//      originadded=true;
//    }
//  }
//  if (!originadded) {
//    Point origin = new Point(2, xaxis, yaxis);
//    points=(Point[])append(points, origin);
//  }
//}

function deleteLine() {
  for (var i = lines.length-1; i >= 0; i--) {
    if (lines[i].focusing) {
      for (var j = points.length-1; j >=0; j--) {
        for (var f = fills.length-1; f >=0; f--) {
          for (var p of Object.values(fills[f].ps)) {
            if (points[j]==p) {
              fills=del(fills, f);
            }
          }
        }
        for (var k = points[j].ps.length-1; k>=0; k--) {
          for (var f = fills.length-1; f >=0; f--) {
            for (var p of Object.values(fills[f].ps)) {
              if (points[j].ps[k]==p) {
                fills=del(fills, f);
              }
            }
          }
          if (points[j].ps[k].l1==lines[i]||points[j].ps[k].l2==lines[i]) {
            points[j].ps = del(points[j].ps, j);
          }
        }
        if (points[j].l1==lines[i]||points[j].l2==lines[i]) {
          points = del(points, j);
        }
      }
      lines = del(lines, i);
    }
  }
}

function deleteFill() {
  for (var i = fills.length-1; i >= 0; i--) {
    if (fills[i].focusing) {

      fills = del(fills, i);
    }
  }
}

function deleteText() {
  for (var i = tbs.length-1; i >= 0; i--) {
    if (tbs[i].focusing) {

      tbs = del(tbs, i);
    }
  }
}

function del(input, index) {
  var output = new Array(input.length-1);
  for (var i = 0; i<output.length; i++) {
    if (i<index) {
      output[i]=input[i];
    } else {
      output[i]=input[i+1];
    }
  }
  return output;
}


function choose(n, r) {
  var output = 1;
  for (var i = 1; i <= r; i++)
  {
    output *= n - (r - i);
    output /= i;
  }
  return output;
}
