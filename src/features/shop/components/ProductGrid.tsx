import type { Product } from "../../../data/productData";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-x-5.5 gap-y-10">
      {products.map((product) => (
        <div 
          key={product.id}
          className="bg-white p-3 rounded-xl w-[15em] h-[18.875em]"
          style={{
            filter: "drop-shadow(2.182px 2.182px 3.71px rgba(0, 0, 0, 0.10))"
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="relative w-full aspect-square object-cover rounded-lg bg-gray-100"
          />
          <p className="w-full text-start mt-3 text-base text-black font-bold" style={{ fontFamily: "NexonLv1Gothic" }}>{product.name}</p>
          <p className="w-full text-start text-primary text-base" style={{ fontFamily: "NexonLv1Gothic" }}>{product.price.toLocaleString()}원</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;