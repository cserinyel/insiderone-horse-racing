export interface HorseColor {
  name: string;
  hex: string;
}

export interface Horse {
  id: string;
  name: string;
  color: HorseColor;
  condition: number;
}


