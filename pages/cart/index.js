/* eslint-disable @next/next/no-img-element */
import { CartContext } from "@/lib/CartContext";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Cart = () => {
  const { cartProducts, removeProduct, addProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        console.log("Response from server:", response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  const increaseProduct = (id) => {
    addProduct(id);
  };

  const decreaseProduct = (id) => {
    removeProduct(id);
    toast.success("Removed product!!");
  };
  const deleteCart = (id) => {
    clearCart();
    toast.success("Cart cleared!!");
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  return (
    <>
      <section className="flex justify-between max-md:flex-col space-x-4 ">
        <div className=" md:w-2/3  px-4">
          <div className=" mt-16 md:mt-6 ">
            <header className="text-center flex justify-between w-full">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>
            {!products?.length ? (
              <p className="my-6 text-center ">Your cart is empty</p>
            ) : (
              products?.length > 0 && (
                <div className="mt-8">
                  <ul className="space-y-4">
                    {products.map((product) => (
                      <li
                        key={product._id}
                        className="flex items-center gap-4 justify-between"
                      >
                        <img
                          src={product.images[0]}
                          alt="cart image"
                          className="h-16 w-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-md text-text max-w-md">
                            {product.title}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-text">
                            <p>
                              DH .
                              {cartProducts.filter((id) => id === product._id)
                                .length * product.price}
                            </p>
                          </dl>
                        </div>
                        <div>
                          <label htmlFor="Quantity" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border "
                              onClick={() => decreaseProduct(product._id)}
                            >
                              -
                            </button>

                            <input
                              type="number"
                              id="Quantity"
                              value={
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                              className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                            />

                            <button
                              type="button"
                              className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                              onClick={() => increaseProduct(product._id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className=" max-w-md space-y-4">
                <dl className="space-y-0.5 text-md text-gray-700">
                  <div className="flex justify-end text-red-400 border-b mb-3">
                    <button onClick={deleteCart}>Clear Cart</button>
                  </div>
                  <div className="flex justify-between">
                    <dt>Total&nbsp;</dt>
                    <dd>DH. {formatPrice(total)}</dd>
                  </div>
                </dl>
                <div className="flex justify-end">
                  <Link
                    class="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-primary transition-colors hover:bg-primary focus:outline-none focus:ring active:bg-primary"
                    href="/products"
                  >
                    <span class="font-medium transition-colors group-hover:text-white">
                      {" "}
                      Continue Shopping{" "}
                    </span>

                    <span class="shrink-0 rounded-full border border-primary bg-white p-2 group-active:border-primary">
                      <svg
                        class="h-5 w-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </section>
    </>
  );
};

export default Cart;
