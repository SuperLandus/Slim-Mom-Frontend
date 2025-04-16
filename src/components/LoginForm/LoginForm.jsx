import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/authOps';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      toast.success('Login is successful.');
      resetForm();
    } catch (error) {
      toast.error(`Login failed: ${error.message || 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email!').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Too long')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="">
          <Form className="flex flex-col items-start space-y-6 sm:gap-5 w-full justify-center p-2 md:p-8">
            <h1 id="loginHeader" className="text-orange-500 font-bold mb-10">
              LOGIN
            </h1>
            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#FC842D] cursor-pointer text-white px-6 py-2 w-30 h-10  rounded-full hover:bg-orange-600 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <button
                type="button"
                className="bg-white cursor-pointer text-[#FC842D] px-6 py-2 w-30 h-10  rounded-full hover:bg-orange-600 border-orange-500 border-2"
                onClick={() => {
                  navigate('/register');
                }}
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
