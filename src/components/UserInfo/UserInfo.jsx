//////

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authOps';
import LogoutModal from '../LogoutModal/LogoutModal';

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = useSelector((state) => state.auth.user?.name);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    if (!token) {
      console.warn('User already logged out, skipping logout request.');
      return;
    }

    dispatch(logoutUser());
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center text-sm w-full">
      {/* Username */}
      <span
        className="font-bold text-[14px] leading-[1] tracking-[0.04em] text-black"
        style={{ fontFamily: 'Verdana, sans-serif' }}
      >
        {username}
      </span>

      {/* Ayraç */}
      <span className="mx-2 h-10 border-2 border-gray-300"></span>

      {/* Exit */}
      {isLoggedIn && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="font-bold text-[14px] leading-[1] tracking-[0.04em] text-[#9B9FAA] hover:text-gray-600 transition"
          style={{ fontFamily: 'Verdana, sans-serif' }}
        >
          Exit
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <LogoutModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default UserInfo;
