/* 
  Based on generate_sprite() from ClanGen:
  https://github.com/ClanGenOfficial/clangen/blob/09a7c07772c3e33c6941b7a56b8cc5bfa83e316d/scripts/utility.py

  ClanGen source code is licensed under MPL-2.0.
*/

import { Pelt } from "./types";
import tints from "./assets/tints/tint.json";
import whitePatchesTints from "./assets/tints/white_patches_tint.json";
import peltInfo from "./assets/peltInfo.json";
import spritesIndex from "./assets/spritesIndex.json";
import spriteNumbers from "./assets/spritesOffsetMap.json";

function getSpritePosition(spriteName: string, spriteNumber: number) {
  const spriteKey = spriteName as keyof typeof spritesIndex;
  const spriteXPosition = spriteNumbers[spriteNumber].x;
  const spriteYPosition = spriteNumbers[spriteNumber].y;

  return {
    url: `./sprites/${spritesIndex[spriteKey].spritesheet}.png`,
    x: spritesIndex[spriteKey].xOffset + 50 * spriteXPosition,
    y: spritesIndex[spriteKey].yOffset + 50 * spriteYPosition,
  };
}

async function loadImage(url: string) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    img.addEventListener("load", () => {
      resolve(img);
    });
  });
}

async function drawSprite(spriteName: string, spriteNumber: number, ctx: any) {
  const spritePosition = getSpritePosition(spriteName, spriteNumber);

  const img = await loadImage(spritePosition.url);
  ctx.drawImage(img, spritePosition.x, spritePosition.y, 50, 50, 0, 0, 50, 50);
}

async function drawTint(
  tint: number[] | null,
  blendingMode: "multiply" | "lighter",
  ctx: any,
) {
  if (tint === null) {
    return;
  }
  const compositeOperation = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = blendingMode;

  const hexTint = `#${tint[0].toString(16)}${tint[1].toString(16)}${tint[2].toString(16)}`;

  const offscreen = new OffscreenCanvas(50, 50);
  const offscreenContext = offscreen.getContext("2d");

  if (offscreenContext !== null) {
    const imageData = ctx.getImageData(0, 0, 50, 50);
    offscreenContext.putImageData(imageData, 0, 0);
    offscreenContext.globalCompositeOperation = "source-in";
    offscreenContext.fillStyle = hexTint;
    offscreenContext.fillRect(0, 0, 50, 50);
  }
  ctx.drawImage(offscreen, 0, 0);

  ctx.globalCompositeOperation = compositeOperation;
}

async function drawMaskedSprite(
  spriteName: string,
  maskSpriteName: string,
  spriteNumber: number,
  ctx: any,
) {
  const offscreen = new OffscreenCanvas(50, 50);
  const offscreenContext = offscreen.getContext("2d");

  if (offscreenContext !== null) {
    await drawSprite(maskSpriteName, spriteNumber, offscreenContext);
    offscreenContext.globalCompositeOperation = "source-in";
    await drawSprite(spriteName, spriteNumber, offscreenContext);

    ctx.drawImage(offscreen, 0, 0);
  }
}

async function drawShading(
  spriteNumber: number,
  ctx: any
) {

  const offscreen = new OffscreenCanvas(50, 50);
  const offscreenContext = offscreen.getContext("2d");

  if (offscreenContext === null) {
    return;
  }

  const imageData = ctx.getImageData(0, 0, 50, 50);
  offscreenContext.putImageData(imageData, 0, 0);
  offscreenContext.globalCompositeOperation = "source-in";
  await drawSprite("shaders", spriteNumber, offscreenContext);

  const oldCompositeOperation = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(offscreen, 0, 0);
  ctx.globalCompositeOperation = oldCompositeOperation;

  await drawSprite("lighting", spriteNumber, ctx);
}

async function drawCat(
  outCanvas: OffscreenCanvas,
  pelt: Pelt,
  catSprite: number,
  dead = false,
  darkForest = false,
  shading = false,
) {
  const canvas = new OffscreenCanvas(50, 50);
  const ctx = canvas.getContext("2d");
  const outCtx = outCanvas.getContext("2d");

  if (ctx === null || outCtx == null) {
    return;
  }

  if (pelt.name !== "Tortie" && pelt.name !== "Calico") {
    await drawSprite(`${pelt.spritesName}${pelt.colour}`, catSprite, ctx);
  } else {
    await drawSprite(`${pelt.tortieBase}${pelt.colour}`, catSprite, ctx);

    var tortiePattern;
    if (pelt.tortiePattern == "Single") {
      tortiePattern = "SingleColour";
    } else {
      tortiePattern = pelt.tortiePattern;
    }

    await drawMaskedSprite(
      `${tortiePattern}${pelt.tortieColour}`,
      `tortiemask${pelt.pattern}`,
      catSprite,
      ctx,
    );
  }

  if (
    pelt.tint !== "none" &&
    Object.keys(tints.tint_colours).includes(pelt.tint)
  ) {
    const tint = pelt.tint as keyof typeof tints.tint_colours;
    await drawTint(tints.tint_colours[tint], "multiply", ctx);
  }
  if (
    pelt.tint !== "none" &&
    Object.keys(tints.dilute_tint_colours).includes(pelt.tint)
  ) {
    const tint = pelt.tint as keyof typeof tints.tint_colours;
    await drawTint(tints.tint_colours[tint], "lighter", ctx);
  }

  if (pelt.whitePatches !== undefined) {
    const offscreen = new OffscreenCanvas(50, 50);
    const offscreenContext = offscreen.getContext("2d");
    await drawSprite(
      `white${pelt.whitePatches}`,
      catSprite,
      offscreenContext,
    );
    if (
      pelt.whitePatchesTint !== "none" &&
      Object.keys(whitePatchesTints.tint_colours).includes(
        pelt.whitePatchesTint,
      )
    ) {
      const tint =
        pelt.whitePatchesTint as keyof typeof whitePatchesTints.tint_colours;
      await drawTint(
        whitePatchesTints.tint_colours[tint],
        "multiply",
        offscreenContext,
      );
    }
    ctx.drawImage(offscreen, 0, 0);
  }
  if (pelt.points !== undefined) {
    const offscreen = new OffscreenCanvas(50, 50);
    const offscreenContext = offscreen.getContext("2d");
    await drawSprite(`white${pelt.points}`, catSprite, offscreenContext);
    if (
      pelt.whitePatchesTint !== "none" &&
      Object.keys(whitePatchesTints.tint_colours).includes(
        pelt.whitePatchesTint,
      )
    ) {
      const tint =
        pelt.whitePatchesTint as keyof typeof whitePatchesTints.tint_colours;
      await drawTint(
        whitePatchesTints.tint_colours[tint],
        "multiply",
        offscreenContext,
      );
    }
    ctx.drawImage(offscreen, 0, 0);
  }
  if (pelt.vitiligo !== undefined) {
    await drawSprite(`white${pelt.vitiligo}`, catSprite, ctx);
  }

  await drawSprite(`eyes${pelt.eyeColour}`, catSprite, ctx);
  if (pelt.eyeColour2 !== undefined) {
    await drawSprite(`eyes2${pelt.eyeColour2}`, catSprite, ctx);
  }

  if (pelt.scars !== undefined) {
    for (const scar of pelt.scars) {
      if (peltInfo.scars1.includes(scar)) {
        await drawSprite(`scars${scar}`, catSprite, ctx);
      }
      if (peltInfo.scars3.includes(scar)) {
        await drawSprite(`scars${scar}`, catSprite, ctx);
      }
    }
  }

  if (shading) {
    await drawShading(catSprite, ctx);
  }

  if (dead) {
    if (darkForest) {
      await drawSprite("lineartdf", catSprite, ctx);
    } else {
      await drawSprite("lineartdead", catSprite, ctx);
    }
  } else {
    await drawSprite("lines", catSprite, ctx);
  }

  await drawSprite(`skin${pelt.skin}`, catSprite, ctx);

  if (pelt.accessory !== undefined) {
    if (peltInfo.plant_accessories.includes(pelt.accessory)) {
      await drawSprite(`acc_herbs${pelt.accessory}`, catSprite, ctx);
    } else if (peltInfo.wild_accessories.includes(pelt.accessory)) {
      await drawSprite(`acc_wild${pelt.accessory}`, catSprite, ctx);
    } else if (peltInfo.collars.includes(pelt.accessory)) {
      await drawSprite(`collars${pelt.accessory}`, catSprite, ctx);
    }
  }

  outCtx.clearRect(0, 0, outCanvas.width, outCanvas.height);
  if (pelt.reverse) {
    outCtx.scale(-1, 1);
    outCtx.drawImage(canvas, -outCanvas.width, 0);
  } else {
    outCtx.drawImage(canvas, 0, 0);
  }
}

export default drawCat;
