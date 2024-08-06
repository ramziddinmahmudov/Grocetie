import { AddressItemTypes, CartProductProps } from "./user-types";

export interface ClientReviewItemTypes {
  id: string;
  text: string;
  rating: number;
  user: {
    name: string;
    photo: string;
  };
}

export interface QuestionItemTypes {
  id: number;
  question: string;
  answer: any;
}

export interface MotoItemTypes {
  id: number;
  motoText: string;
}

export interface TeamMemberTypes {
  id: string;
  name: string;
  position: string;
  image: string;
}

// SOCIAL SHAIR MODAL TYPES
export interface SocialShareTypes {
  text: string;
  url: string;
  closeModal: () => void;
}

export type ActionTypeProps = "add" | "delete" | "update";

export interface OrderDataProps {
  orderedProducts: CartProductProps[];
  totalPrice: number;
  user: string;
  paymentMethod: string;
  deliveryFee: number;
  address: AddressItemTypes;
  notes: string;
}

export type activeFilterTypeProps = "category" | "price" | "rating";

export interface activeFilterProps {
  id: string;
  value: string;
  type: activeFilterTypeProps;
}
