"use client";
import Products from "@/app/components/Products";

const CategoryPage = ({ params }) => {
  const category = params.slug;
 
  return (
    <>
    <Products category={category}/>
    </>
  );
};

export default CategoryPage;
