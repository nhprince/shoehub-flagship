export interface Colorway {
  id: string;
  name: string;
  hex: string;
  meshColor: string;
  soleColor: string;
  accentColor: string;
  variantIndex?: number;
}

export interface ShoeProduct {
  id: string;
  name: string;
  subname: string;
  tagline: string;
  category: 'hyper-speed' | 'lifestyle' | 'trail' | 'architectural';
  price: number;
  weight: string;
  drop: string;
  cushion: string;
  description: string;
  image: string;
  colorways: Colorway[];
  sizes: number[];
  technologies: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  shoe: ShoeProduct;
  selectedColorway: Colorway;
  selectedSize: number;
  quantity: number;
}

export interface AnatomyPart {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  description: string;
  metric: string;
  metricLabel: string;
  materials: string[];
}

export interface ReviewItem {
  quote: string;
  source: string;
  role: string;
  rating: number;
  location: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  location: string;
  season: string;
  image: string;
  quote: string;
}
