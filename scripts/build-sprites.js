/*
  Splits the spritesheets according to the JSON file.

  It has to generate several thousand files, so it's a little slow.
*/

import sharp from "sharp";
import fs from "node:fs";

const OUTPUT_DIR = "public/sprites/split";

// clear out folder
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true });
}
fs.mkdirSync(OUTPUT_DIR);

import spritesIndex from "../src/assets/spritesIndex.json" with { type: "json" };
import poseSpriteData from "../src/assets/pose_sprite_data.json" with { type: "json" };

const numSpritesx = poseSpriteData.sheet_layout[0];
const numSpritesy = poseSpriteData.sheet_layout[1];

const spriteNumbers = [];
for (let row = 0; row < numSpritesy; row++) {
  for (let col = 0; col < numSpritesx; col++) {
    spriteNumbers.push({x: col, y: row});
  }
}

// group by spritesheet so we aren't constantly opening spritesheets
const batch = {};
for (const [spriteGroupName, spriteGroupInfo] of Object.entries(spritesIndex)) {
  if (batch[spriteGroupInfo.spritesheet] === undefined) {
    batch[spriteGroupInfo.spritesheet] = {};
  }
  batch[spriteGroupInfo.spritesheet][spriteGroupName] = spriteGroupInfo;
}

// by spritesheet
for (const [spritesheet, info] of Object.entries(batch)) {
  const spritesheetImage = fs.readFileSync(`public/sprites/${spritesheet}.png`);
  for (const [spriteGroupName, spriteGroupInfo] of Object.entries(info)) {
    for (const [spriteNumber, spriteNumberInfo] of Object.entries(spriteNumbers)) {
      const spriteXPosition = spriteNumberInfo.x;
      const spriteYPosition = spriteNumberInfo.y;

      let extractedImage = sharp(spritesheetImage)
      .extract({
        left: spriteGroupInfo.xOffset + 50 * spriteXPosition,
        top: spriteGroupInfo.yOffset + 50 * spriteYPosition,
        width: 50,
        height: 50,
      })

      if (spritesheet === "acc_collars") {
        // putImageData is lossy if there are any transparent pixels,
        // so we have to remove all of them or recolouring will fail.
        //
        // since we're going through every pixel anyway, we'll just turn
        // all the white pixels transparent when drawing
        extractedImage
        .removeAlpha()
        .toFile(`${OUTPUT_DIR}/${spriteGroupName}_${spriteNumber}.png`);
      } else { // spritesheet !== "acc_collars"
        extractedImage
        .toFile(`${OUTPUT_DIR}/${spriteGroupName}_${spriteNumber}.png`);
      }
    }
  }
}
