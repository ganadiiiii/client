import case1 from "../assets/shop/product/case-1.png";
import case2 from "../assets/shop/product/case-2.png";
import shirt1 from "../assets/shop/product/shirt-1.png";
import shirt2 from "../assets/shop/product/shirt-2.png";
import keyring from "../assets/shop/product/keyring.png";
import calendar from "../assets/shop/product/letter.png";
import bodycream from "../assets/shop/product/bodycream.png";
import handcream from "../assets/shop/product/handcream.png";
import paper from "../assets/shop/product/paper.png";
import doll from "../assets/shop/product/doll.png";

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
    name: "[한줌] iPhone case",
    price: 12000,
    image: case1,
    category: "폰케이스",
  },
  {
    id: "2",
    name: "[한줌] iPhone case",
    price: 12000,
    image: case2,
    category: "폰케이스",
  },
  {
    id: "3",
    name: "[한줌] ganadii T-shirt",
    price: 10000,
    image: shirt1,
    category: "의류",
  },
  {
    id: "4",
    name: "[한줌] Lana T-shirt",
    price: 10000,
    image: shirt2,
    category: "의류",
  },
  {
    id: "5",
    name: "[한줌] Keyring",
    price: 3000,
    image: keyring,
    category: "키링",
  },
  {
    id: "6",
    name: "[한줌] 캘린더 엽서",
    price: 12000,
    image: calendar,
    category: "엽서",
  },
  {
    id: "7",
    name: "[한줌] 핸드&바디 크림 set",
    price: 32000,
    image: bodycream,
    category: "향",
  },
  {
    id: "8",
    name: "[한줌] 헨드크림",
    price: 12000,
    image: handcream,
    category: "향",
  },
  {
    id: "9",
    name: "[한줌] 페이퍼 꽃",
    price: 10000,
    image: paper,
    category: "엽서",
  },
  {
    id: "10",
    name: "[한줌] 하나 공식 봉제 인형",
    price: 10000,
    image: doll,
    category: "키링",
  },
];