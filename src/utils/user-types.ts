export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  role: string;
  addresses: AddressItemTypes[];
  token: string;
  phoneNumber: string;
  wishlisted: string[];
  orderedProducts: string[];
  compare: string[];
  status: string;
}

export interface AddressItemTypes {
  _id?: string;
  name: string;
  phoneNumber: string;
  city: string;
  address1: string;
  address2?: string;
  postalCode: number;
}

export interface ProductItemTypes {
  _id: string;
  name: string;
  slug: string;
  price: number;
  features: string;
  weight: string;
  brandName: string;
  description: string;
  discountedPrice: number;
  store: string;
  images: ImageItemTypes[];
  inStock: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: Date;
  category: { name: string; _id: string };
  reviews: ReviewItemTypes[];
  reviewsCount: number;
}

export interface ReviewItemTypes {
  _id: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
  user: { _id: string; name: string; photo: string; username: string };
  replies: ReviewReplyItemTypes[];
}

export interface ReviewReplyItemTypes {
  _id: string;
  text: string;
  user: {
    _id: string;
    name: string;
    photo: string;
    username: string;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryItemTypes {
  _id: string;
  name: string;
  numberOfProducts: number;
  image: ImageItemTypes;
  products?: ProductItemTypes[];
}

export interface ImageItemTypes {
  imageUrl: string;
  cloudinaryId?: string;
  _id?: string;
  name?: string;
}

export interface NewsItemTypes {
  _id: string;
  title: string;
  images: ImageItemTypes[];
  text: string;
  createdAt: Date;
}

export interface CartProps {
  cartProducts: CartProductProps[];
  uset: string;
  totalPrice: number;
  totalQuantity: number;
  _id: string;
}

export interface CartProductProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  subTotal: number;
  productId: string;
  _id: string;
}

export interface OrderProps {
  _id: string;
  orderedProducts: CartProductProps[];
  totalPrice: number;
  orderNumber: number;
  user: string;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: Date;
  paymentMethod: string;
  deliveryFee: number;
  address: AddressItemTypes;
  notes?: string;
  status: string;
  createdAt: Date;
}

export type OrderStatustypes =
  | "processing"
  | "paid"
  | "on the way"
  | "delivered"
  | "cancelled";

export interface RevenueDataTypes {
  dayStats: RevenueItemTypes;
  weekStats: RevenueItemTypes;
  monthStats: RevenueItemTypes;
  yearStats: RevenueItemTypes;
  totalRevenue: number;
  total: number;
  cancelled: number;
}

export type RevenueItemTypes = {
  new: number;
  old: number;
  difference: number;
};

export interface CustomersStatsTypes {
  total: number;
  new: number;
  thisMonth: number;
}
