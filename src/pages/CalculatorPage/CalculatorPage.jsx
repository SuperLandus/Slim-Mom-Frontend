import CalculatorCalorieForm from '../../components/CalculatorСalorieForm/CalculatorCalorieForm';
import RideSideBar from '../../components/RightSideBar/RightSideBar';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function CalculatorPage() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [dailyRateData, setDailyRateData] = useState(null);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <CalculatorCalorieForm setDailyRateData={setDailyRateData} />
      {isLoggedIn && (
        <div className="w-full md:w-1/3 min-w-[250px]">
          <RideSideBar dailyRateData={dailyRateData} />
        </div>
      )}
    </div>
  );
}

export default CalculatorPage;
