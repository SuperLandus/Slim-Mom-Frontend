import { useSelector } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const RegistrationPage = () => {
  const { isLoggedIn, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/register', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error)
    toast.error(error.message || 'An error occurred!');

  }, [error]);

  return (
    <>
      {error && (
        <p className="text-red-500">
          Whoops, something went wrong! Please try reloading this page!
        </p>
      )}
      <RegistrationForm />
      <Toaster />
    </>
  );
};

export default RegistrationPage;
