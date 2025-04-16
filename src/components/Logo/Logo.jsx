import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const handleClick = () => {
    if (!loginState) {
      navigate('/');
    } else {
      navigate('/diary');
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src="../../../../logo.svg" />
    </div>
  );
};

export default Logo;
