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

const spritesIndex = JSON.parse(fs.readFileSync("src/assets/spritesIndex.json"));
const spriteNumbers = JSON.parse(fs.readFileSync("src/assets/spritesOffsetMap.json"));

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

      sharp(spritesheetImage)
      .extract({
        left: spriteGroupInfo.xOffset + 50 * spriteXPosition,
        top: spriteGroupInfo.yOffset + 50 * spriteYPosition,
        width: 50,
        height: 50,
      })
      .toFile(`${OUTPUT_DIR}/${spriteGroupName}_${spriteNumber}.png`);
    }
  }
}
