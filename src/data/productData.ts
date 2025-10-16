export type CategoryType = "전체" | "엽서" | "키링" | "폰케이스" | "향" | "의류";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: CategoryType;
}

export const products: Product[] = [
  {
    id: "1",
    name: "[한줌] iphone case",
    price: 12000,
    image: "/assets/products/iphone-1.png",
    category: "폰케이스",
  },
  {
    id: "2",
    name: "[한줌] iphone case",
    price: 12000,
    image: "/assets/products/iphone-1.png",
    category: "폰케이스",
  },
  {
    id: "3",
    name: "[한줌] ganadi T-shirt",
    price: 10000,
    image: "/assets/products/tshirt-1.png",
    category: "의류",
  },
  {
    id: "4",
    name: "[한줌] Key ring",
    price: 3000,
    image: "/assets/products/keyring-1.png",
    category: "키링",
  },
  {
    id: "5",
    name: "[한줌] Lana T-shirt",
    price: 3000,
    image: "/assets/products/keyring-1.png",
    category: "의류",
  },
  {
    id: "6",
    name: "[한줌] iphone case",
    price: 12000,
    image: "/assets/products/iphone-1.png",
    category: "폰케이스",
  },
  {
    id: "7",
    name: "[한줌] iphone case",
    price: 12000,
    image: "/assets/products/iphone-1.png",
    category: "폰케이스",
  },
  {
    id: "8",
    name: "[한줌] ganadi T-shirt",
    price: 10000,
    image: "/assets/products/tshirt-1.png",
    category: "의류",
  },
  {
    id: "9",
    name: "[한줌] Key ring",
    price: 3000,
    image: "/assets/products/keyring-1.png",
    category: "키링",
  },
  {
    id: "10",
    name: "[한줌] Lana T-shirt",
    price: 3000,
    image: "/assets/products/keyring-1.png",
    category: "의류",
  },
];