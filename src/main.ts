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

const c = new OffscreenCanvas(50, 50);

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

const isTortieCheckbox = document.getElementById("tortie-checkbox") as HTMLInputElement;
const shadingCheckbox = document.getElementById("shading-checkbox") as HTMLInputElement;

function redrawCat() {
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, c.width, c.height);
  }

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

  // we have to keep the original name (which is peltName) for spritesName,
  // but we have to also tell "name" in Pelt that it's a tortie if it's a tortie
  var name;
  if (isTortieCheckbox.checked) {
    name = "Tortie";
  } else {
    name = peltName;
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
    reverse: false,

    tortieBase: nameToSpritesname[peltName],
    pattern: tortieMask,
    tortiePattern: nameToSpritesname[tortiePattern],
    tortieColour: tortieColour,
    },
    spriteNumber,
    undefined,
    undefined,
    shading,
  ).then(() => {
    return c.convertToBlob()
  }).then((blob) => {
    catSprite.src = URL.createObjectURL(blob);
  }).catch((err) => {
    console.error(err);
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
shadingCheckbox.addEventListener("change", () => redrawCat());

redrawCat();
