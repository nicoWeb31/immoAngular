

export class Property{

  public title: string;
  public category: string;
  public surface: string;
  public room: string;
  public descr: string;
  public price: string;
  public sold: boolean;


  constructor(
    title: string,
    category: string,
    surface: string,
    room: string,
    descr: string,
    price: string,
    sold: boolean,

  ) {

    this.title = title ;
    this.category = category;
    this.surface = surface;
    this.room = room;
    this.descr = descr;
    this.price = price;
    this.sold = sold;

  }
}
