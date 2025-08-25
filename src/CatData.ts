import { Pelt } from "./types";

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
      accessory: this.accessory === null ? undefined : this.accessory,
      reverse: this.reverse,

      tortieBase: nameToSpritesname[peltName],
      pattern: this.tortieMask === null ? undefined : this.tortieMask,
      tortiePattern: nameToSpritesname[tortiePattern],
      tortieColour: this.tortieColour === null ? undefined : this.tortieColour,

      scars: [],
    };
    if (this.scar) {
      pelt["scars"] = [this.scar];
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
        pattern: this.name === "Tortie" ? this.tortieMask : null,
        tortie_base:
          this.name === "Tortie" ? nameToSpritesname[peltName] : null,
        tortie_pattern:
          this.name === "Tortie" ? nameToSpritesname[tortiePattern] : null,
        tortie_color: this.name === "Tortie" ? this.tortieColour : null,
        skin: this.skinColour,
        tint: this.tint,
        scars: this.scar,
        accessory: this.accessory === undefined ? null : this.accessory,
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
      version: "v1",
    });
    return new URL(`${base}?${params}`);
  }

  static fromURL(url: string) {
    const catData = new CatData();
    const params = new URLSearchParams(url);

    if (params.get("version") === "v1") {
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

      catData.scar = scar;
      catData.accessory = accessory;
      catData.vitiligo = vitiligo;
      if (whitePatchesTint) {
        catData.whitePatchesTint = whitePatchesTint;
      }
      if (points) {
        catData.points = points;
      }
      catData.whitePatches = whitePatches;
      catData.eyeColour2 = eyeColour2;
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
        catData.tortieColour = tortieColour;
      }
      if (tortieMask) {
        catData.tortieMask = tortieMask;
      }
      if (backgroundColour) {
        catData.backgroundColour = backgroundColour;
      }

      return catData;
    }
    return catData;
  }
}

export default CatData;
