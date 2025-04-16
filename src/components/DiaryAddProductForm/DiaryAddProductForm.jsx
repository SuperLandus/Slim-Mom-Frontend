import React, { useState, useEffect } from 'react';
import addVector from '/svg/add.svg';
import calendar from '/svg/calendar.svg';
import axios from 'axios';
import { DiaryDateСalendar } from '../DiaryDateСalendar/DiaryDateСalendar';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const DiaryAddProductForm = ({ date, setDate, onAddSuccess }) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [weight, setWeight] = useState('');
  const [itemId, setItemId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const { token } = useSelector((state) => state.auth);

  function deleteList() {
    setFilteredItems([]);
  }

  async function addProduct() {
    if (!token) {
      toast.error('You must be logged in to add a product!');
    }
    if (itemId && weight) {
      try {
        await axios.post(
          'https://slimmom-backend-s8n8.onrender.com/user/products',
          {
            productId: itemId,
            productWeight: weight,
            date,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // Trigger re-fetch in DiaryPage, so the new item appears right away
        onAddSuccess && onAddSuccess();
        // Reset fields
        setSelectedTitle('');
        setItemId('');
        setWeight('');
      } catch (err) {
        toast.error('Failed to add product', err);
      }
    } else {
      toast.error('You need to choose both item and the grams');
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (query.length >= 2) {
        const data = await axios.get(
          `https://slimmom-backend-s8n8.onrender.com/products/searchProducts?title=${query}`,
        );
        setFilteredItems(data.data.data);
      } else {
        setFilteredItems([]);
      }
    }
    fetchData();
  }, [query]);

  return (
    <>
      <div className="flex gap-1.25 mb-8">
        <DiaryDateСalendar date={date} setDate={setDate} />
        <img src={calendar} width={15} height={15} />
      </div>
      <form
        className="flex flex-col items-center md:flex-row md:items-baseline md:justify-start md:gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:flex md:flex-col w-full md:max-w-[240px] mb-5">
          <input
            type="search"
            value={selectedTitle}
            onChange={(e) => {
              setSelectedTitle(e.target.value);
              setQuery(e.target.value);
            }}
            placeholder="Enter product name"
            className="border-b-2 border-gray-200 w-full active:border-gray-400 focus:border-gray-400 placeholder:font-bold placeholder:text-gray-400 pb-1 md:pb-4 md:w-[240px]"
          />
          {filteredItems.length > 0 && (
            <ul className="flex flex-col border-l-2 border-r-2 border-b-2 border-gray-400">
              {filteredItems.map((item) => (
                <li
                  key={item._id}
                  className="cursor-pointer hover:bg-gray-200 not-last:border-b-2 border-gray-400 p-0.5"
                  onClick={() => {
                    setSelectedTitle(item.title);
                    setItemId(item._id);
                    deleteList();
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="number"
          placeholder="Grams"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border-b-2 border-b-gray-200 w-full placeholder:font-bold placeholder:text-gray-400 pb-1 mb-5 md:max-w-[110px] md:mb-0 md:text-end md:pb-4 md:mr-10"
        />

        <button
          type="button"
          className="bg-[#FC842D] rounded-full cursor-pointer w-12 h-12 shadow-[0_4px_10px_rgba(252,132,45,0.5)] justify-items-center mb-10 md:mb-0 md:self-start"
          onClick={addProduct}
        >
          <img src={addVector} className="w-5 h-5" />
        </button>
      </form>
    </>
  );
};

export default DiaryAddProductForm;
