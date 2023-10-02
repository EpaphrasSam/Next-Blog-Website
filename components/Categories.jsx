"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/store/blog";
import Link from "next/link";
import { getCategories } from "@/services";
import { RotatingLines } from "react-loader-spinner";

const Categories = () => {
  const { categories } = useStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    getCategories().then((newCategories) => {
      useStore.setState({ categories: newCategories });
      setIsDataLoaded(true);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {!isDataLoaded ? (
        <div className=" flex items-center justify-center">
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        </div>
      ) : (
        categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cursor-pointer block pb-3 mb-3">
              {category.name}
            </span>
          </Link>
        ))
      )}
    </div>
  );
};

export default Categories;
