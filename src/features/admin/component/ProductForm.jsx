import React, { useDeferredValue, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { Link, useParams } from "react-router";

function ProductForm() {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

 
  

useEffect(()=>{
  if (params.id) {
    dispatch(fetchProductByIdAsync(params.id))
     if (selectedProduct) {
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      // setValue("highlight1", selectedProduct?.highlights[0]);
      // setValue("highlight2", selectedProduct?.highlights[1]);
      // setValue("highlight3", selectedProduct?.highlights[2]);
      // setValue("highlight4", selectedProduct?.highlights[3]);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("price", selectedProduct.price);
      setValue("rating", selectedProduct.rating);
      setValue("stock", selectedProduct.stock);
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
     }

  }
},[dispatch, params.id])


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-8 bg-white mt-5 min-h-screen">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
         
          const product = { ...data, reviews: [] };
          product.images = [product.image1, product.image2, product.image3];
          product.highlights = [
            product.highlight1,
            product.highlight2,
            product.highlight3,
            product.highlight4,
          ];
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          delete product["highlight1"];
          delete product["highlight2"];
          delete product["highlight3"];
          delete product["highlight4"];
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;
          product.id = selectedProduct.id;
          if (params.id) {
            dispatch(updateProductAsync(product));
            console.log(product)
          } else {
            dispatch(createProductAsync(product));
            
          }
          
          // reset();
        })}
        className="px-8 py-5 my-12 bg-white"
      >
        <div>
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 text-lg font-semibold text-gray-600">
              Add your product carefully!
            </p>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* title and rating */}
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
              {/* description */}
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
                    {...register("description", {
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
              {/* Product Highlights */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="highlight1"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Highlight 1
                </label>
                <div className="mt-2">
                  <input
                    id="highlight1"
                    type="text"
                    {...register("highlight1", {
                      required: "Highlight 1 is required",
                    })}
                    autoComplete="highlight1"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.highlight1 && (
                    <p className="text-red-500">{errors.highlight1.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="highlight2"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Highlight 2
                </label>
                <div className="mt-2">
                  <input
                    id="highlight2"
                    type="text"
                    {...register("highlight2", {
                      required: "Highlight 2 is required",
                    })}
                    autoComplete="highlight2"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.highlight2 && (
                    <p className="text-red-500">{errors.highlight2.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="highlight3"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Highlight 3
                </label>
                <div className="mt-2">
                  <input
                    id="highlight3"
                    type="text"
                    {...register("highlight3", {
                      required: "Highlight 3 is required",
                    })}
                    autoComplete="highlight3"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.highlight3 && (
                    <p className="text-red-500">{errors.highlight3.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="highlight4"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Highlight 4
                </label>
                <div className="mt-2">
                  <input
                    id="highlight4"
                    type="text"
                    {...register("highlight4", {
                      required: "Highlight 4 is required",
                    })}
                    autoComplete="highlight4"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.highlight4 && (
                    <p className="text-red-500">{errors.highlight4.message}</p>
                  )}
                </div>
              </div>
              {/* price discount-percentage stock */}
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
                    <p className="text-red-500">
                      {errors.discountPercentage.message}
                    </p>
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
                      min: 0,
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
              {/* category and brand */}
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
              {/* thumbnail and image  */}
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
                    <p className="text-red-500">{errors.thumbnail.message}</p>
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
                    <p className="text-red-500">{errors.image1.message}</p>
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
                    <p className="text-red-500">{errors.image2.message}</p>
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
                    <p className="text-red-500">{errors.image3.message}</p>
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
              className="font-medium text-gray-900 border-2 rounded-md border-indigo-600 text-sm px-5 py-2"
            >
              Reset
            </button>
            <Link to="/admin">
              <button
                onClick={() => reset()}
                type="button"
                className="font-medium text-gray-900 border-2 rounded-md border-indigo-600 text-sm px-5 py-2"
              >
                Close
              </button>
            </Link>
            <button
              type="submit"
              className="font-medium border-2 rounded-md border-green-700  text-white bg-green-700 text-sm px-5 py-2"
            >
              {params.id ? "Edit Product" : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
