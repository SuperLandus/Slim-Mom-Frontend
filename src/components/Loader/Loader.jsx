import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
  const loading = useSelector((state) => state.loader.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );
};

export default Loader;
