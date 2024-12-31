import React from "react";
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { createProductAsync, selectBrands, selectCategories } from "../../product/productSlice";

function ProductForm() {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    
    formState: { errors },
  } = useForm();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-8 bg-white mt-5 min-h-screen">
      <form
        noValidate
        onSubmit={handleSubmit((data)=>{
          console.log(data)
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          delete product['image1'];
          delete product['image2'];
          delete product['image3'];
          product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;
dispatch(createProductAsync(product))

        })}
        className="px-8 py-5 my-12 bg-white"
      >
        <div>
        
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 text-lg font-semibold text-gray-600">
             Add your product carefully!
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    type="text"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="rating"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Rating
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="rating"
                    {...register("rating", {
                      required: "Rating Number is required",
                      min: 1,
                    })}
                    autoComplete="rating"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.rating && (
                    <p className="text-red-500">{errors.rating.message}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    placeholder="Write a few sentences about your Product..."
                    {...register("title", {
                      required: "Description is required",
                    })}
                    rows={3}
                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
                 
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="price"
                    {...register("price", {
                      required: "Price Number is required",
                      min: 1,
                    })}
                    autoComplete="price"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      min: 0,
                      max: 100,
                      required: "Discount Percentage is required",
                    })}
                    autoComplete="discountPercentage"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.discountPercentage && (
                    <p className="text-red-500">{errors.discountPercentage.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="stock"
                    {...register("stock", {
                      min:0,
                      required: "Stock Number is required",
                    })}
                    autoComplete="stock"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.stock && (
                    <p className="text-red-500">{errors.stock.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    {...register("category", {
                      required: "Category is Required",
                    })}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="brand"
                    name="brand"
                    autoComplete="brand"
                    {...register("brand", {
                      required: "Brand is Required",
                    })}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                  {errors.brand && (
                    <p className="text-red-500">{errors.brand.message}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    placeholder="Paste URL...."
                    {...register("thumbnail", {
                      required: " Required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.thumbnail && (
                    <p className="text-red-500">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="image1"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    id="image1"
                    name="image1"
                    placeholder="Paste URL...."
                    {...register("image1", {
                      required: " Required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.image1 && (
                    <p className="text-red-500">
                      {errors.image1.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="image2"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    id="image2"
                    name="image2"
                    placeholder="Paste URL...."
                    {...register("image2", {
                      required: " Required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.image2 && (
                    <p className="text-red-500">
                      {errors.image2.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="image3"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    id="image3"
                    name="image3"
                    placeholder="Paste URL...."
                    {...register("image3", {
                      required: " Required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.image3 && (
                    <p className="text-red-500">
                      {errors.image3.message}
                    </p>
                  )}
                </div>
              </div>
             
              

               
            </div>
          </div>
          {/* button */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => reset()}
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
