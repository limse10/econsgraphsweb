//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
//}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function setClipboard(svg) {
  navigator.permissions
    .query({
      name: "clipboard-write",
    })
    .then((result) => {
      if (result.state === "granted") {
        var blob = new Blob([svg], {
          type: "image/svg+xml",
        });
        console.log(blob);
        var item = new ClipboardItem({
          "image/svg+xml": blob,
        });
        navigator.clipboard.write([item]);
      } else {
      }
    });
}

function new_diagram() {
  lines = new Array(0);
  points = new Array(0);
  fills = new Array(0);
  fillpts = new Array(0);
  tbs = new Array(0);
}
function touchEnded() {
  console.log("yeeet");
  if (mobile) {
    focus = false;
    for (var l of Object.values(lines)) {
      if (l.focusing) {
        l.focusing = false;
      }
    }
  }
}
function render(bg, svg) {
  background(bg);

  for (var i = fills.length - 1; i >= 0; i--) {
    if (fills[i].suicide) {
      fills = del(fills, i);
    } else {
      fills[i].render();
    }
  }
  if (tempfill != null) {
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

  document.body.style.cursor = "default";

  for (var tb of Object.values(tbs)) {
    tb.render();
    if (tb.hovering && mode == 2) {
      document.body.style.cursor = "move";
    }
  }

  if (!svg) {
   // main.render();
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

  if (mode == 3.3) {
    stroke(0);
    fill(fillcol);
    w.wcircle(w.mx, w.my, u / 2);
  }

  w.renderWindow();

  w.renderAxes();
}

function endfill() {
  fills = append(fills, tempfill);

  for (var p of Object.values(points)) {
    for (var x of Object.values(p.ps)) {
      x.shading = false;
    }
    p.shading = false;
  }
  tempfill = null;
  fillpts = new Array(0);
  mode = 3;
}

function generateTextBoxes() {
  for (var p of Object.values(points)) {
    if (!(p.x == 0 || p.y == 0)) {
      for (var l of Object.values(p.ls)) {
        if (l.p[1].x == 0) {
          var tb = new TextBox(l.p[1].x - 1.1 * u, l.p[1].y + u / 6, u, u / 3);
        } else if (l.p[1].y == 0) {
          var tb = new TextBox(l.p[1].x - u / 2, l.p[1].y - u / 10, u, u / 3);
        }
        tbs = append(tbs, tb);
      }
      for (var x of Object.values(p.ps)) {
        if (x.selected) {
          var tb = new TextBox(x.x - u / 2, x.y - u / 10, u, u / 3);
          tbs = append(tbs, tb);
          for (var k of Object.values(x.ls)) {
            if (k.p[1].x == 0) {
              var tb = new TextBox(
                k.p[1].x - 1.1 * u,
                k.p[1].y + u / 6,
                u,
                u / 3
              );
            } else if (l.p[1].y == 0) {
              var tb = new TextBox(
                k.p[1].x - u / 2,
                k.p[1].y - u / 2.9,
                u,
                u / 3
              );
            }
            tbs = append(tbs, tb);
          }
        }
      }

      var tb = new TextBox(p.x - u / 2, p.y - u / 10, u, u / 3);
      tbs = append(tbs, tb);
    }
  }

  for (var l of Object.values(lines)) {
    var px = 0;
    var py = 0;
    for (var p of Object.values(l.p)) {
      if (p.x > px) {
        px = p.x;
        py = p.y;
      }
    }
    var tb = new TextBox(px - u / 4, py + u / 2, u, u / 3);
    tbs = append(tbs, tb);
  }
  xaxisbox = new TextBox(w.w - 9.5 * w.m, u / 6, u, u / 3);
  tbs = append(tbs, xaxisbox);
  yaxisbox = new TextBox(-u / 2, w.h - 2 * w.m, u, u / 3);
  tbs = append(tbs, yaxisbox);
  originbox = new TextBox(-u / 2, -u / 10, u, u / 3);
  tbs = append(tbs, originbox);
}

function insert(input, insertion, index) {
  var output = new Array(input.length + insertion.length);
  for (var i = 0; i <= index; i++) {
    output[i] = input[i];
  }
  for (var i = 0; i <= insertion.length - 1; i++) {
    output[i + index + 1] = insertion[i];
  }
  for (var i = 0; i <= input.length - index - 2; i++) {
    output[i + index + insertion.length + 1] = input[i + index + 1];
  }

  return output;
}

function cleanP(input) {
  var output = Array.from(input);
  input = input.filter((n) => n !== undefined);
  for (var i = input.length - 1; i >= 0; i--) {
    for (var j = input.length - 1; j >= 0; j--) {
      if (i != j) {
        if (
          int(input[i].x) == int(input[j].x) &&
          int(input[i].y) == int(input[j].y)
        ) {
          if (input[i].type < input[j].type) {
            output = output.splice(j, 1);
          } else {
            output = output.splice(i, 1);
          }
        }
      }
    }
  }
  return output;
}

function sortP(input) {
  var size = input.length;
  var output = new Array(size);
  var xt = 0;
  var yt = 0;
  for (var p of Object.values(input)) {
    xt += p.x;
    yt += p.y;
  }
  var xbar = xt / size;
  var ybar = yt / size;
  // w.wcircle(xbar, ybar, 10);
  var angles = new Array(size);
  for (var i = 0; i < size; i++) {
    angles[i] = atan2(input[i].y - ybar, input[i].x - xbar);
    // w.wline(xbar, ybar, input[i].x, input[i].y);
  }
  var sortedangles = sort([...angles]);
  for (var i = 0; i < sortedangles.length; i++) {
    // for (var j = 0; j < angles.length; j++) {
    //   if (sortedangles[i] == angles[j]) {
    //     output[i] = input[j];
    //   }
    // }
    output[i] = input[angles.indexOf(sortedangles[i])];
  }

  return output;
}

function calculatePoints() {
  for (var i = points.length - 1; i >= 0; i--) {
    for (var j = points[i].ps.length - 1; j >= 0; j--) {
      if (
        isNaN(points[i].ps[j].x) ||
        isNaN(points[i].ps[j].y) ||
        (points[i].ps[j].x == 0 && points[i].ps[j].y == 0)
      ) {
        points[i].ps = del(points[i].ps, j);
      }
    }
    if (
      isNaN(points[i].x) ||
      isNaN(points[i].y) ||
      (points[i].x == 0 && points[i].y == 0)
    ) {
      points[i].ps = del(points, i);
    }
  }
  for (var l of Object.values(lines)) {
    for (var k of Object.values(lines)) {
      if (l != k) {
        var solved = false;
        for (var p of Object.values(points)) {
          if ((p.l1 == l && p.l2 == k) || (p.l1 == k && p.l2 == l)) {
            solved = true;
          }
        }
        if (!solved) {
          if (l.type == 0 && k.type == 0) {
            if (l.n == 1 && k.n == 1) {
              var p = new Point(0, l, k, NaN, NaN);
              points = append(points, p);
            } else if (l.n == 1 && k.n == 2) {
              var p = new Point(0, l, k, -1, NaN);
              points = append(points, p);
              p = new Point(0, l, k, 1, NaN);
              points = append(points, p);
            } else if (l.n == 1 && k.n == 3) {
            }
          } else if (l.type == 0 && k.type == 1) {
            var p = new Point(0, l, k, NaN, NaN);
            points = append(points, p);
          }
          if (
            isNaN(points[points.length - 1].x) ||
            isNaN(points[points.length - 1].y)
          ) {
            points = del(points, points.length - 1);
          }
        }
      }
    }
    for (var k of Object.values(axes)) {
      if (l.type == 0 && l.n == 1) {
        var solved = false;
        for (var p of Object.values(points)) {
          if ((p.l1 == k && p.l2 == l) || (p.l1 == l && p.l2 == k)) {
            solved = true;
          }
        }
        if (!solved) {
          var p = new Point(2, k, l);
          points = append(points, p);
        }
      }
    }
  }

  for (var x of Object.values(points)) {
    if (!isNaN(x.x) && !isNaN(x.y)) {
      for (var l of Object.values(x.ls)) {
        for (var k of Object.values(lines)) {
          if (l != k && k != x.l1 && k != x.l2) {
            var solved = false;
            for (var p of Object.values(x.ps)) {
              if ((p.l1 == l && p.l2 == k) || (p.l1 == k && p.l2 == l)) {
                solved = true;
              }
            }

            if (!solved) {
              if (isNaN(x.x)) {
                var p = new Point(-1, l, k, NaN, NaN);
                x.ps = append(x.ps, p);
              } else if (k.type == 0) {
                if (k.n == 1) {
                  var p = new Point(1, l, k, NaN, x);
                  x.ps = append(x.ps, p);
                } else if (k.n == 2) {
                  var p = new Point(1, l, k, -1, x);
                  x.ps = append(x.ps, p);
                  p = new Point(1, l, k, 1, x);
                  x.ps = append(x.ps, p);
                }
              }
            }
          }
        }

        for (var k of Object.values(axes)) {
          if (l.type == 2) {
            var solved = false;
            for (var p of Object.values(x.ps)) {
              if ((p.l1 == k && p.l2 == l) || (p.l1 == l && p.l2 == k)) {
                solved = true;
              }
            }
            if (!solved) {
              var p = new Point(2, k, l, NaN, x);
              x.ps = append(x.ps, p);
            }
          }
        }
      }

      //////////////////////////////////////////////////////////////
      for (var c of Object.values(x.ps)) {
        for (var l of Object.values(c.ls)) {
          for (var k of Object.values(axes)) {
            if (l != k && k != x.l1 && k != x.l2) {
              var solved = false;
              for (var p of Object.values(x.ps)) {
                if ((p.l1 == l && p.l2 == k) || (p.l1 == k && p.l2 == l)) {
                  solved = true;
                }
              }

              if (!solved) {
                if (isNaN(x.x)) {
                  var p = new Point(-1, l, k, NaN, c);
                  x.ps = append(x.ps, p);
                } else if (k.type == 0) {
                  if (k.n == 1) {
                    var p = new Point(1, l, k, NaN, c);
                    x.ps = append(x.ps, p);
                  } else if (k.n == 2) {
                    var p = new Point(1, l, k, -1, c);
                    x.ps = append(x.ps, p);
                    p = new Point(1, l, k, 1, c);
                    x.ps = append(x.ps, p);
                  }
                }
              }
            }
          }

          for (var k of Object.values(axes)) {
            if (l.type == 2) {
              var solved = false;
              for (var p of Object.values(x.ps)) {
                if ((p.l1 == k && p.l2 == l) || (p.l1 == l && p.l2 == k)) {
                  solved = true;
                }
              }
              if (!solved) {
                var p = new Point(2, k, l, NaN, c);
                x.ps = append(x.ps, p);
              }
            }
          }
        }
      }
      ////////////////////////////////////////////////////////////
    }
  }

  for (var i = points.length - 1; i >= 0; i--) {
    for (var j = points[i].ps.length - 1; j >= 0; j--) {
      if (
        isNaN(points[i].ps[j].x) ||
        isNaN(points[i].ps[j].y) ||
        (points[i].ps[j].x == 0 && points[i].ps[j].y == 0)
      ) {
        points[i].ps = del(points[i].ps, j);
      }
    }
    if (
      isNaN(points[i].x) ||
      isNaN(points[i].y) ||
      (points[i].x == 0 && points[i].y == 0)
    ) {
      for (var k = points[i].ps.length - 1; k >= 0; k--) {
        points[i].ps = del(points[i].ps, i);
      }
      points = del(points, i);
    }
  }
  var originadded = false;
  for (var p of Object.values(points)) {
    if (p.x == 0 && p.y == 0) {
      originadded = true;
    }
  }
  if (!originadded) {
    var origin = new Point(2, xaxis, yaxis, NaN, NaN);
    points = append(points, origin);
  }
}

function deleteLine() {
  for (var i = lines.length - 1; i >= 0; i--) {
    if (lines[i].focusing) {
      for (var j = points.length - 1; j >= 0; j--) {
        for (var f = fills.length - 1; f >= 0; f--) {
          for (var p of Object.values(fills[f].ps)) {
            if (points[j] == p) {
              fills = del(fills, f);
            }
          }
        }
        for (var k = points[j].ps.length - 1; k >= 0; k--) {
          for (var f = fills.length - 1; f >= 0; f--) {
            for (var p of Object.values(fills[f].ps)) {
              if (points[j].ps[k] == p) {
                fills = del(fills, f);
              }
            }
          }
          if (
            points[j].ps[k].l1 == lines[i] ||
            points[j].ps[k].l2 == lines[i]
          ) {
            points[j].ps = del(points[j].ps, j);
          }
        }
        if (points[j].l1 == lines[i] || points[j].l2 == lines[i]) {
          points = del(points, j);
        }
      }
      lines = del(lines, i);
    }
  }
}

function deleteFill() {
  for (var i = fills.length - 1; i >= 0; i--) {
    if (fills[i].focusing) {
      fills[i].delete();
      fills = del(fills, i);
    }
  }
}

function deleteText() {
  document.body.style.cursor = "default";
  for (var i = tbs.length - 1; i >= 0; i--) {
    if (tbs[i].focusing) {
      tbs[i].delete();
      tbs = del(tbs, i);
    }
  }
}

function del(input, index) {
  var output = new Array(input.length - 1);
  for (var i = 0; i < output.length; i++) {
    if (i < index) {
      output[i] = input[i];
    } else {
      output[i] = input[i + 1];
    }
  }
  return output;
}

function choose(n, r) {
  var output = 1;
  for (var i = 1; i <= r; i++) {
    output *= n - (r - i);
    output /= i;
  }
  return output;
}
