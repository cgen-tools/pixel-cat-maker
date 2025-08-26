import { generateChildPelt } from "./inheritance";
import CatData from "./CatData";
import drawCat from "./drawCat";
import { Pelt } from "./types";

const parent1Canvas = document.getElementById(
  "parent1",
) as unknown as OffscreenCanvas;
const parent2Canvas = document.getElementById(
  "parent2",
) as unknown as OffscreenCanvas;

const parent1URLInput = document.getElementById(
  "parent1-url",
) as HTMLSelectElement;
const parent2URLInput = document.getElementById(
  "parent2-url",
) as HTMLSelectElement;
var parent1Pelt: Pelt;
var parent2Pelt: Pelt;

const regenerateButton = document.getElementById(
  "regenerate-button",
) as HTMLButtonElement;

parent1URLInput.addEventListener("input", (e: any) => {
  const parent1URL = e.target.value;
  const parent1Data = CatData.fromURL(parent1URL);
  parent1Pelt = parent1Data.getPelt();
  drawCat(parent1Canvas, parent1Pelt, parent1Data.spriteNumber);
});

parent2URLInput.addEventListener("input", (e: any) => {
  const parent2URL = e.target.value;
  const parent2Data = CatData.fromURL(parent2URL);
  parent2Pelt = parent2Data.getPelt();
  drawCat(parent2Canvas, parent2Pelt, parent2Data.spriteNumber);
});

regenerateButton.addEventListener("click", async () => {
  const d = document.getElementById("offspring");
  d!.innerHTML = "";
  for (var i = 0; i < 100; i++) {
    const defaultKit = generateChildPelt([parent1Pelt, parent2Pelt]);
    const catData = CatData.fromPelt(defaultKit);
    catData.spriteNumber = [0, 1, 2][Math.floor(Math.random() * 3)];

    const link = document.createElement("a");
    link.href = catData
      .getURL("https://cgen-tools.github.io/pixel-cat-maker/")
      .toString();
    link.target = "_blank";

    const offscreenCanvas = new OffscreenCanvas(50, 50);

    const can = document.createElement("canvas") as HTMLCanvasElement;
    can.width = 50;
    can.height = 50;
    can.style.imageRendering = "pixelated";
    const context = can.getContext("2d");

    await drawCat(offscreenCanvas, defaultKit, catData.spriteNumber);
    context?.drawImage(offscreenCanvas, 0, 0);

    link.append(can);
    d?.appendChild(link);
  }
});
