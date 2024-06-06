import { useEffect, useState } from "react";
import { fetchProducts } from "../lib/api";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Products = ({ category = null }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();

      const productsWithDiscounts = products.map((product) => {
        const discount = getRandomDiscount();
        const discountedPrice = calculateDiscountedPrice(
          product.price,
          discount
        );
        return {
          ...product,
          discount,
          discountedPrice,
        };
      });

      if (category) {
        const filteredProducts = productsWithDiscounts.filter(
          (product) => product.category === category.replace(/-/g, " ")
        );
        setProducts(filteredProducts);
      } else {
        setProducts(productsWithDiscounts);
      }
    };
    getProducts();
  }, [category]);

  const getRandomDiscount = () => {
    return Math.floor(Math.random() * 51) + 30; // Random discount between 30% and 80%
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{ category ? category : "All Products"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded relative">
            <div className="absolute top-5 right-5 text-white">
              <FaRegBookmark size={24} />
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700">
                <span className="text-xl font-bold">
                  ${product.discountedPrice}
                </span>
                <span className="line-through ml-2 text-gray-500">
                  ${product.price}
                </span>
                <span className="text-green-600 ml-2">
                  ({product.discount}% Off)
                </span>
              </p>
              <div className="text-gray-700">
                <MdOutlineAddShoppingCart size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
