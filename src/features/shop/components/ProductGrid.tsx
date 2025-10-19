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
          className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl"
          style={{
            filter: "drop-shadow(2.182px 2.182px 3.71px rgba(0, 0, 0, 0.10))"
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="relative w-54 h-54 aspect-square object-cover rounded-2xl bg-gray-100"
          />
          <p className="w-full text-start mt-4 text-base text-black font-normal" style={{ fontFamily: "NexonLv1Gothic" }}>{product.name}</p>
          <p className="w-full text-start mt-2 text-primary text-base font-semibold" style={{ fontFamily: "NexonLv1Gothic" }}>{product.price.toLocaleString()}원</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;