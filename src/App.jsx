import { Toaster } from 'react-hot-toast';
import Background from './components/Background/Background';
import AppRoutes from './routers/AppRoutes';
import UserInfo from './components/UserInfo/UserInfo';
import Header from './components/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Background>
        <AppRoutes />
      </Background>
    </>
  );
};

export default App;
