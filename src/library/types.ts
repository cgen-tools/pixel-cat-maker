type Pelt = {
  name: string;
  colour: string;
  skin: string;
  pattern?: string | undefined;
  tortieBase?: string | undefined;
  tortiePattern?: string | undefined;
  tortieColour?: string | undefined;
  spritesName: string;
  whitePatches?: string | undefined;
  points?: string | undefined;
  vitiligo?: string | undefined;
  eyeColour: string;
  eyeColour2?: string | undefined;
  scars?: Array<string> | undefined;
  tint: string;
  whitePatchesTint: string;
  accessory?: string | undefined;
  reverse: boolean;
};

export type { Pelt };
