/* 
  Based on generate_sprite() from ClanGen:
  https://github.com/ClanGenOfficial/clangen/blob/09a7c07772c3e33c6941b7a56b8cc5bfa83e316d/scripts/utility.py

  ClanGen source code is licensed under MPL-2.0.
*/

import { Pelt } from "./types";
import tints from "../assets/tints/tint.json";
import whitePatchesTints from "../assets/tints/white_patches_tint.json";
import peltInfo from "../assets/peltInfo.json";

import whitePatchesLittleData from "../assets/data/white_patches_little_sprite_data.json";
import whitePatchesMidData from "../assets/data/white_patches_mid_sprite_data.json";
import whitePatchesMostlyData from "../assets/data/white_patches_mostly_sprite_data.json";
import whitePatchesHighData from "../assets/data/white_patches_high_sprite_data.json";

function getSpritePosition(spriteName: string, spriteNumber: number) {
  return {
    url: `/sprites/split/${spriteName}_${spriteNumber}.png`,
    x: 0,
    y: 0,
  };
}

async function loadImage(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", () => {
      reject(`${url} doesn't seem to exist!`);
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
  const cssTintColour = `rgb(${tint[0]} ${tint[1]} ${tint[2]})`;

  // we only want to tint non-transparent pixels
  // so get version of the tint that's only over those pixels
  const tintOverlay = new OffscreenCanvas(50, 50);
  const tintOverlayContext = tintOverlay.getContext("2d")!;
  tintOverlayContext.drawImage(ctx.canvas, 0, 0);
  tintOverlayContext.globalCompositeOperation = "source-in";
  tintOverlayContext.fillStyle = cssTintColour;
  tintOverlayContext.fillRect(0, 0, 50, 50);

  // tinted version of the image required for the next step
  const tintedLayer = new OffscreenCanvas(50, 50);
  const tintedLayerContext = tintedLayer.getContext("2d")!;
  tintedLayerContext.drawImage(ctx.canvas, 0, 0);
  tintedLayerContext.globalCompositeOperation = blendingMode;
  tintedLayerContext.drawImage(tintOverlay, 0, 0);

  // preserve the existing alpha channel
  // this is necessary because otherwise semi-transparent pixels
  // will get drawn twice
  const compositeOperation = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(tintedLayer, 0, 0);
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

async function drawShading(spriteNumber: number, ctx: any) {
  const offscreen = new OffscreenCanvas(50, 50);
  const offscreenContext = offscreen.getContext("2d");

  if (offscreenContext === null) {
    return;
  }

  offscreenContext.drawImage(ctx.canvas, 0, 0);
  offscreenContext.globalCompositeOperation = "source-in";
  await drawSprite("shader_mask", spriteNumber, offscreenContext);

  const oldCompositeOperation = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(offscreen, 0, 0);
  ctx.globalCompositeOperation = oldCompositeOperation;

  await drawSprite("shader_lighting", spriteNumber, ctx);
}

async function drawMissingScar(
  spriteName: string,
  spriteNumber: number,
  ctx: any,
) {
  const originalCompositeOperation = ctx.globalCompositeOperation;

  // clip canvas to missing scar mask
  // the missing mask goes "under" to not white-out the sprite,
  // so it's destination-in
  ctx.globalCompositeOperation = "destination-in";
  await drawSprite(spriteName, spriteNumber, ctx);

  // "layer" for the lines that go on top
  // have to clip to the canvas to preserve transparency
  const offscreenCanvas = new OffscreenCanvas(50, 50);
  const offscreenContext = offscreenCanvas.getContext("2d")!;
  offscreenContext.drawImage(ctx.canvas, 0, 0);
  offscreenContext.globalCompositeOperation = "source-in";
  await drawSprite(spriteName, spriteNumber, offscreenContext);

  // multiply so the white disappears
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(offscreenCanvas, 0, 0);

  ctx.globalCompositeOperation = originalCompositeOperation;
}

async function drawCat(
  outCanvas: OffscreenCanvas,
  pelt: Pelt,
  catSprite: number,
  dead = false,
  afterlife?: "starclan" | "dark forest" | "unknown residence",
  shading = false,
  aprilFools = false,
) {
  const canvas = new OffscreenCanvas(50, 50);
  const ctx = canvas.getContext("2d");
  const outCtx = outCanvas.getContext("2d");

  if (ctx === null || outCtx == null) {
    return;
  }

  if (pelt.name !== "Tortie" && pelt.name !== "Calico") {
    await drawSprite(`colours_${pelt.spritesName}${pelt.colour}`, catSprite, ctx);
  } else {
    await drawSprite(`colours_${pelt.tortieBase}${pelt.colour}`, catSprite, ctx);

    var tortiePattern;
    if (pelt.tortiePattern == "Single") {
      tortiePattern = "SingleColour";
    } else {
      tortiePattern = pelt.tortiePattern;
    }

    await drawMaskedSprite(
      `colours_${tortiePattern}${pelt.tortieColour}`,
      `patches_tortie${pelt.pattern}`,
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
    const tint = pelt.tint as keyof typeof tints.dilute_tint_colours;
    await drawTint(tints.dilute_tint_colours[tint], "lighter", ctx);
  }

  if (pelt.whitePatches !== undefined) {
    const offscreen = new OffscreenCanvas(50, 50);
    const offscreenContext = offscreen.getContext("2d");

    for (const whitePatchesSpriteData of [whitePatchesLittleData, whitePatchesMidData, whitePatchesMostlyData, whitePatchesHighData]) {
      if (whitePatchesSpriteData.sprite_list.flat().includes(pelt.whitePatches)) {
        await drawSprite(`${whitePatchesSpriteData.spritesheet}${pelt.whitePatches}`, catSprite, offscreenContext);
      }
    }

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
    await drawSprite(`patches_points${pelt.points}`, catSprite, offscreenContext);
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
    await drawSprite(`patches_vitiligo${pelt.vitiligo}`, catSprite, ctx);
  }

  await drawSprite(`eyes${pelt.eyeColour}`, catSprite, ctx);
  if (pelt.eyeColour2 !== undefined) {
    await drawMaskedSprite(`eyes${pelt.eyeColour2}`, "heterochromiamask", catSprite, ctx);
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

  if (!aprilFools) {
    if (dead) {
      if (afterlife == "dark forest") {
        await drawSprite("lineart_df", catSprite, ctx);
      } else if (afterlife == "starclan") {
        await drawSprite("lineart_sc", catSprite, ctx);
      } else if (afterlife == "unknown residence") {
        await drawSprite("lineart_ur", catSprite, ctx);
      }
    } else {
      await drawSprite("lineart", catSprite, ctx);
    }
  } else {
    if (dead) {
      if (afterlife == "dark forest") {
        await drawSprite("aprilfoolslineartdf", catSprite, ctx);
      } else {
        await drawSprite("aprilfoolslineartdead", catSprite, ctx);
      }
    } else {
      await drawSprite("aprilfoolslineart", catSprite, ctx);
    }
  }

  await drawSprite(`skin${pelt.skin}`, catSprite, ctx);

  if (pelt.scars !== undefined) {
    for (const scar of pelt.scars) {
      if (peltInfo.scars2.includes(scar)) {
        await drawMissingScar(`scars_missing_part${scar}`, catSprite, ctx);
      }
    }
  }

  if (pelt.accessory !== undefined) {
    if (peltInfo.plant_accessories.includes(pelt.accessory)) {
      await drawSprite(`acc_plants${pelt.accessory}`, catSprite, ctx);
    } else if (peltInfo.wild_accessories.includes(pelt.accessory)) {
      await drawSprite(`acc_wilds${pelt.accessory}`, catSprite, ctx);
    } else if (peltInfo.collars.includes(pelt.accessory)) {
      await drawSprite(`acc_collars${pelt.accessory}`, catSprite, ctx);
    }
  }

  if (dead) {
    if (afterlife == "starclan") {
      await drawSprite("line_sc_overlay", catSprite, ctx);
    } else if (afterlife == "unknown residence") {
      await drawSprite("line_ur_overlay", catSprite, ctx);
    }
  }

  outCtx.clearRect(0, 0, outCanvas.width, outCanvas.height);
  if (dead) {
    if (afterlife == "unknown residence") {
      await drawSprite("line_ur_underlay", catSprite, ctx);
    }
  }
  if (pelt.reverse) {
    outCtx.scale(-1, 1);
    outCtx.drawImage(canvas, -outCanvas.width, 0);
    outCtx.resetTransform();
  } else {
    outCtx.drawImage(canvas, 0, 0);
  }
}

export default drawCat;
