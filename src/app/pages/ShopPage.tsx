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
        className="flex bg-white rounded-full justify-center items-center z-5 translate-y-[-30px]"
        style={{
          boxShadow: "0 4px 14.1px 0 rgba(0, 0, 0, 0.10)"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-15 py-5 rounded-full text-xl transition ${
              activeCategory === cat
                ? "font-semibold border-3 border-primary text-primary"
                : "border-3 border-white text-gray"
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
      <div className="mt-20 mb-60">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ShopPage;