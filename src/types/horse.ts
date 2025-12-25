export type HorseId = string & { readonly __brand: "HorseId" };
export interface HorseColor {
  name: string;
  hex: string;
}

export interface Horse {
  id: HorseId;
  name: string;
  color: HorseColor;
  condition: number;
}
