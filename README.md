# Pixel Cat Maker

Dollmaker that uses sprites from ClanGen.

## Dev Requirements

- Node.js
- Git LFS

## Dev Instructions

### Running and Building from Source

```
git clone https://github.com/cgen-tools/pixel-cat-maker.git
npm install
```

To run the dev server:

```
npm run dev
```

To build:

```
npm run build
```

The site will be in the `dist` folder. Note that the built site won't run locally without a development server due to browser security policies. However, you should be able to upload it to [neocities](https://neocities.org) or any other static hosting site without a problem.

### Updating JSON Files

Unlike with ClanGen, even if you're just modifying the JSON files, you have to build from source. You _cannot_ (easily) modify the JSON files from the built site because the JSON data is transformed into Javascript objects during the build process for optimization.

JSON files only affect the _sprite renderer_ (i.e. the code that draws the sprite to the screen). They do not affect the options available on the website. To change the website, you must modify `index.json` and/or `src/main.ts`.

#### spritesIndex.json:

This file maps sprite group names to their spritesheet file and pixel offset. This allows you to use ClanGen-compatible spritesheets without modification, but it requires some preprocessing if you're adding any new sprites.

Currently, the simplest way to update this file is to modify ClanGen's `make_group()` function in `sprites.py`, then run the game normally (I'm sorry). Here's a quick example:

```py
#scripts/cat/sprites.py

def make_group(...):
  group_x_ofs = pos[0] * sprites_x * self.size
  group_y_ofs = pos[1] * sprites_y * self.size

  if not no_index:
      # You should set self.group_info = {} in the constructor
      self.group_info[name] = {
          "spritesheet": spritesheet,
          "xOffset": group_x_ofs,
          "yOffset": group_y_ofs
      }

# Later, write self.group_info to a JSON file
# This file will be spritesIndex.json
```

#### white_patches_tint.json and tint.json

These are the same as the files that can be found in ClanGen under `sprites/dicts`. They're necessary because they define the exact tint colours and blending modes.

You should only replace these files if you added or changed any tints.

#### spritesOffsetMap.json

This file is used to map sprite numbers to their x and y offset in the sprite group.

You probably do not have to touch this.

#### peltInfo.json

This represents various data that's necessary to retrieve the correct sprite group.

Mostly, it specifies accessory types and scar type. If you added any new scars and accessories, you have to put them here as well. Otherwise, the site won't be able to find them.

## License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

## Credits

* All images in the `public/sprites` folder are by the ClanGen Team and are licensed under 
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).
* Some code (particularly the sprite drawing code in `src/drawCat.ts` and all its imports) is based on or derived from [ClanGen](https://github.com/ClanGenOfficial/clangen) which is licensed under MPL-2.0.
