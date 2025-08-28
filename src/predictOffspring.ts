import "./common.css";
import "./predictOffspring.css";
import { generateChildPelt } from "./library/inheritance";
import CatData from "./library/CatData";
import drawCat from "./library/drawCat";
import { Pelt } from "./library/types";

// HTML Elements
const parent1Div = document.getElementById("parent1");
const parent2Div = document.getElementById("parent2");
const parent1Canvas = document.getElementById(
  "parent1-canvas",
) as unknown as OffscreenCanvas;
const parent2Canvas = document.getElementById(
  "parent2-canvas",
) as unknown as OffscreenCanvas;
const parent1URLInput = document.getElementById(
  "parent1-url",
) as HTMLInputElement;
const parent2URLInput = document.getElementById(
  "parent2-url",
) as HTMLInputElement;
const regenerateButton = document.getElementById(
  "regenerate-button",
) as HTMLButtonElement;
const amountInput = document.getElementById("amount-input") as HTMLInputElement;

// Global constants
const fanSubmittedParents = [
  "https://cgen-tools.github.io/pixel-cat-maker/?shading=true&reverse=true&isTortie=false&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=ONE&tortieColour=BLACK&tortiePattern=Classic&peltName=Speckled&spriteNumber=6&colour=BLACK&tint=pink&skinColour=PEACH&eyeColour=YELLOW&eyeColour2=&whitePatches=&points=&whitePatchesTint=&vitiligo=&accessory=HOLLY&scar=&version=v1",
  "https://cgen-tools.github.io/pixel-cat-maker/?shading=true&reverse=true&isTortie=false&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=HEARTBEAT&tortieColour=DARKGREY&tortiePattern=Tabby&peltName=Agouti&spriteNumber=7&colour=WHITE&tint=red&skinColour=BROWN&eyeColour=PALEYELLOW&eyeColour2=&whitePatches=&points=&whitePatchesTint=&vitiligo=&accessory=&scar=&version=v1",
  "https://cgen-tools.github.io/pixel-cat-maker/?shading=true&reverse=false&isTortie=false&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=HEARTBEAT&tortieColour=DARKGREY&tortiePattern=Tabby&peltName=Sokoke&spriteNumber=15&colour=GOLDEN-BROWN&tint=pink&skinColour=GREY&eyeColour=BRONZE&eyeColour2=&whitePatches=SAMMY&points=&whitePatchesTint=cream&vitiligo=&accessory=&scar=&version=v1",
  "https://cgen-tools.github.io/pixel-cat-maker/?shading=true&reverse=false&isTortie=false&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=HEARTBEAT&tortieColour=DARKGREY&tortiePattern=Tabby&peltName=Mackerel&spriteNumber=8&colour=LILAC&tint=red&skinColour=LIGHTMARBLED&eyeColour=PALEYELLOW&eyeColour2=&whitePatches=FRONT&points=&whitePatchesTint=cream&vitiligo=&accessory=&scar=&version=v1",
  "https://cgen-tools.github.io/pixel-cat-maker/?shading=false&reverse=true&isTortie=false&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=HEARTBEAT&tortieColour=DARKGREY&tortiePattern=Tabby&peltName=Bengal&spriteNumber=9&colour=GHOST&tint=black&skinColour=DARKBLUE&eyeColour=DARKBLUE&eyeColour2=&whitePatches=&points=&whitePatchesTint=&vitiligo=&accessory=&scar=&version=v1",
  "https://cgen-tools.github.io/pixel-cat-maker/?shading=false&reverse=true&isTortie=false&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=HEARTBEAT&tortieColour=DARKGREY&tortiePattern=Tabby&peltName=Ticked&spriteNumber=7&colour=CREAM&tint=red&skinColour=PEACH&eyeColour=YELLOW&eyeColour2=&whitePatches=MASKMANTLE&points=&whitePatchesTint=cream&vitiligo=&accessory=&scar=&version=v1",
  "https://cgen-tools.github.io/pixel-cat-maker/?shading=false&reverse=true&isTortie=true&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=HEARTBEAT&tortieColour=DARKGREY&tortiePattern=Tabby&peltName=Classic&spriteNumber=6&colour=DARKGINGER&tint=orange&skinColour=BROWN&eyeColour=COBALT&eyeColour2=&whitePatches=HALFWHITE&points=&whitePatchesTint=pink&vitiligo=&accessory=&scar=&version=v1",
];

// Global vars
var parent1Pelt: Pelt;
var parent2Pelt: Pelt;

// Helper functions
function refreshParent1(parent1URL: string) {
  const parent1Data = CatData.fromURL(parent1URL);
  parent1Pelt = parent1Data.getPelt();
  drawCat(parent1Canvas, parent1Pelt, parent1Data.spriteNumber);
}

function refreshParent2(parent2URL: string) {
  const parent2Data = CatData.fromURL(parent2URL);
  parent2Pelt = parent2Data.getPelt();
  drawCat(parent2Canvas, parent2Pelt, parent2Data.spriteNumber);
}

// Event listener functions
parent1URLInput.addEventListener("input", (e: any) => {
  refreshParent1(e.target.value);
});
parent1Div?.addEventListener("dragover", (ev) => {
  ev.preventDefault();
  ev.dataTransfer!.dropEffect = "copy";
});
parent1Div?.addEventListener("drop", (ev) => {
  ev.preventDefault();
  const data = ev.dataTransfer?.getData("text/plain")!;
  parent1URLInput.value = data;
  refreshParent1(data);
});

parent2URLInput.addEventListener("input", (e: any) => {
  refreshParent2(e.target.value);
});
parent2Div?.addEventListener("dragover", (ev) => {
  ev.preventDefault();
  ev.dataTransfer!.dropEffect = "copy";
});
parent2Div?.addEventListener("drop", (ev) => {
  ev.preventDefault();
  const data = ev.dataTransfer?.getData("text/plain")!;
  parent2URLInput.value = data;
  refreshParent2(data);
});

regenerateButton.addEventListener("click", async () => {
  const d = document.getElementById("offspring")!;
  d.replaceChildren();

  const stringAmount = amountInput.value;
  var numberAmount = Number(stringAmount);
  const minAmount = Number(amountInput.min);
  const maxAmount = Number(amountInput.max);

  if (isNaN(numberAmount)) {
    amountInput.value = "1";
    numberAmount = 1;
  }
  if (numberAmount < minAmount) {
    amountInput.value = amountInput.min;
    numberAmount = minAmount;
  }
  if (numberAmount > maxAmount) {
    amountInput.value = amountInput.max;
    numberAmount = maxAmount;
  }

  for (var i = 0; i < numberAmount; i++) {
    const defaultKit = generateChildPelt([parent1Pelt, parent2Pelt]);
    const catData = CatData.fromPelt(defaultKit);
    catData.spriteNumber = [0, 1, 2][Math.floor(Math.random() * 3)];

    const link = document.createElement("a");
    link.href = catData
      .getURL("https://cgen-tools.github.io/pixel-cat-maker/")
      .toString();
    link.target = "_blank";
    link.className = "cat-link";
    link.draggable = true;
    link.addEventListener("dragstart", (ev) => {
      ev.dataTransfer?.setData("text/plain", link.href);
    });

    const offscreenCanvas = new OffscreenCanvas(50, 50);

    const can = document.createElement("canvas") as HTMLCanvasElement;
    can.width = 100;
    can.height = 100;
    can.style.imageRendering = "pixelated";
    const context = can.getContext("2d")!;
    link.append(can);
    d.appendChild(link);

    drawCat(offscreenCanvas, catData.getPelt(), catData.spriteNumber)
      .then(() => {
        context.imageSmoothingEnabled = false;
        context.scale(2, 2);
        context.drawImage(offscreenCanvas, 0, 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

// Startup code
const randomParent1 = fanSubmittedParents.splice(
  Math.floor(Math.random() * fanSubmittedParents.length),
  1,
)[0];
parent1URLInput.value = randomParent1;
refreshParent1(randomParent1);

const randomParent2 =
  fanSubmittedParents[Math.floor(Math.random() * fanSubmittedParents.length)];
parent2URLInput.value = randomParent2;
refreshParent2(randomParent2);
