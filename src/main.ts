import './style.css'
import drawCat from './drawCat';

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

const catSprite = document.getElementById("cat-sprite-img") as HTMLImageElement;

const spriteNumberSelect = document.getElementById("sprite-no-select") as HTMLSelectElement;
const peltNameSelect = document.getElementById("pelt-name-select") as HTMLSelectElement;
const colourSelect = document.getElementById("colour-select") as HTMLSelectElement;
const tintSelect = document.getElementById("tint-select") as HTMLSelectElement;
const skinColourSelect = document.getElementById("skin-colour-select") as HTMLSelectElement;
const eyeColourSelect = document.getElementById("eye-colour-select") as HTMLSelectElement;
const eyeColour2Select = document.getElementById("eye-colour2-select") as HTMLSelectElement;
const accessorySelect = document.getElementById("accessory-select") as HTMLSelectElement;
const scarSelect = document.getElementById("scar-select") as HTMLSelectElement;

const whitePatchesSelect = document.getElementById("white-patches-select") as HTMLSelectElement;
const pointsSelect = document.getElementById("points-select") as HTMLSelectElement;
const whitePatchesTintSelect = document.getElementById("white-patches-tint-select") as HTMLSelectElement;
const vitiligoSelect = document.getElementById("vitiligo-select") as HTMLSelectElement;

const tortieMaskSelect = document.getElementById("tortie-mask-select") as HTMLSelectElement;
const tortieColourSelect = document.getElementById("tortie-colour-select") as HTMLSelectElement;
const tortiePatternSelect = document.getElementById("tortie-pattern-select") as HTMLSelectElement;

const lineartSelect = document.getElementById("lineart-select") as HTMLSelectElement;

const isTortieCheckbox = document.getElementById("tortie-checkbox") as HTMLInputElement;
const shadingCheckbox = document.getElementById("shading-checkbox") as HTMLInputElement;
const reverseCheckbox = document.getElementById("reverse-checkbox") as HTMLInputElement;

const backgroundColourSelect = document.getElementById("bg-color-select") as HTMLSelectElement;

const scaleSelect = document.getElementById("zoom-level") as HTMLSelectElement;

function redrawCat() {
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

  var isDead: boolean = false;
  var isDf: boolean = false;
  if (lineartSelect.value === "regular") {
    isDead = false;
    isDf = false;
  } else if (lineartSelect.value === "dead") {
    isDead = true;
    isDf = false;
  } else if (lineartSelect.value === "dark forest") {
    isDead = true;
    isDf = true;
  }

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
  ).then(() => {
    const scale = Number(scaleSelect.value);
    const canvasSize = scale * 50;
    const finalCanvas = new OffscreenCanvas(canvasSize, canvasSize);
    const finalCtx = finalCanvas.getContext("2d")!;
    finalCtx.imageSmoothingEnabled = false;

    finalCtx.fillStyle = backgroundColour;
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    finalCtx.scale(scale, scale);
    finalCtx.drawImage(c, 0, 0);
    
    return finalCanvas.convertToBlob();
  }).then((blob) => {
    catSprite.src = URL.createObjectURL(blob);
  }).catch((err) => {
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
    const select = document.getElementById(selectId) as HTMLSelectElement;
    randomizeSelected(select);
    redrawCat();
  });
}

isTortieCheckbox.addEventListener("change", () => {
  if (isTortieCheckbox.checked) {
    tortieColourSelect.disabled = false;
    tortieMaskSelect.disabled = false;
    tortiePatternSelect.disabled = false;
  } else {
    tortieColourSelect.disabled = true;
    tortieMaskSelect.disabled = true;
    tortiePatternSelect.disabled = true;
  }
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

document.getElementById("randomize-all-button")?.addEventListener("click", (e) => {
  e.preventDefault();

  randomizeSelected(spriteNumberSelect);
  randomizeSelected(peltNameSelect);
  randomizeSelected(colourSelect);
  randomizeSelected(tortiePatternSelect);
  randomizeSelected(tortieColourSelect);
  randomizeSelected(tortieMaskSelect);
  if (Math.random() <= 0.5) {
    isTortieCheckbox.checked = true;
    
    tortieColourSelect.disabled = false;
    tortieMaskSelect.disabled = false;
    tortiePatternSelect.disabled = false;
  }
  else {
    isTortieCheckbox.checked = false;

    tortieColourSelect.disabled = true;
    tortieMaskSelect.disabled = true;
    tortiePatternSelect.disabled = true;
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
})

redrawCat();
