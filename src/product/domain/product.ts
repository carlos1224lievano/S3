export class Product {
  id: number | null;
  title: string;
  especific: string;
  price: number;
  image: string;
  image_s3: string;

  constructor(id: number | null, title: string, especific: string, price: number, image: string, image_s3: string) {
    this.id = id;
    this.title = title;
    this.especific = especific;
    this.price = price;
    this.image = image;
    this.image_s3 = image_s3;
  }
}
