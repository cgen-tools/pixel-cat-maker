/* 
  Based on pelts.py from ClanGen:
  https://github.com/ClanGenOfficial/clangen/blob/09a7c07772c3e33c6941b7a56b8cc5bfa83e316d/scripts/cat/pelts.py

  ClanGen source code is licensed under MPL-2.0.
*/

import { Pelt } from "./types";

const skin_sprites = [
  "BLACK",
  "PINK",
  "DARKBROWN",
  "BROWN",
  "LIGHTBROWN",
  "DARK",
  "DARKGREY",
  "GREY",
  "DARKSALMON",
  "SALMON",
  "PEACH",
  "DARKMARBLED",
  "MARBLED",
  "LIGHTMARBLED",
  "DARKBLUE",
  "BLUE",
  "LIGHTBLUE",
  "RED",
];

const pelt_colours = [
  "WHITE",
  "PALEGREY",
  "SILVER",
  "GREY",
  "DARKGREY",
  "GHOST",
  "BLACK",
  "CREAM",
  "PALEGINGER",
  "GOLDEN",
  "GINGER",
  "DARKGINGER",
  "SIENNA",
  "LIGHTBROWN",
  "LILAC",
  "BROWN",
  "GOLDEN-BROWN",
  "DARKBROWN",
  "CHOCOLATE",
];

const tortiepatterns = [
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "REDTAIL",
  "DELILAH",
  "MINIMALONE",
  "MINIMALTWO",
  "MINIMALTHREE",
  "MINIMALFOUR",
  "HALF",
  "OREO",
  "SWOOP",
  "MOTTLED",
  "SIDEMASK",
  "EYEDOT",
  "BANDANA",
  "PACMAN",
  "STREAMSTRIKE",
  "ORIOLE",
  "CHIMERA",
  "DAUB",
  "EMBER",
  "BLANKET",
  "ROBIN",
  "BRINDLE",
  "PAIGE",
  "ROSETAIL",
  "SAFI",
  "SMUDGED",
  "DAPPLENIGHT",
  "STREAK",
  "MASK",
  "CHEST",
  "ARMTAIL",
  "SMOKE",
  "GRUMPYFACE",
  "BRIE",
  "BELOVED",
  "BODY",
  "SHILOH",
  "FRECKLED",
  "HEARTBEAT",
];
const tortiebases = [
  "single",
  "tabby",
  "bengal",
  "marbled",
  "ticked",
  "smoke",
  "rosette",
  "speckled",
  "mackerel",
  "classic",
  "sokoke",
  "agouti",
  "singlestripe",
  "masked",
];

const eye_colours = [
  "YELLOW",
  "AMBER",
  "HAZEL",
  "PALEGREEN",
  "GREEN",
  "BLUE",
  "DARKBLUE",
  "GREY",
  "CYAN",
  "EMERALD",
  "PALEBLUE",
  "PALEYELLOW",
  "GOLD",
  "HEATHERBLUE",
  "COPPER",
  "SAGE",
  "COBALT",
  "SUNLITICE",
  "GREENYELLOW",
  "BRONZE",
  "SILVER",
];
const yellow_eyes = [
  "YELLOW",
  "AMBER",
  "PALEYELLOW",
  "GOLD",
  "COPPER",
  "GREENYELLOW",
  "BRONZE",
  "SILVER",
];
const blue_eyes = [
  "BLUE",
  "DARKBLUE",
  "CYAN",
  "PALEBLUE",
  "HEATHERBLUE",
  "COBALT",
  "SUNLITICE",
  "GREY",
];
const green_eyes = ["PALEGREEN", "GREEN", "EMERALD", "SAGE", "HAZEL"];
const tabbies = ["Tabby", "Ticked", "Mackerel", "Classic", "Sokoke", "Agouti"];
const spotted = ["Speckled", "Rosette"];
const plain = ["SingleColour", "TwoColour", "Smoke", "Singlestripe"];
const exotic = ["Bengal", "Marbled", "Masked"];
const torties = ["Tortie", "Calico"];
const pelt_categories = [tabbies, spotted, plain, exotic, torties];

const ginger_colours = [
  "CREAM",
  "PALEGINGER",
  "GOLDEN",
  "GINGER",
  "DARKGINGER",
  "SIENNA",
];
const black_colours = ["GREY", "DARKGREY", "GHOST", "BLACK"];
const white_colours = ["WHITE", "PALEGREY", "SILVER"];
const brown_colours = [
  "LIGHTBROWN",
  "LILAC",
  "BROWN",
  "GOLDEN-BROWN",
  "DARKBROWN",
  "CHOCOLATE",
];
const colour_categories = [
  ginger_colours,
  black_colours,
  white_colours,
  brown_colours,
];
const little_white = [
  "LITTLE",
  "LIGHTTUXEDO",
  "BUZZARDFANG",
  "TIP",
  "BLAZE",
  "BIB",
  "VEE",
  "PAWS",
  "BELLY",
  "TAILTIP",
  "TOES",
  "BROKENBLAZE",
  "LILTWO",
  "SCOURGE",
  "TOESTAIL",
  "RAVENPAW",
  "HONEY",
  "LUNA",
  "EXTRA",
  "MUSTACHE",
  "REVERSEHEART",
  "SPARKLE",
  "RIGHTEAR",
  "LEFTEAR",
  "ESTRELLA",
  "REVERSEEYE",
  "BACKSPOT",
  "EYEBAGS",
  "LOCKET",
  "BLAZEMASK",
  "TEARS",
];
const mid_white = [
  "TUXEDO",
  "FANCY",
  "UNDERS",
  "DAMIEN",
  "SKUNK",
  "MITAINE",
  "SQUEAKS",
  "STAR",
  "WINGS",
  "DIVA",
  "SAVANNAH",
  "FADESPOTS",
  "BEARD",
  "DAPPLEPAW",
  "TOPCOVER",
  "WOODPECKER",
  "MISS",
  "BOWTIE",
  "VEST",
  "FADEBELLY",
  "DIGIT",
  "FCTWO",
  "FCONE",
  "MIA",
  "ROSINA",
  "PRINCESS",
  "DOUGIE",
];
const high_white = [
  "ANY",
  "ANYTWO",
  "BROKEN",
  "FRECKLES",
  "RINGTAIL",
  "HALFFACE",
  "PANTSTWO",
  "GOATEE",
  "PRINCE",
  "FAROFA",
  "MISTER",
  "PANTS",
  "REVERSEPANTS",
  "HALFWHITE",
  "APPALOOSA",
  "PIEBALD",
  "CURVED",
  "GLASS",
  "MASKMANTLE",
  "MAO",
  "PAINTED",
  "SHIBAINU",
  "OWL",
  "BUB",
  "SPARROW",
  "TRIXIE",
  "SAMMY",
  "FRONT",
  "BLOSSOMSTEP",
  "BULLSEYE",
  "FINN",
  "SCAR",
  "BUSTER",
  "HAWKBLAZE",
  "CAKE",
];
const mostly_white = [
  "VAN",
  "ONEEAR",
  "LIGHTSONG",
  "TAIL",
  "HEART",
  "MOORISH",
  "APRON",
  "CAPSADDLE",
  "CHESTSPECK",
  "BLACKSTAR",
  "PETAL",
  "HEARTTWO",
  "PEBBLESHINE",
  "BOOTS",
  "COW",
  "COWTWO",
  "LOVEBUG",
  "SHOOTINGSTAR",
  "EYESPOT",
  "PEBBLE",
  "TAILTWO",
  "BUDDY",
  "KROPKA",
];
const point_markings = [
  "COLOURPOINT",
  "RAGDOLL",
  "SEPIAPOINT",
  "MINKPOINT",
  "SEALPOINT",
];
const vit = [
  "VITILIGO",
  "VITILIGOTWO",
  "MOON",
  "PHANTOM",
  "KARPATI",
  "POWDER",
  "BLEACHED",
  "SMOKEY",
];

const nameToSpritesname: any = {
  SingleColour: "single",
  TwoColour: "single",
  Tabby: "tabby",
  Marbled: "marbled",
  Rosette: "rosette",
  Smoke: "smoke",
  Ticked: "ticked",
  Speckled: "speckled",
  Bengal: "bengal",
  Mackerel: "mackerel",
  Classic: "classic",
  Sokoke: "sokoke",
  Agouti: "agouti",
  Singlestripe: "singlestripe",
  Masked: "masked",
  Tortie: "",
  Calico: "",
};

function choice<Type>(list: Type[]): Type {
  return list[Math.floor(Math.random() * list.length)];
}

function weightedChoice<Type>(list: Type[], weights: number[]) {
  if (list.length !== weights.length) {
    new Error(
      `list length is ${list.length} while weights length is ${weights.length}`,
    );
  }

  const sum = weights.reduce((prev, curr) => curr + prev);
  const normalizedWeights = weights.map((v) => v / sum);

  var runningTotal = 0;
  for (const [i, w] of normalizedWeights.entries()) {
    runningTotal += w;
    normalizedWeights[i] = runningTotal;
  }

  const randomNumber = Math.random();

  for (const [i, value] of normalizedWeights.entries()) {
    if (randomNumber <= value) {
      return list[i];
    }
  }

  return list[0];
}

function capitalize(str: string) {
  return str.charAt(0).toLocaleUpperCase() + str.substring(1);
}

function inheritEyes(parents: Pelt[], child: Pelt) {
  const parentEyeColours: string[] = parents.map((v) => v.eyeColour);

  // eyecolour1
  if (parentEyeColours.length == 0) {
    child.eyeColour = choice(eye_colours);
  } else {
    child.eyeColour = choice(eye_colours.concat(parentEyeColours));
  }

  // heterochromia!
  var n = 120;
  if (
    child.whitePatches &&
    (high_white.includes(child.whitePatches) ||
      mostly_white.includes(child.whitePatches) ||
      child.whitePatches === "FULLWHITE" ||
      child.whitePatches === "WHITE")
  ) {
    n -= 90;
  }
  if (child.whitePatches === "FULLWHITE" || child.colour === "WHITE") {
    n -= 10;
  }

  for (const parent of parents) {
    if (parent.eyeColour2) {
      n -= 10;
    }
  }

  if (n < 0) {
    n = 1;
  }

  if (Math.random() <= 1 / n) {
    const eyeColourGroups = [yellow_eyes, blue_eyes, green_eyes];
    const choiceGroups = eyeColourGroups.filter(
      (colourGroup) => !colourGroup.includes(child.eyeColour),
    );

    child.eyeColour2 = choice(choice(choiceGroups));
  }
}

function inheritWhite(
  parents: Pelt[],
  child: Pelt,
  forceInherit: boolean = false,
) {
  const parentsVitiligo = [];
  const parentsWhite = [];

  for (const p of parents) {
    if (p.vitiligo !== undefined) {
      parentsVitiligo.push(p.vitiligo);
    }
    if (p.whitePatches !== undefined || p.points !== undefined) {
      parentsWhite.push(p.whitePatches);
    }
  }

  const vitChance = Math.max(8 - parentsVitiligo.length, 0);
  if (Math.random() <= 1 / 2 ** vitChance) {
    child.vitiligo = choice(vit);
  }

  const percentagePerParent = Math.floor(94 / parentsWhite.length);
  var chance = 3;
  for (const _ of parentsWhite) {
    chance += percentagePerParent;
  }

  const hasWhite = Math.random() <= chance / 100;

  if (hasWhite || forceInherit) {
    if (child.name === "SingleColour") {
      child.name = "TwoColour";
    }

    const parentsWhitePatches = new Set<string>();
    const parentsPoints = [];

    for (const p of parents) {
      if (p.whitePatches) {
        parentsWhitePatches.add(p.whitePatches);
      }
      if (p.points) {
        parentsPoints.push(p.points);
      }
    }

    // direct inheritence
    if (parentsWhitePatches.size > 0 && Math.random() <= 1 / 16) {
      const possibleWhitePatches = new Set(parentsWhitePatches);
      if (child.name === "Calico") {
        little_white.forEach((v) => possibleWhitePatches.delete(v));
        mid_white.forEach((v) => possibleWhitePatches.delete(v));
      } else if (child.name === "Tortie") {
        high_white.forEach((v) => possibleWhitePatches.delete(v));
        mostly_white.forEach((v) => possibleWhitePatches.delete(v));
        possibleWhitePatches.delete("FULLWHITE");
      }

      if (possibleWhitePatches.size > 0) {
        child.whitePatches = choice(Array.from(possibleWhitePatches.values()));

        if (parentsPoints.length > 0 && child.name !== "Tortie") {
          child.points = choice(parentsPoints);
        } else {
          child.points = undefined;
        }
        return;
      }
    }

    var chance: number;
    if (parentsPoints) {
      chance = 10 - parentsPoints.length;
    } else {
      chance = 40;
    }
    if (child.name !== "Tortie" && Math.random() <= 1 / chance) {
      child.points = choice(point_markings);
    } else {
      child.points = undefined;
    }

    const whiteList = [
      little_white,
      mid_white,
      high_white,
      mostly_white,
      ["FULLWHITE"],
    ];
    var w = [0, 0, 0, 0, 0];
    for (const p of parentsWhitePatches) {
      var add_weights = [0, 0, 0, 0, 0];
      if (little_white.includes(p)) {
        add_weights = [40, 20, 15, 5, 0];
      } else if (mid_white.includes(p)) {
        add_weights = [10, 40, 15, 10, 0];
      } else if (high_white.includes(p)) {
        add_weights = [15, 20, 40, 10, 1];
      } else if (mostly_white.includes(p)) {
        add_weights = [5, 15, 20, 40, 5];
      } else if (p === "FULLWHITE") {
        add_weights = [0, 5, 15, 40, 10];
      }

      for (var i = 0; i < w.length; i++) {
        w[i] += add_weights[i];
      }
    }

    if (w.every((v) => v === 0)) {
      // TODO: support null parents
      w = [50, 5, 0, 0, 0];
    }

    if (child.name === "Calico") {
      var highWhiteWeights = w.slice(3);
      w = [0, 0, 0].concat(highWhiteWeights);
    } else if (child.name === "Tortie") {
      var lowWhiteWeights = w.slice(0, 1);
      w = lowWhiteWeights.concat([0, 0, 0]);
    }

    if (w.every((v) => v === 0)) {
      w = [2, 1, 0, 0, 0];
    }

    const whitePatchesList = weightedChoice(whiteList, w);
    child.whitePatches = choice(whitePatchesList);

    if (
      child.points &&
      (high_white.includes(child.whitePatches) ||
        mostly_white.includes(child.whitePatches) ||
        child.whitePatches === "FULLWHITE")
    ) {
      child.points = undefined;
    }
  }
}

// doesn't include pelt length!!!
function inheritPattern(parents: Pelt[], child: Pelt) {
  const parentPeltColours = new Set<string>();
  const parentPeltNames = new Set<string>();

  for (const p of parents) {
    parentPeltColours.add(p.colour);
    if (torties.includes(p.name)) {
      parentPeltNames.add(capitalize(p.tortieBase!));
    } else {
      parentPeltNames.add(p.name);
    }
  }

  // type
  var w = [0, 0, 0, 0];
  for (const p of parentPeltNames) {
    var add_weights = [0, 0, 0, 0];
    if (tabbies.includes(p)) {
      add_weights = [50, 10, 5, 7];
    } else if (spotted.includes(p)) {
      add_weights = [10, 50, 5, 5];
    } else if (plain.includes(p)) {
      add_weights = [5, 5, 50, 0];
    } else if (exotic.includes(p)) {
      add_weights = [15, 15, 1, 45];
    }
    // TODO: SUPPORT NULL PARENTS

    for (var i = 0; i < w.length; i++) {
      w[i] += add_weights[i];
    }
  }

  if (w.every((v) => v === 0)) {
    w = [1, 1, 1, 1];
  }
  const peltCategoryChoice = weightedChoice<string[]>(pelt_categories, w);
  var pelt = choice(peltCategoryChoice);

  // tortie? all cats have f chance. sorry.
  var tortie_chance = 4;
  // if any parent is a tortie, increase tortie chance
  for (const p of parents) {
    if (torties.includes(p.name)) {
      tortie_chance = Math.floor(tortie_chance / 2);
      break;
    }
  }

  var tortieBase = undefined;
  if (Math.random() <= 1 / 2 ** tortie_chance) {
    tortieBase = pelt;
    if (tortieBase === "TwoColour" || tortieBase === "SingleColour") {
      tortieBase = "Single";
    }
    tortieBase = tortieBase.toLowerCase();
    pelt = choice(torties);
  }

  // colour
  var colour_weights = [0, 0, 0, 0];

  for (const p of parentPeltColours) {
    var add_weights = [0, 0, 0, 0];
    if (ginger_colours.includes(p)) {
      add_weights = [40, 0, 0, 10];
    } else if (black_colours.includes(p)) {
      add_weights = [0, 40, 2, 5];
    } else if (white_colours.includes(p)) {
      add_weights = [0, 5, 40, 0];
    } else if (brown_colours.includes(p)) {
      add_weights = [10, 5, 0, 35];
    }
    // TODO: SUPPORT NULL PARENTS

    for (var i = 0; i < w.length; i++) {
      colour_weights[i] += add_weights[i];
    }
  }
  if (colour_weights.every((v) => v === 0)) {
    colour_weights = [1, 1, 1, 1];
  }

  const colourCategoryChoice = weightedChoice<string[]>(
    colour_categories,
    colour_weights,
  );
  var peltColour = choice(colourCategoryChoice);

  // no support for pelt length.

  // qed
  child.name = pelt;
  child.colour = peltColour;
  child.tortieBase = tortieBase;
}

function generateTortiePattern(child: Pelt) {
  if (child.name === "Tortie" || child.name === "Calico") {
    if (child.tortieBase === undefined) {
      child.tortieBase = choice(tortiebases);
    }
    if (child.pattern === undefined) {
      child.pattern = choice(tortiepatterns);
    }

    if (child.colour) {
      // wildcard
      if (Math.random() <= 1 / 2 ** 9) {
        child.tortiePattern = choice(tortiebases);

        const possibleColours = pelt_colours.filter((v) => v !== child.colour);
        child.tortieColour = choice(possibleColours);
      } else {
        if (["singlestripe", "smoke", "single"].includes(child.tortieBase)) {
          child.tortiePattern = choice([
            "tabby",
            "mackerel",
            "classic",
            "single",
            "smoke",
            "agouti",
            "ticked",
          ]);
        } else {
          child.tortiePattern = weightedChoice(
            [child.tortieBase, "single"],
            [97, 3],
          );
        }

        if (child.colour === "WHITE") {
          const possibleColours = white_colours.filter((v) => v !== "WHITE");
          child.colour = choice(possibleColours);
        }

        if (
          black_colours.includes(child.colour) ||
          white_colours.includes(child.colour)
        ) {
          child.tortieColour = choice(
            [ginger_colours, ginger_colours, brown_colours].flat(),
          );
        } else if (ginger_colours.includes(child.colour)) {
          child.tortieColour = choice(
            [brown_colours, black_colours, black_colours].flat(),
          );
        } else if (brown_colours.includes(child.colour)) {
          const possibleColours = brown_colours.filter(
            (v) => v !== child.colour,
          );
          child.tortieColour = choice(
            [
              possibleColours,
              black_colours,
              ginger_colours,
              ginger_colours,
            ].flat(),
          );
        } else {
          child.tortieColour = "GOLDEN";
        }
      }
    } else {
      child.colour = "GOLDEN";
    }
  }
}

function generateChildPelt(parents: Pelt[]) {
  var defaultKit: Pelt = {
    name: "SingleColour",
    colour: "CREAM",
    skin: "BLACK",
    spritesName: "single",
    eyeColour: "YELLOW",
    tint: "none",
    whitePatchesTint: "none",
    reverse: false,
  };

  // direct inheritance
  if (Math.random() <= 0.15) {
    const parent: Pelt = choice(parents);
    defaultKit.name = parent.name;
    defaultKit.colour = parent.colour;
    defaultKit.tortieBase = parent.tortieBase;
    inheritWhite(parents, defaultKit, true);
  } else {
    inheritPattern(parents, defaultKit);
    inheritWhite(parents, defaultKit);
  }
  inheritEyes(parents, defaultKit);
  generateTortiePattern(defaultKit);
  defaultKit.skin = choice(skin_sprites);

  if (defaultKit.name === "Tortie" || defaultKit.name === "Calico") {
    defaultKit.spritesName = defaultKit.tortieBase!;
  } else {
    defaultKit.spritesName = nameToSpritesname[defaultKit.name];
  }
  if (Math.random() <= 0.5) {
    defaultKit.reverse = true;
  } else {
    defaultKit.reverse = false;
  }
  return defaultKit;
}

export {
  inheritEyes,
  inheritPattern,
  inheritWhite,
  generateTortiePattern,
  generateChildPelt,
};
