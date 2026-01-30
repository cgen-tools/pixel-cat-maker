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

type JSONData = {
  pelt_name: string;
  pelt_color: string;
  eye_colour: string;
  eye_colour2: string | null;
  reverse: boolean;
  white_patches: string | null;
  vitiligo: string | null;
  points: string | null;
  white_patches_tint: string;
  pattern: string | null;
  tortie_base: string | null;
  tortie_pattern: string | null;
  tortie_color: string | null;
  skin: string;
  tint: string;
  scars: string | null;
  accessory: string | string[] | null;
};

export type { Pelt, JSONData };
