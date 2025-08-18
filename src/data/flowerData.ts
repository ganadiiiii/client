export interface FlowerData {
  id: string;
  number: string;
  name: string;
  engName: string;
  colorMeanings: { color: string; meaning: string }[];
  flowerImg: string;
}

export const sampleFlowerData: FlowerData[] = [
  {
    id: "1",
    number: "1",
    name: "장미",
    engName: "Rose",
    colorMeanings: [
      { color: "빨간 장미", meaning: "사랑, 열정" },
      { color: "분홍 장미", meaning: "감사, 우아함" },
      { color: "노란 장미", meaning: "우정, 기쁨" },
      { color: "하얀 장미", meaning: "순결, 존경" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "2",
    number: "2", 
    name: "튤립",
    engName: "Tulip",
    colorMeanings: [
      { color: "빨간 튤립", meaning: "사랑의 고백" },
      { color: "노란 튤립", meaning: "희망, 명랑함" },
      { color: "하얀 튤립", meaning: "용서, 순수" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "3",
    number: "3", 
    name: "카네이션",
    engName: "Carnation",
    colorMeanings: [
      { color: "빨간 카네이션", meaning: "존경, 사랑" },
      { color: "분홍 카네이션", meaning: "감사, 애정" },
      { color: "하얀 카네이션", meaning: "순결, 그리움" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "4", 
    number: "4",
    name: "해바라기",
    engName: "Sunflower",
    colorMeanings: [
      { color: "해바라기", meaning: "일편단심, 존경, 동경" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "5", 
    number: "5",
    name: "백합",
    engName: "Lily",
    colorMeanings: [
      { color: "하얀 백합", meaning: "순결, 고결" },
      { color: "분홍 백합", meaning: "부드러운 사랑" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "6", 
    number: "6",
    name: "거베라",
    engName: "Gerbera",
    colorMeanings: [
      { color: "거베라", meaning: "명랑, 희망, 아름다움" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "7", 
    number: "7",
    name: "안개꽃",
    engName: "Baby’s breath",
    colorMeanings: [
      { color: "안개꽃", meaning: "순결, 영원한 사랑" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "8",
    number: "8", 
    name: "프리지아",
    engName: "Frezzia",
    colorMeanings: [
      { color: "프리지아", meaning: "순수, 천진난만, 우정" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  },
  {
    id: "9",
    number: "9", 
    name: "은방울꽃",
    engName: "Lily of the valley",
    colorMeanings: [
      { color: "은방울꽃", meaning: "순결, 존경, 축복" }
    ],
    flowerImg: "/src/assets/generate/image180.png"
  }
];
