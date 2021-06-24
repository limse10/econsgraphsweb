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

  if (mode == 2 && !buttonHighlight) {
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

  if (int(mode) == 3 && !buttonHighlight) {
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
  lineselected = null;
  focus = false;
  if (mode == 0) {
    for (var l of Object.values(lines)) {
      if (l.hovering && !focus) {
        lineselected = l;
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
  if (mode == 1 && !buttonHighlight) {
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
  if (mode == 3.1 && !buttonHighlight) {
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
