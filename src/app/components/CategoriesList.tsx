import React from "react";
import Link from "next/link";
import { TCategory } from "@/app/types";

const CategoriesList = async () => {
  const categoriesData = await getCategories();
  return (
    <div className="flex gap-2 text-sm font-medium text-gray-900 flex-wrap ">
      {categoriesData &&
        categoriesData.map((item: TCategory, index: number) => (
          <Link
            href={`/categories/${item.catName}`}
            key={item.id}
            className="px-4 py-2 rounded-md bg-slate-800 text-white cursor-pointer"
          >
            {item.catName}
          </Link>
        ))}
    </div>
  );
};
export default CategoriesList;
const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (response.ok) {
      const categories = await response.json();
      return categories;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
