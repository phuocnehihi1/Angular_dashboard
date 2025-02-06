export interface product {
  message: {
    message: string;
    metadata: metadata[];
  };
}
export interface metadata {
  id: number;
  product_name: string;
  product_slug: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_start: number;
  isDraft: number;
  isPublished: number;
  createdAt: string;
  productType: productType;
}

export interface productType {
  type_name: string;
}

export interface addProduct {
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_type: string;
  size: string[];
  brand: string;
  material: string;
  color: string[];
  isDraft: true;
  isPublished: false;
}
