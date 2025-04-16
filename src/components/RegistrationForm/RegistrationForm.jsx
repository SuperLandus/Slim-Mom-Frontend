import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../redux/auth/authOps';

const RegistrationForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
      .required('E-mail is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const { name, email, password } = values;
      await dispatch(
        registerUser({ name, email, password }),
      ).unwrap();
        toast.success('Registration is successful.');
        resetForm();
    } catch (error) {
      if (error.code === 11000 || error.message?.includes('already exists')) {
        toast.error('User already exists. Please try a different email.');
      } else {
        toast.error('Registration failed, please try again.');
      }
      resetForm();
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <>
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-start space-y-6 sm:gap-5 w-full justify-center p-2 md:p-8">
          <h1 id="registerHeader" className="text-orange-500 font-bold">
            REGISTER
          </h1>
          <div className="flex flex-col md:flex-row">
            <Field
              name="name"
              id={nameFieldId}
              type="text"
              placeholder="Name *"
              className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
              autoFocus
            />
            <ErrorMessage
              name="name"
              component="span"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex flex-col md:flex-row">
            <Field
              name="email"
              id={emailFieldId}
              type="email"
              placeholder="Email *"
              className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />
            <ErrorMessage
              name="email"
              component="span"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex flex-col md:flex-row">
            <Field
              name="password"
              id={passwordFieldId}
              type="password"
              placeholder="Password *"
              className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />
            <ErrorMessage
              name="password"
              component="span"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FC842D] cursor-pointer text-white px-6 py-2 w-30 h-10 rounded-full hover:bg-orange-600"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              className="bg-white cursor-pointer text-[#FC842D] px-6 py-2 w-30 h-10 rounded-full hover:bg-orange-600 border-orange-500 border-2"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
     </>
  );
};

export default RegistrationForm;
