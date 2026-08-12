export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  costPrice: number | null;
  quantity: number;
  sku: string | null;
  barcode: string | null;
  categoryId: string;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  weight: number | null;
  dimensions: ProductDimensions | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  position: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string | null;
  price: number | null;
  quantity: number;
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  name: string;
  value: string;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'm' | 'in';
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  sortBy?: 'price' | 'name' | 'createdAt' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateProductData {
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  quantity: number;
  sku?: string;
  categoryId: string;
  images?: string[];
  tags?: string[];
  weight?: number;
  dimensions?: ProductDimensions;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  parent: Category | null;
  children: Category[];
  productCount: number;
  isActive: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}
