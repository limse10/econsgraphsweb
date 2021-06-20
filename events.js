
function doubleClicked() {
  if (mode == 3.1) {
    if (tempfill != null) {
      endfill();
    }
    mode = 3;
  }
}

function mousePressed() {
  focus = false;

  for (var tb of Object.values(tbs)) {
    // if (tb.checkPress()) {
    //   mode = 2;
    // }
    tb.focusing = false;
  }

  if (tempfill != null && mode != 3.1) {
    endfill();
  }

  
// line mode button
/*
  if (mains[1].hovered) {
    
    mode = 0;
  }
  // delete line button
  if (subs[0].buttons[4].hovered) {
    
    deleteLine();
  }
  // add line button
  if (subs[0].buttons[0].hovered) {
    
    var p = new Array(2);
    if (lines.length == 0) {
      p[0] = new createVector(0, 500);
      p[1] = new createVector(600, 0);
    } else if (lines.length == 1) {
      p[0] = new createVector(0, 500);
      p[1] = new createVector(300, 0);
    } else {
      p[0] = new createVector(100, 100);
      p[1] = new createVector(500, 500);
    }
    var l = new Line(0, p);
    lines = append(lines, l);
  }
  // add curve button
  if (subs[0].buttons[1].hovered) {
    
    var p = new Array(3);

    if (lines.length == 2) {
      p[0] = new createVector(50, 200);
      p[1] = new createVector(150, 0);
      p[2] = new createVector(380, 550);
    } else if (lines.length == 3) {
      p[0] = new createVector(180, 500);
      p[1] = new createVector(280, 270);
      p[2] = new createVector(480, 480);
    } else {
      p[0] = new createVector(180, 500);
      p[1] = new createVector(280, 270);
      p[2] = new createVector(480, 480);
    }
    var l = new Line(0, p);
    lines = append(lines, l);
  }
  // add cubic bezier button
  if (subs[0].buttons[2].hovered) {
  
    var p = new Array(4);
    p[0] = new createVector(100, 400);
    p[1] = new createVector(500, 300);
    p[2] = new createVector(150, 200);
    p[3] = new createVector(300, 150);
    var l = new Line(0, p);
    lines = append(lines, l);
  }
  // add AS button
  if (subs[0].buttons[3].hovered) {
  
    var p = new Array(2);
    p[0] = new createVector(100, 100);
    p[1] = new createVector(500, 500);
    var l = new Line(1, p);
    lines = append(lines, l);
  }
  // points mode button
  if (mains[2].hovered) {
  
    mode = 1;
    calculatePoints();
  }
// textbox mode button
  if (mains[3].hovered) {
    
    mode = 2;
  }
// auto add text box button
  if (subs[2].buttons[0].hovered) {
    
    generateTextBoxes();
  }
  // add text box button
  if (subs[2].buttons[1].hovered) {
    
    var tb = new TextBox(-90, 570, u, u / 3);
    tbs = append(tbs, tb);
  }
// delete text box button
  if (subs[2].buttons[2].hovered) {
    
    deleteText();
  }
// select area mode button
  if (subs[3].buttons[0].hovered) {
    
    mode = 3.1;
  }
  // fill mode button
  if (mains[4].hovered) {
    
    /////////////shading
    mode = 3;
    calculatePoints();
    fillpts = new Array(0);
    for (var p of Object.values(points)) {
      for (var x of Object.values(p.ps)) {
        x.shading = false;
      }
      p.shading = false;
    }
  }
  // delete fill button
  if (subs[3].buttons[1].hovered) {
    
    deleteFill();
  }
//export button
  if (mains[0].hovered) {
    
    mode = -1;
  }
  // clear button
  if (subs[4].buttons[0].hovered) {
    
    new_diagram();
  }
  // export as png
  if (subs[4].buttons[1].hovered) {
    
    imageCount++;
    //render(255, false);
    //PImage crop = get(int(w.x+u/2), int(w.y+u/2), int(w.w), int(w.h));
    //crop.save("Diagrams/" + "diagram-" + imageCount + ".png");
    exporting = true;
    render(255, true);

    //needs to have transparent background
    saveCanvas("diagram", "png");
  }
// export as svg
  if (subs[4].buttons[2].hovered) {
    
    imageCount++;
    svg_download = svg.writeToSVG();
    download("diagram.svg", svg_download);

    // setClipboard(svg);
    //beginRecord(SVG, "Diagrams/"+"diagram-" + imageCount+".svg");
    // exporting = true;
    // render(255, true);
    // saveCanvas("diagram", "png");

    //endRecord();
    //exporting=false;
    //svg.writeToSVG("Diagrams/"+"diagram-"+ imageCount+".svg");
  }
*/

  
  if (mode == 2) {
    for (var tb of Object.values(tbs)) {
      if (tb.hovering && !focus) {
        tb.xoff = w.mx - tb.x;
        tb.yoff = w.my - tb.y;
        tb.focusing = true;
        focus = true;
      } else {
        tb.focusing = false;
        focus = false;
      }
    }
  }


  if (int(mode) == 3) {
    for (var f of Object.values(fills)) {
      if (f.hovering && !focus) {
        f.focusing = true;
        focus = true;
        if (mode == 3.3) {
          f.c = fillcol;
          mode = 3;
        }
      } else {
        if (!subs[3].buttons[1].hovered) {
          f.focusing = false;
          focus = false;
        }
      }
    }
  } else {
    for (var f of Object.values(fills)) {
      f.focusing = false;
    }
  }

  focus = false;
  if (mode == 0) {
    for (var l of Object.values(lines)) {
      if (l.hovering && !focus) {
        for (var k of Object.values(lines)) {
          k.focusing = false;
        }
        l.focusing = true;
        focus = true;
        for (var i = 0; i < l.p.length; i++) {
          l.transoff[i].x = w.mx - l.p[i].x;
          l.transoff[i].y = w.my - l.p[i].y;
        }
      } else {
        l.focusing = false;
        focus = false;
      }
    }
  }
  if (mode == 1) {
    var ihaveselectedsomethingalready = false;
    for (var p of Object.values(points)) {
      for (var l of Object.values(p.ls)) {
        if (l.hovering) {
          if (!l.exselected) {
            l.exselected = true;
          } else {
            l.exselected = false;
          }
        }
      }
      if (p.hovering) {
        if (!p.selected) {
          p.selected = true;
          ihaveselectedsomethingalready = true;
          for (var l of Object.values(p.ls)) {
            l.exselected = true;
          }
        } else {
          p.selected = false;
          ihaveselectedsomethingalready = true;
        }
      }

      if (!ihaveselectedsomethingalready) {
        for (var x of Object.values(p.ps)) {
          for (var l of Object.values(x.ls)) {
            if (l.hovering) {
              if (!l.exselected) {
                l.exselected = true;
              } else {
                l.exselected = false;
              }
            }
          }
          if (x.hovering) {
            if (!x.selected) {
              x.selected = true;
              for (var l of Object.values(x.ls)) {
                l.exselected = true;
              }
            } else {
              x.selected = false;
            }
          }
        }
      }
    }
  }
  if (mode == 3.1) {
    var ihaveselectedsomethingalready = false;
    for (var p of Object.values(points)) {
      if (p.hovering) {
        if (!p.shading) {
          p.shading = true;
          ihaveselectedsomethingalready = true;
        } else {
          p.shading = false;
          ihaveselectedsomethingalready = true;
        }
      }

      if (!ihaveselectedsomethingalready) {
        for (var x of Object.values(p.ps)) {
          if (x.hovering) {
            if (!x.shading) {
              x.shading = true;
            } else {
              x.shading = false;
            }
          }
        }
      }
    }

    // var fillpts = new Array(0);
    for (var p of Object.values(points)) {
      for (var x of Object.values(p.ps)) {
        if (x.shading && !fillpts.includes(x)) {
          fillpts = append(fillpts, x);
          break;
        }
      }
      if (p.shading && !fillpts.includes(p)) {
        fillpts = append(fillpts, p);
        break;
      }
    }
    if (fillpts.length > 2) {
      var f = new Fill(sortP(fillpts));
      tempfill = f;
    }
    // fillpts = new Array(0);
  }
/*
  if (mode == 0) {

    
    for (var b of Object.values(subs[0].buttons)) {
      b.visible = true;
    }
    for (b of Object.values(subs[1].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[2].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[3].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[4].buttons)) {
      b.visible = false;
    }
    
  }
  if (int(mode) == 1) {
    for (var b of Object.values(subs[0].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[1].buttons)) {
      b.visible = true;
    }
    for (b of Object.values(subs[2].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[3].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[4].buttons)) {
      b.visible = false;
    }
  }
  if (mode == 2) {
    for (var b of Object.values(subs[0].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[1].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[2].buttons)) {
      b.visible = true;
    }
    for (b of Object.values(subs[3].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[4].buttons)) {
      b.visible = false;
    }
  }
  if (int(mode) == 3) {
    for (var b of Object.values(subs[0].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[1].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[2].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[3].buttons)) {
      b.visible = true;
    }
    for (b of Object.values(subs[4].buttons)) {
      b.visible = false;
    }
  }
  if (int(mode) == -1) {
    for (var b of Object.values(subs[0].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[1].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[2].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[3].buttons)) {
      b.visible = false;
    }
    for (b of Object.values(subs[4].buttons)) {
      b.visible = true;
    }
  }
  */
}

function keyPressed() {
  if (keyCode == 46) {
    if (mode == 0) {
      deleteLine();
    } else if (mode == 2) {
      deleteText();
    } else if (mode == 3) {
      deleteFill();
    }
  }

  if (mode == 0) {
    if (keyCode == 17) {
      keys[0] = true;
    } else if (keyCode == 67) {
      keys[1] = true;
    } else if (keyCode == 86) {
      keys[2] = true;
    }
    if (keys[1] && keys[0] && !keys[2]) {
      for (var l of Object.values(lines)) {
        if (l.focusing) {
          l.focusing = false;
          copied = new Line(l.type, l.p);
        }
      }
    }
    if (keys[1] && keys[0] && !keys[2]) {
      for (l of Object.values(lines)) {
        if (l.focusing) {
          l.focusing = false;
          copied = new Line(l.type, l.p);
        }
      }
    }
    if (keys[2] && keys[0] && !keys[1]) {
      if (copied != null) {
        var p = new Array(copied.p.length);
        for (var i = 0; i < p.length; i++) {
          p[i] = new createVector(copied.p[i].x + u, copied.p[i].y);
        }
        var pasted = new Line(copied.type, p);
        lines = append(lines, pasted);
        copied = pasted;
        for (l of Object.values(lines)) {
          if (l.focusing) {
            l.focusing = false;
          }
          pasted.focusing = true;
        }
      }
    }
  }

  // if (keyCode==17) {
  //   for (var tb of Object.values(tbs)) {
  //     if (tb.focusing) {
  //       tb.substring++;
  //       tb.t=append(tb.t, "");

  //       tb.subscript=append(tb.subscript, !tb.subscript[tb.subscript.length-1]);
  //     }
  //   }
  // } else if (keyCode==8||keyCode==46) {
  //   for (var tb of Object.values(tbs)) {
  //     if (tb.focusing) {

  //       if (tb.t[0].length>0) {
  //         tb.backspace();
  //       }
  //     }
  //   }
  // } else if (keyCode==13) {
  //   for (var tb of Object.values(tbs)) {
  //     if (tb.focusing) {

  //       if (tb.t[0].length>0) {
  //         tb.write("\n");
  //       }
  //     }
  //   }
  // } else {
  //   if (keyCode!=16) {

  //     for (var tb of Object.values(tbs)) {
  //       if (tb.focusing) {

  //         tb.write(key);
  //       }
  //     }
  //   }
  // }
}

function keyReleased() {
  if (keyCode == 17) {
    keys[0] = true;
  } else if (keyCode == 67) {
    keys[1] = false;
  } else if (keyCode == 86) {
    keys[2] = false;
  }
}

