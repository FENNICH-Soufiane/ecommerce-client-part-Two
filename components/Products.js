import Link from "next/link";
import { CartContext } from "@/lib/CartContext";
import { useContext } from "react";
import toast from 'react-hot-toast';

/* eslint-disable @next/next/no-img-element */
const Products = ({ products }) => {
  // Utility function to format price with a comma for thousands
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { addProduct } = useContext(CartContext);
  

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold tracking-tight text-text">
            Our Latest Products
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {products?.length > 0 &&
              products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
                    <div className="p-1">
                      <div className="relative h-[300px] sm:h-[300px]">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
                        />
                        <img
                          src={product.images[1]}
                          alt=""
                          className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                        />
                      </div>
                      <div className="relative  p-3 border-t">
                        <Link href={"/products/" + product._id}>
                          <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
                            {product.title}
                          </h3>
                        </Link>
                        <div className="mt-1.5 flex items-center justify-between text-text">
                          <p className="tracking-wide text-primary">
                            DH. {formatPrice(product.price)}
                          </p>
                          <button
                          onClick={() => {addProduct(product._id); toast.success('Item Added Successfully to Cart !')}}
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 hover:border-secondary"
                          >
                            Add
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
