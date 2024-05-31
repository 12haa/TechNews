import React from "react"
import {categoriesData} from "@/data";
import Link from "next/link";

const CategoriesList = () => {
    console.log(categoriesData)
    return (
        <div className="flex gap-2 text-sm font-medium text-gray-900 flex-wrap ">
            {categoriesData && categoriesData.map((item, index: number) => (
                <Link href={`/categories/${item.name}`} key={item.id}
                      className="px-4 py-2 rounded-md bg-slate-800 text-white cursor-pointer">{item.name}</Link>

            ))}

        </div>
    )
}

export default CategoriesList;
