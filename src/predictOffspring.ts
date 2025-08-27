import './predictOffspring.css'
import { generateChildPelt } from "./library/inheritance";
import CatData from "./library/CatData";
import drawCat from "./library/drawCat";
import { Pelt } from "./library/types";

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
var parent1Pelt: Pelt;
var parent2Pelt: Pelt;

const regenerateButton = document.getElementById(
  "regenerate-button",
) as HTMLButtonElement;

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

parent1URLInput.addEventListener("input", (e: any) => {
  refreshParent1(e.target.value)
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
  refreshParent2( e.target.value)
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
  for (var i = 0; i < 6; i++) {
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

    drawCat(offscreenCanvas, catData.getPelt(), catData.spriteNumber).then(() => {
      context.imageSmoothingEnabled = false;
      context.scale(2, 2);
      context.drawImage(offscreenCanvas, 0, 0);

      link.append(can);
      d.appendChild(link);
    });
  }
});
