// src/pages/ShopPage.tsx
import { useState } from "react";
import BannerSlider from "../../features/shop/components/BannerSlider";
import { products, type CategoryType } from "../../data/productData";
import ProductGrid from "../../features/shop/components/ProductGrid";

const categories: CategoryType[] = ["전체", "엽서", "키링", "폰케이스", "향", "의류"];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("전체");

  const filteredProducts =
    activeCategory === "전체"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative bg-background bg-cover bg-center text-center">
      <BannerSlider />

      {/* Category Tabs */}
      <div 
        className="flex bg-white mt-6 rounded-full justify-center items-center"
        style={{
          boxShadow: "0 4px 14.1px 0 rgba(0, 0, 0, 0.10)"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-15 py-5 rounded-full text-xl text-black transition ${
              activeCategory === cat
                ? "font-bold border-4 border-primary"
                : "font-normal border-4 border-white"
            }`}
            style={{
              fontFamily: "NexonLv1Gothic"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="my-27">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ShopPage;