//EXPORT PNG URI QUARK API
window.addEventListener(
  "message",
  (event) => {
    if (event.data == "downloadPNG") {
      switchMode(0);
      setTimeout(1, draw());
      let uri = getCanvasURI();
      let type = "downloadPNG";
      event.source.postMessage(
        {
          type: type,
          uri: uri,
        },
        event.origin
      );
    }
    if (event.data.fn == "qrk_load_data") {
      qrk_load_data(event.data.payload.data);
    }
    if (event.data.fn == "qrk_save_data") {
      event.source.postMessage(
        { fn: "qrk_save_data", payload: user_data },
        event.origin
      );
    }
  },
  false
);

function getCanvasURI() {
  let URI = document.getElementById("defaultCanvas0").toDataURL();
  return URI;
}

const qrk_load_data = (data) => {
  lines = data.lines;
  fills = data.fills;
  points = data.points;
  tbs = data.tbs;
  return true;
};

const qrk_save_data = () => {
  return { lines: lines, fills: fills, points: points, tbs: tbs };
};
