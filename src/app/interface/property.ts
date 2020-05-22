export interface Property {

  title: string;
  category: string;
  surface: string;
  room: string;
  //? pas obligatoire
  descr?: string;
  price: string;
  sold: boolean;
  photos?: any[];


}
