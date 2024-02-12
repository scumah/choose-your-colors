interface Colors {
  primary: string;
  secondary: string;
  text: string;
}

interface Country {
  code: string;
  name: string;
}

export default interface Team {
  name: string;
  colors: Colors;
  sport: string;
  country: Country;
  id: number;
}

export interface TeamWithDistance extends Team {
  distance: number;
}
