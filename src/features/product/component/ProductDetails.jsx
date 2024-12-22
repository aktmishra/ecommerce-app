"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectProductById } from "../productSlice";

const reviews = { href: "#", average: 4, totalCount: 117 };
const colors =  [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];
const sizes= [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true }
];
const highlights= [
  'Hand cut and sewn locally',
  'Dyed with our proprietary colors',
  'Pre-washed & pre-shrunk',
  'Ultra-soft 100% cotton',
]
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDeatails() {
  // TODO: in server data we will add color size highlight
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProductById); // here when I refresh the page then the value of selectedProduct become null in store.state even
  //   after going back to the main page the value still remain null and prodcutDetail component doesn't render but when using 
  // static value of product, component rendered even the value of selectedProduct keep on updating in store.state 
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id
  console.log(params)
  //  const product = [{
  //   "id": 11,
  //   "title": "Annibale Colombo Bed",
  //   "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
  //   "category": "furniture",
  //   "price": 1899.99,
  //   "discountPercentage": 0.29,
  //   "rating": 4.14,
  //   "stock": 47,
  //   "tags": ["furniture", "beds"],
  //   "brand": "Annibale Colombo",
  //   "sku": "4KMDTZWF",
  //   "weight": 3,
  //   "dimensions": { "width": 28.75, "height": 26.88, "depth": 24.47 },
  //   "warrantyInformation": "2 year warranty",
  //   "shippingInformation": "Ships overnight",
  //   "availabilityStatus": "In Stock",
  //   "reviews": [
  //     {
  //       "rating": 4,
  //       "comment": "Great value for money!",
  //       "date": "2024-05-23T08:56:21.620Z",
  //       "reviewerName": "Julian Newton",
  //       "reviewerEmail": "julian.newton@x.dummyjson.com"
  //     },
  //     {
  //       "rating": 5,
  //       "comment": "Would buy again!",
  //       "date": "2024-05-23T08:56:21.620Z",
  //       "reviewerName": "Madison Collins",
  //       "reviewerEmail": "madison.collins@x.dummyjson.com"
  //     },
  //     {
  //       "rating": 4,
  //       "comment": "Would buy again!",
  //       "date": "2024-05-23T08:56:21.620Z",
  //       "reviewerName": "Clara Berry",
  //       "reviewerEmail": "clara.berry@x.dummyjson.com"
  //     }
  //   ],
  //   "returnPolicy": "7 days return policy",
  //   "minimumOrderQuantity": 1,
  //   "meta": {
  //     "createdAt": "2024-05-23T08:56:21.620Z",
  //     "updatedAt": "2024-05-23T08:56:21.620Z",
  //     "barcode": "7113807059215",
  //     "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
  //   },
  //   "images": [
  //     "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png",
  //     "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/2.png",
  //     "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/3.png"
  //   ],
  //   "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png"
  // }]
 
  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch,params.id]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium text-gray-900">
                  {product[0].category}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product[0].title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={product[0].title}
            src={product[0].images[0] || product[0].thumbnail}
            className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={product[0].title}
              src={product[0].images[1] || product[0].thumbnail}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
            <img
              alt={product[0].title}
              src={product[0].images[2] || product[0].thumbnail}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
          </div>
          <img
            alt={product[0].title}
            src={product[0].images[3] || product[0].thumbnail}
            className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product[0].price}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <p className="mr-2 text-sm text-gray-800">{product[0].rating} </p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-yellow-500"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>

                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {product[0].reviews.length} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center space-x-3"
                  >
                    {colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={classNames(
                          color.selectedClass,
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "size-8 rounded-full border border-black/10"
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                        )}
                      >
                        <span>{size.name}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 size-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <Link to="/cart">
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </Link>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product[0].description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
