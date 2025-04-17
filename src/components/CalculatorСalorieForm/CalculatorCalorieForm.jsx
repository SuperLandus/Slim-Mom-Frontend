import {
  calculatorSchema,
  calculatorInitialValues,
} from '../../validations/schemas/calculatorSchema';
import { Formik, Form } from 'formik';
import CalculatorFormFields from '../CalculatorFormFields.jsx/CalculatorFormFields';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import DailyCaloryModal from '../DailyCaloryModal/DailyCaloryModal';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useSelector } from 'react-redux';

function CalculatorCalorieForm({ setDailyRateData }) {
  const [dailyRate, setDailyRate] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmit = async (values) => {
    console.log(isLoggedIn);

    if (isLoggedIn) {
      try {
        const res = await axios.get(
          'https://slim-mom-backend-nbxd.onrender.com/user/my-daily-calory-needs',
          values,
        );
        setDailyRate(res.data.data);
        setDailyRateData(res.data.data); // This line is added Murat
      } catch (e) {
        console.error(e);
        toast.error(e.response.data.message);
      }
    } else {
      try {
        const res = await axios.post(
          'https://slim-mom-backend-nbxd.onrender.com/user/daily-calory-needs',
          values,
        );
        setDailyRate(res.data.data);
        setDailyRateData(res.data.data); // This line is added Murat
      } catch (e) {
        console.error(e);
        toast.error(e.response.data.message);
      }
    }
  };

  return (
    <>
      {dailyRate ? (
        <DailyCaloryModal dailyRate={dailyRate} setDailyRate={setDailyRate} />
      ) : null}
      <div className="px-[20px] py-[32px] flex flex-col gap-[40px] md:max-w-[608px] ">
        <h2 className="font-bold text-[18px] md:text-[34px] ">
          Calculate your daily calorie intake right now
        </h2>
        <Formik
          initialValues={calculatorInitialValues}
          validationSchema={calculatorSchema}
          onSubmit={handleSubmit}
        >
          {({ values, submitForm, isSubmitting }) => (
            <>
              <Form className=" space-y-4 form flex flex-col font-bold md:flex-row md:flex-wrap md:gap-[32px]">
                {isSubmitting ? (
                  <PacmanLoader color="#FF751D" />
                ) : (
                  <CalculatorFormFields values={values} />
                )}
              </Form>
              <button
                onClick={submitForm}
                type="submit"
                className="font-bold bg-orange-500 text-white p-2 rounded-full px-[25px] py-[13px] md:self-end xl:self-start"
              >
                Start losing weight
              </button>
            </>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CalculatorCalorieForm;
