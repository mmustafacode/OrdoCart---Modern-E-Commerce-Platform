import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App = () => {
    const location = useLocation();
    // Don't add top padding on home page so hero connects with header
    const isHome = location.pathname === '/';

    return (
        <>
            <CustomCursor />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className={`flex-grow ${isHome ? '' : 'pt-24'}`}>
                    <div className="min-h-screen">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
            <ToastContainer />
        </>
    );
};

export default App;
