import './style.css'
import drawCat from './drawCat';
import loadingImg from "./assets/loading.png";
import errorImg from "./assets/error_placeholder.png";

function getElementByUniqueClassName(className: string): Element {
  return document.getElementsByClassName(className)[0];
}

const nameToSpritesname = {
  "SingleColour": 'single',
  'TwoColour': 'single',
  'Tabby': 'tabby',
  'Marbled': 'marbled',
  'Rosette': 'rosette',
  'Smoke': 'smoke',
  'Ticked': 'ticked',
  'Speckled': 'speckled',
  'Bengal': 'bengal',
  'Mackerel': 'mackerel',
  'Classic': 'classic',
  'Sokoke': 'sokoke',
  'Agouti': 'agouti',
  'Singlestripe': 'singlestripe',
  'Masked': 'masked',
  'Tortie': '',
  'Calico': '',
};

const catSprite = getElementByUniqueClassName("cat-sprite-img") as HTMLImageElement;
catSprite.src = loadingImg;

const spriteNumberSelect = getElementByUniqueClassName("sprite-no-select") as HTMLSelectElement;
const peltNameSelect = getElementByUniqueClassName("pelt-name-select") as HTMLSelectElement;
const colourSelect = getElementByUniqueClassName("colour-select") as HTMLSelectElement;
const tintSelect = getElementByUniqueClassName("tint-select") as HTMLSelectElement;
const skinColourSelect = getElementByUniqueClassName("skin-colour-select") as HTMLSelectElement;
const eyeColourSelect = getElementByUniqueClassName("eye-colour-select") as HTMLSelectElement;
const eyeColour2Select = getElementByUniqueClassName("eye-colour2-select") as HTMLSelectElement;
const accessorySelect = getElementByUniqueClassName("accessory-select") as HTMLSelectElement;
const scarSelect = getElementByUniqueClassName("scar-select") as HTMLSelectElement;

const whitePatchesSelect = getElementByUniqueClassName("white-patches-select") as HTMLSelectElement;
const pointsSelect = getElementByUniqueClassName("points-select") as HTMLSelectElement;
const whitePatchesTintSelect = getElementByUniqueClassName("white-patches-tint-select") as HTMLSelectElement;
const vitiligoSelect = getElementByUniqueClassName("vitiligo-select") as HTMLSelectElement;

const tortieMaskSelect = getElementByUniqueClassName("tortie-mask-select") as HTMLSelectElement;
const tortieColourSelect = getElementByUniqueClassName("tortie-colour-select") as HTMLSelectElement;
const tortiePatternSelect = getElementByUniqueClassName("tortie-pattern-select") as HTMLSelectElement;

const lineartSelect = getElementByUniqueClassName("lineart-select") as HTMLSelectElement;

const isTortieCheckbox = getElementByUniqueClassName("tortie-checkbox") as HTMLInputElement;
const shadingCheckbox = getElementByUniqueClassName("shading-checkbox") as HTMLInputElement;
const reverseCheckbox = getElementByUniqueClassName("reverse-checkbox") as HTMLInputElement;

const backgroundColourSelect = getElementByUniqueClassName("bg-color-select") as HTMLSelectElement;

const scaleSelect = getElementByUniqueClassName("zoom-level") as HTMLSelectElement;

const sharecodeTextArea = getElementByUniqueClassName("sharecode") as HTMLTextAreaElement;

function getFormObject() {
  return {
    shading: shadingCheckbox.checked.toString(),
    reverse: reverseCheckbox.checked.toString(),
    isTortie: isTortieCheckbox.checked.toString(),

    backgroundColour: backgroundColourSelect.value,
    tortieMask: tortieMaskSelect.value,
    tortieColour: tortieColourSelect.value,
    tortiePattern: tortiePatternSelect.value,

    peltName: peltNameSelect.value,
    spriteNumber: spriteNumberSelect.value,
    colour: colourSelect.value,
    tint: tintSelect.value,
    skinColour: skinColourSelect.value,
    eyeColour: eyeColourSelect.value,
    eyeColour2: eyeColour2Select.value,
    whitePatches: whitePatchesSelect.value,
    points: pointsSelect.value,
    whitePatchesTint: whitePatchesTintSelect.value,
    vitiligo: vitiligoSelect.value,
    accessory: accessorySelect.value,
    scar: scarSelect.value,

    version: "v1"
  }
}

function selectByValue(select: HTMLSelectElement, value: string) {
  const options = select.options;
  for (var i = 0; i < options.length; i++) {
    const option = options.item(i)!;
    if (option.value === value) {
      select.selectedIndex = i;
    }
  }
}

function setFormFromObject(data: Record<string, any>) {
  if (data.version === "v1") {
    isTortieCheckbox.checked = data.isTortie === "true" ? true : false;
    shadingCheckbox.checked = data.shading === "true" ? true : false;
    reverseCheckbox.checked = data.reverse === "true" ? true : false;
  
    selectByValue(backgroundColourSelect, data.backgroundColour);
    selectByValue(tortieMaskSelect, data.tortieMask);
    selectByValue(tortieColourSelect, data.tortieColour);
    selectByValue(tortiePatternSelect, data.tortiePattern);
    selectByValue(peltNameSelect, data.peltName);
    selectByValue(spriteNumberSelect, data.spriteNumber);
    selectByValue(colourSelect, data.colour);
    selectByValue(tintSelect, data.tint);
    selectByValue(skinColourSelect, data.skinColour);
    selectByValue(eyeColourSelect, data.eyeColour);
    selectByValue(eyeColour2Select, data.eyeColour2);
    selectByValue(whitePatchesSelect, data.whitePatches);
    selectByValue(pointsSelect, data.points);
    selectByValue(whitePatchesTintSelect, data.whitePatchesTint);
    selectByValue(vitiligoSelect, data.vitiligo);
    selectByValue(accessorySelect, data.accessory);
    selectByValue(scarSelect, data.scar);
  }
}

function getDataURL() {
  const url = new URL(document.URL);

  const params = new URLSearchParams(getFormObject());
  return new URL(`${url.origin}${url.pathname}?${params}`);  
}

function applyDataURL() {
  const params = new URLSearchParams(document.location.search);
  const obj: Record<string, any> = {}
  for (const [k, v] of params.entries()) {
    obj[k] = v;
  }
  setFormFromObject(obj);

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

  const backgroundColour = backgroundColourSelect.value;

  // pattern - represents mask
  const tortieMask = tortieMaskSelect.value;
  // tortieColour - represents masked pelt colour
  const tortieColour = tortieColourSelect.value;
  // tortiePattern - represents masked pelt name
  const tortiePattern = tortiePatternSelect.value as keyof typeof nameToSpritesname;

  const peltName = peltNameSelect.value as keyof typeof nameToSpritesname;
  const spriteNumber = Number(spriteNumberSelect.value);
  const colour = colourSelect.value;
  const tint = tintSelect.value;
  const skinColour = skinColourSelect.value;
  const eyeColour = eyeColourSelect.value;
  const whitePatchesTint = whitePatchesTintSelect.value;
  const eyeColour2 = eyeColour2Select.value === "" ? undefined : eyeColour2Select.value;
  const whitePatches = whitePatchesSelect.value === "" ? undefined : whitePatchesSelect.value;
  const points = pointsSelect.value === "" ? undefined : pointsSelect.value;
  const vitiligo = vitiligoSelect.value === "" ? undefined : vitiligoSelect.value;
  const accessory = accessorySelect.value === "" ? undefined : accessorySelect.value;
  const scar = scarSelect.value === "" ? [] : [scarSelect.value];
  const shading = shadingCheckbox.checked;
  const reverse = reverseCheckbox.checked;

  // we have to keep the original name (which is peltName) for spritesName,
  // but we have to also tell "name" in Pelt that it's a tortie if it's a tortie
  var name;
  if (isTortieCheckbox.checked) {
    name = "Tortie";
  } else {
    name = peltName;
  }

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
  sharecodeTextArea.textContent = JSON.stringify({
    pelt_name: name,
    pelt_color: colour,
    eye_colour: eyeColour,
    eye_colour2: eyeColour2 === undefined ? null : eyeColour2,
    reverse: reverse,
    white_patches: whitePatches === undefined ? null : whitePatches,
    vitiligo: vitiligo === undefined ? null : vitiligo,
    points: points === undefined ? null : points,
    white_patches_tint: whitePatchesTint,
    pattern: name === "Tortie" ? tortieMask : null,
    tortie_base: name === "Tortie" ? nameToSpritesname[peltName] : null,
    tortie_pattern: name === "Tortie" ? nameToSpritesname[tortiePattern] : null,
    tortie_color: name === "Tortie" ? tortieColour : null,
    skin: skinColour,
    tint: tint,
    scars: scar,
    accessory: accessory === undefined ? null : accessory,
  }, undefined, 4);


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
  drawCat(c, {
    name: name,
    colour: colour,
    skin: skinColour,
    tint: tint,
    whitePatchesTint: whitePatchesTint,
    eyeColour: eyeColour,
    eyeColour2: eyeColour2,
    whitePatches: whitePatches,
    points: points,
    vitiligo: vitiligo,
    spritesName: nameToSpritesname[peltName],
    accessory: accessory,
    scars: scar,
    reverse: reverse,

    tortieBase: nameToSpritesname[peltName],
    pattern: tortieMask,
    tortiePattern: nameToSpritesname[tortiePattern],
    tortieColour: tortieColour,
    },
    spriteNumber,
    isDead,
    isDf,
    shading,
    aprilFools,
  ).then(() => {
    const finalCanvas = new OffscreenCanvas(canvasSize, canvasSize);
    const finalCtx = finalCanvas.getContext("2d")!;
    finalCtx.imageSmoothingEnabled = false;

    finalCtx.fillStyle = backgroundColour;
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    finalCtx.scale(scale, scale);
    finalCtx.drawImage(c, 0, 0);
    
    return finalCanvas.convertToBlob();
  }).then((blob) => {
    loaded = true;
    catSprite.src = URL.createObjectURL(blob);

    if (applyURL) {
      const dataURL = getDataURL().toString();
      history.pushState(null, "", dataURL);  
    }
  }).catch((err) => {
    loaded = true;
    catSprite.src = errorImg;
    console.error(err);
  });
}

function randomizeSelected(select: HTMLSelectElement) {
  const options: HTMLOptionsCollection = select.options;
  options.selectedIndex = Math.floor(options.length * Math.random());
}

const randomButtons = document.getElementsByClassName("random-button") as HTMLCollectionOf<HTMLButtonElement>;
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

getElementByUniqueClassName("randomize-all-button")?.addEventListener("click", (e) => {
  e.preventDefault();

  randomizeSelected(spriteNumberSelect);
  randomizeSelected(peltNameSelect);
  randomizeSelected(colourSelect);
  randomizeSelected(tortiePatternSelect);
  randomizeSelected(tortieColourSelect);
  randomizeSelected(tortieMaskSelect);
  if (Math.random() <= 0.5) {
    isTortieCheckbox.checked = true;
  }
  else {
    isTortieCheckbox.checked = false;
  }
  randomizeSelected(tintSelect);
  randomizeSelected(eyeColourSelect);
  if (Math.random() <= 0.5) {
    randomizeSelected(eyeColour2Select);
  }
  else {
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
});

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

addEventListener("popstate", () => {
  applyDataURL();
});

applyDataURL();
