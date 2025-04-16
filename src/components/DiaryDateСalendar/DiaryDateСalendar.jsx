import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DiaryDateСalendar = ({ date, setDate }) => {
  return (
    <DatePicker
      dateFormat="dd.MM.yyyy"
      selected={date}
      onChange={(date) => setDate(date)}
      className="text-xl font-bold w-[116px] h-[20px] ml-21"
    />
  );
};
