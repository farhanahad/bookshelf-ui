// import Navbar from '../pages/Home/Navbar/Navbar';
import Footer from '@/Shared/Footer';
import Navbar from '@/Shared/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
