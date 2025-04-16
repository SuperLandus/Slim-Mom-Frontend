import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from '../../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar/RightSideBar';

const DiaryPage = () => {
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const isPersistLoaded = useSelector((state) => state.auth.token !== null);
  const navigate = useNavigate();

  const fetchProducts = async (selectedDate) => {
    try {
      const response = await axios.get(
        `https://slimmom-backend-s8n8.onrender.com/user/products?date=${selectedDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setProducts(response.data.products);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (!isPersistLoaded) return;

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchProducts(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, token, navigate, isPersistLoaded]);

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="m-2.5 p-2.5">
        {/* Pass a callback to re-fetch or locally update products after adding */}
        <DiaryAddProductForm
          date={date}
          setDate={setDate}
          onAddSuccess={() => fetchProducts(date)}
        />
        <DiaryProductsList
          products={products}
          setProducts={setProducts}
          date={date}
        />
      </div>
      <div>
        <RightSideBar date={date} products={products} />
      </div>
    </div>
  );
};

export default DiaryPage;
