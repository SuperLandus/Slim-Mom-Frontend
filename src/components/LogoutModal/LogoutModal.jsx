import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authOps';
import { useNavigate } from 'react-router-dom';

const motivationalMessages = [
  'Her sağlıklı seçim, seni hedeflerine bir adım daha yaklaştırır!',
  'Bugün sağlıklı bir adım at, yarın kendine teşekkür edeceksin!',
  'Vücudun en değerli varlığın, ona hak ettiği özeni göster!',
  'Zor olan başlamak değil, eski alışkanlıklara geri dönmemektir. Sen güçlüsün!',
  "Ne yersen O'sun! Kendine iyi bak, kaliteli yakıtla beslen!",
  'Kendini sevmenin en güzel yolu, bedenine en iyisini sunmaktır!',
  'Değişim sihirli bir olay değil, tutarlı çabaların toplamıdır!',
  'Her gün, yeni ve sağlıklı bir başlangıç yapma şansın var!',
  'Küçük değişiklikler büyük dönüşümlere yol açar. Sabırlı ol, istikrarlı ol!',
  'Bugün vazgeçersen, yarın yeniden başlamak zorunda kalırsın!',
  'Bedenin sana yıllarca hizmet edecek, ona iyi davran!',
  'Sağlıklı olmak bir yaşam tarzıdır, geçici bir diyet değil!',
  'Egzersiz sadece vücudunu değil, zihnini de güçlendirir!',
  'İlerlemen yavaş olabilir ama asla durma!',
  'Daha sağlıklı bir sen için, her gün biraz daha iyi olmaya çalış!',
];

const healthyImages = [
  '/img/ModalImages/apple.jpg',
  '/img/ModalImages/avocado.jpg',
  '/img/ModalImages/banana.jpg',
  '/img/ModalImages/blueberries.jpg',
  '/img/ModalImages/broccoli.jpg',
  '/img/ModalImages/carrot.jpg',
  '/img/ModalImages/orange.jpg',
  '/img/ModalImages/spinach.jpg',
  '/img/ModalImages/strawberry.jpg',
  '/img/ModalImages/watermelon.jpg',
];

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const randomMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];
  const randomImage =
    healthyImages[Math.floor(Math.random() * healthyImages.length)];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center w-[600px] relative">
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-gray-800">
          Çıkış yapmak istediğinizden emin misiniz?
        </h2>

        {/* Motivasyon Mesajı */}
        <p className="mt-8 text-lg font-semibold text-green-600 italic">
          {randomMessage}
        </p>

        {/* Rastgele Sağlıklı Görsel */}
        <div className="flex justify-center mt-4">
          <img
            src={randomImage}
            alt="Healthy Food"
            className="w-128 h-128 object-contain"
          />
        </div>

        {/* Butonlar */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-orange-400 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-orange-500 transition"
          >
            No
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border-2 border-orange-400 text-orange-400 rounded-lg font-semibold text-lg shadow-md hover:bg-orange-400 hover:text-white transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
