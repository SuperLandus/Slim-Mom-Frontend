import React from 'react';
import axios from 'axios';

export const DiaryProductsListItem = ({
  grams,
  name,
  calories,
  id,
  date,
  onDelete,
}) => {
  async function deleteProduct(id, date) {
    await axios.delete(
      `https://slimmom-backend-s8n8.onrender.com/user/products/${id}?date=${date}`,
      onDelete(id),
    );
  }

  return (
    <li className="flex flex-row pl-2 pt-2 pb-2 gap-10 border-gray-300 w-full">
      <p className="border-b-2 border-gray-200 p-1 text-nowrap overflow-x-scroll w-[110px] md:w-[240px] xl:overflow-x-hidden">
        {name}
      </p>
      <p className="border-b-2 border-gray-200 p-1 text-nowrap w-[38px] md:w-[100px] md:text-right">
        {grams} g
      </p>
      <p className="border-b-2 border-gray-200 p-1 text-nowrap w-[65px] md:w-[106px] md:text-right">
        {Math.round(calories)} kcal
      </p>
      <button onClick={() => deleteProduct(id, date)}>
        <img
          width="30"
          height="30"
          className="cursor-pointer md:hover:opacity-100 opacity-75"
          src="https://img.icons8.com/ios-filled/555555/multiply.png"
          alt="multiply"
        />
      </button>
    </li>
  );
};
