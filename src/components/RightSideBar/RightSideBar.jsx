import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RightSideBar = ({ selectedDate, date, products }) => {
  const [consumedCalories, setConsumedCalories] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const [userNeeds, setUserNeeds] = useState('');

  let formattedDate = '';

  try {
    if (date) {
      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() + 3); // Adjust to +3 timezone
      formattedDate = adjustedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
  } catch (err) {
    console.error('Date format error:', err);
  }

  // Günlük tüketilen kalori verisini API'den çek
  useEffect(() => {
    const fetchDailyCalories = async () => {
      // Token veya tarih yoksa istek atma
      if (!token || !formattedDate) {
        setConsumedCalories(0);
        return;
      }

      try {
        const res = await axios.get(
          `https://slim-mom-backend-bhhk.onrender.com/user/my-daily-calories?date=${formattedDate}`,
        );

        setConsumedCalories(res.data.totalCalories || 0);
      } catch (err) {
        console.log('Daily Calories Error:', err);
      }
      try {
        const res = await axios.get(
          `https://slim-mom-backend-bhhk.onrender.com/user/my-daily-calory-needs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUserNeeds(res.data.data.dailyRate);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDailyCalories();
  }, [selectedDate, formattedDate, token, products]);

  const leftCalories = userNeeds - consumedCalories;
  return (
    <aside
      className="
        relative
        flex flex-col 
        items-start 
        gap-8
        w-full
        md:min-h-screen
        p-6 md:p-10
        rounded-lg
        shadow-md
        bg-[url('/yapraklar.png')]
        bg-no-repeat
        bg-[position:70%_top]
        md:bg-[position:12px_35px]
        md:bg-[length:auto_100%]
        bg-[#F0F1F3]
      "
    >
      {/* Summary */}
      <div className="flex flex-col items-start gap-4 mb-12 w-full">
        <h3 className="font-verdana font-bold text-sm tracking-wider">
          Summary for {new Date(formattedDate).toLocaleDateString()}
        </h3>

        <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] leading-[18px] tracking-[0.04em] space-y-4 w-full">
          <li className="flex justify-between gap-4">
            <span>Left</span>
            <span
              className={leftCalories < 0 ? 'text-[#c41c16]' : 'text-[#9B9FAA]'}
            >
              {Math.floor(leftCalories)} kcal
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span>Consumed</span>
            <span>{Math.round(consumedCalories)} kcal</span>
          </li>
          <li className="flex justify-between gap-4">
            <span>Daily rate</span>
            <span>{userNeeds ?? 0} kcal</span>
          </li>
          <li className="flex justify-between gap-4">
            <span>% of normal</span>
            <span>
              {userNeeds
                ? `${Math.round((consumedCalories / userNeeds) * 100)}%`
                : '0%'}
            </span>
          </li>
        </ul>
      </div>

      {/* Yasaklı yiyecekler */}
      {/* <div className="flex flex-col items-start gap-4 w-full">
        <h3 className="text-md font-bold">Food not recommended</h3>
        {notAllowedFoods.length > 0 ? (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] list-decimal list-inside space-y-2">
            {notAllowedFoods.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No food restrictions</p>
        )}
      </div> */}
    </aside>
  );
};

export default RightSideBar;
