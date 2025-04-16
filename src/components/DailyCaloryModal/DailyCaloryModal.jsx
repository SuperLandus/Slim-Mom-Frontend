import { useEffect } from 'react';

function DailyCaloryModal({ setDailyRate, dailyRate }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setDailyRate(null);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setDailyRate]);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      setDailyRate(null);
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={(e) => handleOutsideClick(e)}
      className="fixed top-0  z-60 w-full h-full bg-white md:bg-gray-500/50 flex items-center justify-center"
    >
      <div className="py-[40px] px-[20px] bg-white  items-center justify-center  ">
        <div className="flex flex-col gap-[40px] md:py-[64px] md:px-[82px] md:max-w-[608px] relative ">
          <button
            onClick={() => setDailyRate(null)}
            className="absolute top-10 right-10 cursor-pointer hidden md:block"
          >
            &#10005;
          </button>
          <h2 className="font-bold text-[18px] md:text-[28px] md:text-center">
            Your recommended daily calorie intake is
          </h2>

          <h2 className="font-bold text-[48px] text-center">
            {dailyRate.dailyRate}
            <span className="font-bold text-[16px]">KCAL</span>
          </h2>

          <div className="border-t border-gray-200 pt-[20px]">
            <h2 className="font-bold text-[14px] mb-[20px]">
              Foods you should not eat
            </h2>
            <ol className="list-decimal list-inside text-[#9B9FAA]">
              {dailyRate.notAllowedFoods.map((food) => {
                food = food.split('')[0].toUpperCase() + food.slice(1);
                return <li key={food}>{food}</li>;
              })}
            </ol>
          </div>

          <button
            onClick={() => setDailyRate(null)}
            type="submit"
            className="self-center font-bold bg-orange-500 text-white p-2 rounded-full px-[25px] py-[13px] mt-[40px]"
          >
            Start losing weight
          </button>
        </div>
      </div>
    </div>
  );
}

export default DailyCaloryModal;
