import { Pelt, JSONData } from "./types";

const nameToSpritesname = {
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

const spritesnameToName = {
  single: "TwoColour",
  tabby: "Tabby",
  marbled: "Marbled",
  rosette: "Rosette",
  smoke: "Smoke",
  ticked: "Ticked",
  speckled: "Speckled",
  bengal: "Bengal",
  mackerel: "Mackerel",
  classic: "Classic",
  sokoke: "Sokoke",
  agouti: "Agouti",
  singlestripe: "Singlestripe",
  masked: "Masked",
};

const conversion = {
  "CRIMSON": "LEATHER_crimson",
  "BLUE": "LEATHER_blue",
  "YELLOW": "LEATHER_yellow",
  "CYAN": "LEATHER_cyan",
  "RED": "LEATHER_orange",
  "LIME": "LEATHER_lime",
  "GREEN": "LEATHER_green",
  "WHITE": "LEATHER_white",
  "BLACK": "LEATHER_black",
  "SPIKES": "LEATHER_SPIKE_black_gold",
  "PINK": "LEATHER_pink",
  "PURPLE": "LEATHER_purple",
  "MULTI": "LEATHER_rose",
  "INDIGO": "LEATHER_indigo",
  "RAINBOW": "LEATHER_GRADIENT_rainbow",
  "CRIMSONBELL": "LEATHER_BELL_crimson",
  "BLUEBELL": "LEATHER_BELL_blue",
  "YELLOWBELL": "LEATHER_BELL_yellow",
  "CYANBELL": "LEATHER_BELL_cyan",
  "REDBELL": "LEATHER_BELL_orange",
  "LIMEBELL": "LEATHER_BELL_lime",
  "GREENBELL": "LEATHER_BELL_green",
  "WHITEBELL": "LEATHER_BELL_white",
  "BLACKBELL": "LEATHER_BELL_black",
  "SPIKESBELL": "LEATHER_BELL_SPIKE_black_gold",
  "PINKBELL": "LEATHER_BELL_pink",
  "PURPLEBELL": "LEATHER_BELL_purple",
  "MULTIBELL": "LEATHER_BELL_rose",
  "INDIGOBELL": "LEATHER_BELL_indigo",
  "RAINBOWBELL": "LEATHER_BELL_GRADIENT_rainbow",
  "CRIMSONBOW": "BOW_crimson",
  "BLUEBOW": "BOW_blue",
  "YELLOWBOW": "BOW_yellow",
  "CYANBOW": "BOW_cyan",
  "REDBOW": "BOW_orange",
  "LIMEBOW": "BOW_lime",
  "GREENBOW": "BOW_green",
  "WHITEBOW": "BOW_white",
  "BLACKBOW": "BOW_black",
  "SPIKESBOW": "BOW_FOIL_black_gold",
  "PINKBOW": "BOW_pink",
  "PURPLEBOW": "BOW_purple",
  "MULTIBOW": "BOW_rose",
  "INDIGOBOW": "BOW_indigo",
  "RAINBOWBOW": "BOW_GRADIENT_rainbow",
  "CRIMSONNYLON": "NYLON_BELL_crimson",
  "BLUENYLON": "NYLON_BELL_blue",
  "YELLOWNYLON": "NYLON_BELL_yellow",
  "CYANNYLON": "NYLON_BELL_cyan",
  "REDNYLON": "NYLON_BELL_orange",
  "LIMENYLON": "NYLON_BELL_lime",
  "GREENNYLON": "NYLON_BELL_green",
  "WHITENYLON": "NYLON_BELL_white",
  "BLACKNYLON": "NYLON_BELL_black",
  "SPIKESNYLON": "NYLON_BELL_black_gold",
  "PINKNYLON": "NYLON_BELL_pink",
  "PURPLENYLON": "NYLON_BELL_purple",
  "MULTINYLON": "NYLON_BELL_rose",
  "INDIGONYLON": "NYLON_BELL_indigo",
  "RAINBOWNYLON": "NYLON_BELL_GRADIENT_rainbow"
}

class CatData {
  shading: boolean;
  reverse: boolean;
  isTortie: boolean;

  backgroundColour: string;
  tortieMask: string | null;
  tortieColour: string | null;
  tortiePattern: string | null;

  peltName: string;
  spriteNumber: number;
  colour: string;
  tint: string;
  skinColour: string;
  eyeColour: string;
  eyeColour2: string | null;
  whitePatches: string | null;
  points: string | null;
  whitePatchesTint: string;
  vitiligo: string | null;
  accessory: string | null;
  scar: string | null;

  constructor() {
    this.shading = false;
    this.reverse = false;
    this.isTortie = false;

    this.backgroundColour = "rgb(0 0 0 / 0)";

    this.tortieMask = null;
    this.tortieColour = null;
    this.tortiePattern = null;

    this.peltName = "SingleColour";
    this.spriteNumber = 0;
    this.colour = "CREAM";
    this.tint = "none";
    this.skinColour = "BLACK";
    this.eyeColour = "YELLOW";
    this.eyeColour2 = null;

    this.whitePatches = null;
    this.points = null;
    this.whitePatchesTint = "none";
    this.vitiligo = null;

    this.accessory = null;
    this.scar = null;
  }

  public get name(): string {
    if (this.isTortie) {
      return "Tortie";
    } else {
      return this.peltName;
    }
  }

  getPelt(): Pelt {
    const peltName = this.peltName as keyof typeof nameToSpritesname;
    const tortiePattern = this.tortiePattern as keyof typeof nameToSpritesname;

    const pelt: Pelt = {
      name: this.name,
      colour: this.colour,
      skin: this.skinColour,
      tint: this.tint,
      whitePatchesTint: this.whitePatchesTint,
      eyeColour: this.eyeColour,
      eyeColour2: this.eyeColour2 === null ? undefined : this.eyeColour2,
      whitePatches: this.whitePatches === null ? undefined : this.whitePatches,
      points: this.points === null ? undefined : this.points,
      vitiligo: this.vitiligo === null ? undefined : this.vitiligo,
      spritesName: nameToSpritesname[peltName],
      accessory: this.accessory === null ? [] : [this.accessory],
      reverse: this.reverse,

      tortieBase: nameToSpritesname[peltName],
      pattern: this.tortieMask === null ? undefined : this.tortieMask,
      tortiePattern: nameToSpritesname[tortiePattern],
      tortieColour: this.tortieColour === null ? undefined : this.tortieColour,

      scars: [],
    };
    if (this.scar) {
      pelt.scars = [this.scar];
    }

    return pelt;
  }

  getJSONData() {
    const peltName = this.peltName as keyof typeof nameToSpritesname;
    const tortiePattern = this.tortiePattern as keyof typeof nameToSpritesname;

    return JSON.stringify(
      {
        pelt_name: this.name,
        pelt_color: this.colour,
        eye_colour: this.eyeColour,
        eye_colour2: this.eyeColour2,
        reverse: this.reverse,
        white_patches: this.whitePatches,
        vitiligo: this.vitiligo,
        points: this.points,
        white_patches_tint: this.whitePatchesTint,
        tortie_marking: this.name === "Tortie" ? this.tortieMask : null,
        tortie_base:
          this.name === "Tortie" ? nameToSpritesname[peltName] : null,
        tortie_pattern:
          this.name === "Tortie" ? nameToSpritesname[tortiePattern] : null,
        tortie_color: this.name === "Tortie" ? this.tortieColour : null,
        skin: this.skinColour,
        tint: this.tint,
        scars: this.scar,
        accessory: this.accessory === undefined ? [] : [this.accessory],
      },
      undefined,
      4,
    );
  }

  getURL(base: string) {
    const params = new URLSearchParams({
      shading: this.shading.toString(),
      reverse: this.reverse.toString(),
      isTortie: this.isTortie.toString(),
      backgroundColour: this.backgroundColour,

      tortieMask: this.tortieMask === null ? "" : this.tortieMask,
      tortieColour: this.tortieColour === null ? "" : this.tortieColour,
      tortiePattern: this.tortiePattern === null ? "" : this.tortiePattern,

      peltName: this.peltName,
      spriteNumber: this.spriteNumber.toString(),
      colour: this.colour,
      tint: this.tint,
      skinColour: this.skinColour,
      eyeColour: this.eyeColour,
      eyeColour2: this.eyeColour2 === null ? "" : this.eyeColour2,
      whitePatches: this.whitePatches === null ? "" : this.whitePatches,
      points: this.points === null ? "" : this.points,
      whitePatchesTint: this.whitePatches === null ? "" : this.whitePatchesTint,
      vitiligo: this.vitiligo === null ? "" : this.vitiligo,
      accessory: this.accessory === null ? "" : this.accessory,
      scar: this.scar === null ? "" : this.scar,
      version: "v2",
    });
    return new URL(`${base}?${params}`);
  }

  static fromPelt(pelt: Pelt) {
    const spritesName = pelt.tortiePattern as keyof typeof spritesnameToName;
    const catData = new CatData();

    if (pelt.name === "Tortie" || pelt.name === "Calico") {
      catData.isTortie = true;
      catData.peltName =
        spritesnameToName[pelt.tortieBase! as keyof typeof spritesnameToName];
    } else {
      catData.isTortie = false;
      catData.peltName = pelt.name;
    }
    catData.colour = pelt.colour;
    catData.skinColour = pelt.skin;
    catData.tint = pelt.skin;
    catData.eyeColour = pelt.eyeColour;
    catData.eyeColour2 = pelt.eyeColour2 === undefined ? null : pelt.eyeColour2;

    catData.whitePatchesTint = pelt.whitePatchesTint;
    catData.whitePatches =
      pelt.whitePatches === undefined ? null : pelt.whitePatches;
    catData.points = pelt.points === undefined ? null : pelt.points;
    catData.vitiligo = pelt.vitiligo === undefined ? null : pelt.vitiligo;

    catData.accessory = pelt.accessory ? pelt.accessory[0] : null;
    catData.reverse = pelt.reverse;

    catData.tortieMask = pelt.pattern === undefined ? null : pelt.pattern;
    catData.tortiePattern =
      pelt.tortiePattern === undefined ? null : spritesnameToName[spritesName];
    catData.tortieColour =
      pelt.tortieColour === undefined ? null : pelt.tortieColour;

    return catData;
  }

  static fromURL(url: string) {
    const catData = new CatData();
    const params = new URL(url).searchParams;

    const scar = params.get("scar");
    const accessory = params.get("accessory");
    const vitiligo = params.get("vitiligo");
    const whitePatchesTint = params.get("whitePatchesTint");
    const points = params.get("points");
    const whitePatches = params.get("whitePatches");
    const eyeColour2 = params.get("eyeColour2");
    const eyeColour = params.get("eyeColour");
    const skinColour = params.get("skinColour");
    const tint = params.get("tint");
    const colour = params.get("colour");
    const spriteNumber = params.get("spriteNumber");
    const peltName = params.get("peltName");
    const tortiePattern = params.get("tortiePattern");
    const tortieColour = params.get("tortieColour");
    const tortieMask = params.get("tortieMask");
    const backgroundColour = params.get("backgroundColour");

    const isTortie = params.get("isTortie");
    const shading = params.get("shading");
    const reverse = params.get("reverse");

    catData.isTortie = isTortie === "true" ? true : false;
    catData.shading = shading === "true" ? true : false;
    catData.reverse = reverse === "true" ? true : false;

    if (scar) {
      catData.scar = scar;
    }
    if (accessory) {
      catData.accessory = accessory;
    }
    if (vitiligo) {
      catData.vitiligo = vitiligo;
    }
    if (whitePatchesTint) {
      catData.whitePatchesTint = whitePatchesTint;
    }
    if (points) {
      catData.points = points;
    }
    if (whitePatches) {
      catData.whitePatches = whitePatches;
    }
    if (eyeColour2) {
      catData.eyeColour2 = eyeColour2;
    }
    if (eyeColour) {
      catData.eyeColour = eyeColour;
    }
    if (skinColour) {
      catData.skinColour = skinColour;
    }
    if (tint) {
      catData.tint = tint;
    }
    if (colour) {
      catData.colour = colour;
    }
    if (spriteNumber) {
      catData.spriteNumber = Number(spriteNumber);
    }
    if (peltName) {
      catData.peltName = peltName;
    }
    if (tortiePattern) {
      catData.tortiePattern = tortiePattern;
    }
    if (tortieColour) {
      catData.tortieColour = tortieColour;
    }
    if (tortieMask) {
      catData.tortieMask = tortieMask;
    }
    if (backgroundColour) {
      catData.backgroundColour = backgroundColour;
    }

    if (params.get("version") === "v1") {
      if (catData.accessory && catData.accessory in conversion) {
        catData.accessory = conversion[catData.accessory as keyof typeof conversion];
      }

      if (0 <= catData.spriteNumber && catData.spriteNumber <= 5) {
        catData.spriteNumber += 3;
      }
      else if (6 <= catData.spriteNumber && catData.spriteNumber <= 19) {
        catData.spriteNumber += 6;
      }
      else if (catData.spriteNumber === 20) {
        catData.spriteNumber = 2;
      }

    }
    return catData;
  }

  static fromJSONData(data: JSONData) {
    const catData = new CatData();

    if (data.pelt_name === "Tortie" || data.pelt_name === "Calico") {
      catData.isTortie = true;
      catData.peltName = 
        spritesnameToName[data.tortie_base! as keyof typeof spritesnameToName];
    } else {
      catData.isTortie = false;
      catData.peltName = data.pelt_name;
    }
    catData.colour = data.pelt_color;
    catData.skinColour = data.skin;
    catData.tint = data.tint;
    catData.eyeColour = data.eye_colour;
    catData.eyeColour2 = data.eye_colour2;

    catData.whitePatchesTint = data.white_patches_tint;
    catData.whitePatches = data.white_patches;
    catData.points = data.points;
    catData.vitiligo = data.vitiligo;
    if (Array.isArray(data.accessory)) {
      catData.accessory = data.accessory.length === 0 ? null : data.accessory[0];
    } else {
      catData.accessory = data.accessory;
    }
    catData.reverse = data.reverse;

    catData.tortieMask = catData.isTortie ? data.tortie_marking : null;
    catData.tortiePattern = 
      data.tortie_pattern === null ? null : spritesnameToName[data.tortie_pattern as keyof typeof spritesnameToName];
    catData.tortieColour = data.tortie_color;
    return catData;
  }
}

export default CatData;
