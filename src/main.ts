import "./main.css";
import "./common.css";
import drawCat from "./library/drawCat";
import loadingImg from "./assets/loading.png";
import errorImg from "./assets/error_placeholder.png";

import CatData from "./library/CatData";

function getElementByUniqueClassName(className: string): Element {
  return document.getElementsByClassName(className)[0];
}

var catData: CatData;

const catSprite = getElementByUniqueClassName(
  "cat-sprite-img",
) as HTMLImageElement;
catSprite.src = loadingImg;

const spriteNumberSelect = getElementByUniqueClassName(
  "sprite-no-select",
) as HTMLSelectElement;
const peltNameSelect = getElementByUniqueClassName(
  "pelt-name-select",
) as HTMLSelectElement;
const colourSelect = getElementByUniqueClassName(
  "colour-select",
) as HTMLSelectElement;
const tintSelect = getElementByUniqueClassName(
  "tint-select",
) as HTMLSelectElement;
const skinColourSelect = getElementByUniqueClassName(
  "skin-colour-select",
) as HTMLSelectElement;
const eyeColourSelect = getElementByUniqueClassName(
  "eye-colour-select",
) as HTMLSelectElement;
const eyeColour2Select = getElementByUniqueClassName(
  "eye-colour2-select",
) as HTMLSelectElement;
const accessorySelect = getElementByUniqueClassName(
  "accessory-select",
) as HTMLSelectElement;
const scarSelect = getElementByUniqueClassName(
  "scar-select",
) as HTMLSelectElement;

const whitePatchesSelect = getElementByUniqueClassName(
  "white-patches-select",
) as HTMLSelectElement;
const pointsSelect = getElementByUniqueClassName(
  "points-select",
) as HTMLSelectElement;
const whitePatchesTintSelect = getElementByUniqueClassName(
  "white-patches-tint-select",
) as HTMLSelectElement;
const vitiligoSelect = getElementByUniqueClassName(
  "vitiligo-select",
) as HTMLSelectElement;

const tortieMaskSelect = getElementByUniqueClassName(
  "tortie-mask-select",
) as HTMLSelectElement;
const tortieColourSelect = getElementByUniqueClassName(
  "tortie-colour-select",
) as HTMLSelectElement;
const tortiePatternSelect = getElementByUniqueClassName(
  "tortie-pattern-select",
) as HTMLSelectElement;

const lineartSelect = getElementByUniqueClassName(
  "lineart-select",
) as HTMLSelectElement;

const isTortieCheckbox = getElementByUniqueClassName(
  "tortie-checkbox",
) as HTMLInputElement;
const shadingCheckbox = getElementByUniqueClassName(
  "shading-checkbox",
) as HTMLInputElement;
const reverseCheckbox = getElementByUniqueClassName(
  "reverse-checkbox",
) as HTMLInputElement;

const backgroundColourSelect = getElementByUniqueClassName(
  "bg-color-select",
) as HTMLSelectElement;

const scaleSelect = getElementByUniqueClassName(
  "zoom-level",
) as HTMLSelectElement;

const sharecodeTextArea = getElementByUniqueClassName(
  "sharecode",
) as HTMLTextAreaElement;

function selectByValue(select: HTMLSelectElement, value: string | null, ignoreNull: boolean) {
  if (value === null) {
    if (ignoreNull) {
      return;
    } else {
      value = "";
    }
  }

  const options = select.options;
  for (var i = 0; i < options.length; i++) {
    const option = options.item(i)!;
    if (option.value === value) {
      select.selectedIndex = i;
    }
  }
}

function setFormFromObject(data: CatData, ignoreNull: boolean) {
  isTortieCheckbox.checked = data.isTortie;
  shadingCheckbox.checked = data.shading;
  reverseCheckbox.checked = data.reverse;

  selectByValue(backgroundColourSelect, data.backgroundColour, ignoreNull);
  selectByValue(tortieMaskSelect, data.tortieMask, ignoreNull);
  selectByValue(tortieColourSelect, data.tortieColour, ignoreNull);
  selectByValue(tortiePatternSelect, data.tortiePattern, ignoreNull);
  selectByValue(peltNameSelect, data.peltName, ignoreNull);
  selectByValue(spriteNumberSelect, data.spriteNumber.toString(), ignoreNull);
  selectByValue(colourSelect, data.colour, ignoreNull);
  selectByValue(tintSelect, data.tint, ignoreNull);
  selectByValue(skinColourSelect, data.skinColour, ignoreNull);
  selectByValue(eyeColourSelect, data.eyeColour, ignoreNull);
  selectByValue(eyeColour2Select, data.eyeColour2, ignoreNull);
  selectByValue(whitePatchesSelect, data.whitePatches, ignoreNull);
  selectByValue(pointsSelect, data.points, ignoreNull);
  selectByValue(whitePatchesTintSelect, data.whitePatchesTint, ignoreNull);
  selectByValue(vitiligoSelect, data.vitiligo, ignoreNull);
  selectByValue(accessorySelect, data.accessory, ignoreNull);
  selectByValue(scarSelect, data.scar, ignoreNull);
}

function getDataURL() {
  const url = new URL(document.URL);
  return catData.getURL(`${url.origin}${url.pathname}`);
}

function applyDataURL() {
  catData = CatData.fromURL(document.location.search);
  setFormFromObject(catData, true);

  // don't want to reapply url or it adds to history twice
  redrawCat(false);
}

/**
 * Redraws the cat sprite and applies the new sprite to the cat image
 * element on the page.
 *
 * @param applyURL {boolean} Whether or not to add the data URL representing
 * the current sprite to the history.
 * Should be true on form modification but false on page load to avoid
 * getting added to history twice.
 */
function redrawCat(applyURL: boolean = true) {
  const c = new OffscreenCanvas(50, 50);
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, c.width, c.height);
  }

  catData.backgroundColour = backgroundColourSelect.value;

  catData.isTortie = isTortieCheckbox.checked;
  // pattern - represents mask
  catData.tortieMask = tortieMaskSelect.value;
  // tortieColour - represents masked pelt colour
  catData.tortieColour = tortieColourSelect.value;
  // tortiePattern - represents masked pelt name
  catData.tortiePattern = tortiePatternSelect.value;

  catData.peltName = peltNameSelect.value;
  catData.spriteNumber = Number(spriteNumberSelect.value);
  catData.colour = colourSelect.value;
  catData.tint = tintSelect.value;
  catData.skinColour = skinColourSelect.value;
  catData.eyeColour = eyeColourSelect.value;
  catData.whitePatchesTint = whitePatchesTintSelect.value;
  catData.eyeColour2 =
    eyeColour2Select.value === "" ? null : eyeColour2Select.value;
  catData.whitePatches =
    whitePatchesSelect.value === "" ? null : whitePatchesSelect.value;
  catData.points = pointsSelect.value === "" ? null : pointsSelect.value;
  catData.vitiligo = vitiligoSelect.value === "" ? null : vitiligoSelect.value;
  catData.accessory =
    accessorySelect.value === "" ? null : accessorySelect.value;
  catData.scar = scarSelect.value === "" ? null : scarSelect.value;
  catData.shading = shadingCheckbox.checked;
  catData.reverse = reverseCheckbox.checked;

  if (isTortieCheckbox.checked) {
    tortieColourSelect.disabled = false;
    tortieMaskSelect.disabled = false;
    tortiePatternSelect.disabled = false;
  } else {
    tortieColourSelect.disabled = true;
    tortieMaskSelect.disabled = true;
    tortiePatternSelect.disabled = true;
  }

  var isDead: boolean = false;
  var isDf: boolean = false;
  var aprilFools: boolean = false;
  if (lineartSelect.value === "regular") {
    isDead = false;
    isDf = false;
  } else if (lineartSelect.value === "dead") {
    isDead = true;
    isDf = false;
  } else if (lineartSelect.value === "dark forest") {
    isDead = true;
    isDf = true;
  } else if (lineartSelect.value === "aprilfools-regular") {
    isDead = false;
    isDf = false;
    aprilFools = true;
  } else if (lineartSelect.value === "aprilfools-dead") {
    isDead = true;
    isDf = false;
    aprilFools = true;
  } else if (lineartSelect.value === "aprilfools-dark forest") {
    isDead = true;
    isDf = true;
    aprilFools = true;
  }

  // update share code
  sharecodeTextArea.textContent = catData.getJSONData();

  const scale = Number(scaleSelect.value);
  const canvasSize = scale * 50;

  // set scale here so things aren't resizing
  catSprite.width = canvasSize;
  catSprite.height = canvasSize;

  // if it's taking a while, show loading
  var loaded = false;
  setTimeout(() => {
    if (!loaded) {
      catSprite.src = loadingImg;
    }
  }, 200);
  drawCat(
    c,
    catData.getPelt(),
    catData.spriteNumber,
    isDead,
    isDf,
    catData.shading,
    aprilFools,
  )
    .then(() => {
      const finalCanvas = new OffscreenCanvas(canvasSize, canvasSize);
      const finalCtx = finalCanvas.getContext("2d")!;
      finalCtx.imageSmoothingEnabled = false;

      finalCtx.fillStyle = catData.backgroundColour;
      finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
      finalCtx.scale(scale, scale);
      finalCtx.drawImage(c, 0, 0);

      return finalCanvas.convertToBlob();
    })
    .then((blob) => {
      loaded = true;
      catSprite.src = URL.createObjectURL(blob);

      if (applyURL) {
        const dataURL = getDataURL().toString();
        history.pushState(null, "", dataURL);
      }
    })
    .catch((err) => {
      loaded = true;
      catSprite.src = errorImg;
      console.error(err);
    });
}

function randomizeSelected(select: HTMLSelectElement) {
  const options: HTMLOptionsCollection = select.options;
  options.selectedIndex = Math.floor(options.length * Math.random());
}

const randomButtons = document.getElementsByClassName(
  "random-button",
) as HTMLCollectionOf<HTMLButtonElement>;
for (const randomButton of randomButtons) {
  randomButton.addEventListener("click", (e) => {
    e.preventDefault();
    const selectId = randomButton.dataset.selectId;
    if (!selectId) {
      return;
    }
    const select = getElementByUniqueClassName(selectId) as HTMLSelectElement;
    randomizeSelected(select);
    redrawCat();
  });
}

// allow dropping into offspring predict
catSprite.addEventListener("dragstart", (ev) => {
  ev.dataTransfer?.setData("text/plain", document.location.search);
});

isTortieCheckbox.addEventListener("change", () => {
  redrawCat();
});
tortieColourSelect.addEventListener("change", () => redrawCat());
tortieMaskSelect.addEventListener("change", () => redrawCat());
tortiePatternSelect.addEventListener("change", () => redrawCat());

spriteNumberSelect.addEventListener("change", () => redrawCat());
peltNameSelect.addEventListener("change", () => redrawCat());
colourSelect.addEventListener("change", () => redrawCat());
tintSelect.addEventListener("change", () => redrawCat());
skinColourSelect.addEventListener("change", () => redrawCat());
eyeColourSelect.addEventListener("change", () => redrawCat());
eyeColour2Select.addEventListener("change", () => redrawCat());
whitePatchesSelect.addEventListener("change", () => redrawCat());
pointsSelect.addEventListener("change", () => redrawCat());
whitePatchesTintSelect.addEventListener("change", () => redrawCat());
vitiligoSelect.addEventListener("change", () => redrawCat());
accessorySelect.addEventListener("change", () => redrawCat());
scarSelect.addEventListener("change", () => redrawCat());
lineartSelect.addEventListener("change", () => redrawCat());
shadingCheckbox.addEventListener("change", () => redrawCat());
reverseCheckbox.addEventListener("change", () => redrawCat());

backgroundColourSelect.addEventListener("change", () => redrawCat());
scaleSelect.addEventListener("change", () => redrawCat());

getElementByUniqueClassName("randomize-all-button")?.addEventListener(
  "click",
  (e) => {
    e.preventDefault();

    randomizeSelected(spriteNumberSelect);
    randomizeSelected(peltNameSelect);
    randomizeSelected(colourSelect);
    randomizeSelected(tortiePatternSelect);
    randomizeSelected(tortieColourSelect);
    randomizeSelected(tortieMaskSelect);
    if (Math.random() <= 0.5) {
      isTortieCheckbox.checked = true;
    } else {
      isTortieCheckbox.checked = false;
    }
    randomizeSelected(tintSelect);
    randomizeSelected(eyeColourSelect);
    if (Math.random() <= 0.5) {
      randomizeSelected(eyeColour2Select);
    } else {
      eyeColour2Select.selectedIndex = 0;
    }
    randomizeSelected(skinColourSelect);

    if (Math.random() <= 0.5) {
      if (Math.random() <= 0.5) {
        randomizeSelected(whitePatchesSelect);
      } else {
        whitePatchesSelect.selectedIndex = 0;
      }
      if (Math.random() <= 0.5) {
        randomizeSelected(pointsSelect);
      } else {
        pointsSelect.selectedIndex = 0;
      }
      randomizeSelected(whitePatchesTintSelect);
      if (Math.random() <= 0.5) {
        randomizeSelected(vitiligoSelect);
      } else {
        vitiligoSelect.selectedIndex = 0;
      }
    } else {
      whitePatchesTintSelect.selectedIndex = 0;
      whitePatchesSelect.selectedIndex = 0;
      pointsSelect.selectedIndex = 0;
      vitiligoSelect.selectedIndex = 0;
    }

    if (Math.random() <= 0.5) {
      randomizeSelected(accessorySelect);
    } else {
      accessorySelect.selectedIndex = 0;
    }

    if (Math.random() <= 0.5) {
      randomizeSelected(scarSelect);
    } else {
      scarSelect.selectedIndex = 0;
    }

    if (Math.random() <= 0.5) {
      reverseCheckbox.checked = true;
    } else {
      reverseCheckbox.checked = false;
    }

    redrawCat();
  },
);

const copyUrlButton = getElementByUniqueClassName("copy-url-button");
if ("clipboard" in navigator) {
  copyUrlButton?.addEventListener("click", (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(getDataURL().toString()).then(() => {
      // temporarily change button text to say "Copied!"
      copyUrlButton.textContent = "Copied!";
      setTimeout(() => {
        copyUrlButton.textContent = "Copy this cat's URL";
      }, 1250);
    });
  });
} else {
  copyUrlButton?.classList.add("hidden");
}

const importJSONButton = getElementByUniqueClassName("import-json-button");
importJSONButton.addEventListener("click", (e) => {
  e.preventDefault();

  const input = prompt("Enter data:");
  let data;
  if (input !== null) {
    try {
      data = JSON.parse(input);
    } catch (e: any) {
      alert("JSON parse error - check your syntax\n" + e.toString());
      return;
    }

    const catData = CatData.fromJSONData(data);
    setFormFromObject(catData, false);
    redrawCat(true);
  }
})

addEventListener("popstate", () => {
  applyDataURL();
});

applyDataURL();
