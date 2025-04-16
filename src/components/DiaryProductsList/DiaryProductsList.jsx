import React from 'react';
import { DiaryProductsListItem } from '../DiaryProductsListItem/DiaryProductsListItem';
import './scrollbar.css';

export const DiaryProductsList = ({ products = [], setProducts, date }) => {
  function handleDelete(id) {
    setProducts((prev) =>
      prev.filter((product) => product.productId._id !== id),
    );
  }

  return (
    <ul className="my-scrollbar flex flex-col max-h-[300px] overflow-y-scroll xl:mt-10 xl:max-h-[400px] xl:max-w-fit xl:pr-5">
      {products.map((product) => (
        <DiaryProductsListItem
          key={product._id}
          name={product.productId.title}
          grams={product.productWeight}
          calories={(product.productId.calories * product.productWeight) / 100}
          id={product.productId._id}
          date={date}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
