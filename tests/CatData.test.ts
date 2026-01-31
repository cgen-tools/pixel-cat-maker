import { expect, test } from 'vitest';
import CatData from '../src/library/CatData';

const catURL = "https://cgen-tools.github.io/pixel-cat-maker/?shading=true&reverse=true&isTortie=false&backgroundColour=rgb(0+0+0+%2F+0)&tortieMask=ONE&tortieColour=BLACK&tortiePattern=Classic&peltName=Speckled&spriteNumber=6&colour=BLACK&tint=pink&skinColour=PEACH&eyeColour=YELLOW&eyeColour2=&whitePatches=&points=&whitePatchesTint=&vitiligo=&accessory=HOLLY&scar=&version=v1";

test('test cat URL', () => {
  expect(CatData.
    fromURL(catURL))
    .toMatchObject({
      accessory: "HOLLY",
      backgroundColour: "rgb(0 0 0 / 0)",
      colour: "BLACK",
      eyeColour: "YELLOW",
      eyeColour2: null,
      isTortie: false,
      peltName: "Speckled",
      points: null,
      reverse: true,
      scar: null,
      shading: true,
      skinColour: "PEACH",
      spriteNumber: 6,
      tint: "pink",
      tortieColour: "BLACK",
      tortieMask: "ONE",
      tortiePattern: "Classic",
      vitiligo: null,
      whitePatches: null,
      whitePatchesTint: "none",
    });
});
