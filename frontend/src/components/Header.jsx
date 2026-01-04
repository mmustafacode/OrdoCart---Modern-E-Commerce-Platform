import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, ChevronDown, Search, Heart } from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useState, useEffect } from 'react';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [logoutApiCall] = useLogoutMutation();
    const [scrolled, setScrolled] = useState(false);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    // Header is transparent only on Homepage AND when not scrolled
    const isTransparent = location.pathname === '/' && !scrolled;

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-500 ${!isTransparent
                ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <nav className="container mx-auto px-6 flex justify-between items-center gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group shrink-0">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary transition-all duration-300 shadow-md transform group-hover:rotate-3">
                        O
                    </div>
                    <span className={`text-2xl font-bold font-heading tracking-tight transition-colors duration-300 hidden sm:block ${!isTransparent ? 'text-gray-900' : 'text-white'
                        }`}>
                        OrdoCart
                    </span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={submitHandler} className="flex-1 max-w-md hidden md:flex items-center relative group">
                    <input
                        type="text"
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        placeholder="Search products..."
                        className={`w-full py-2.5 pl-10 pr-4 rounded-full text-sm outline-none border transition-all duration-300 focus:ring-2 focus:ring-primary/50 ${!isTransparent ? 'bg-gray-100 border-transparent text-gray-900 placeholder-gray-500' : 'bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30'}`}
                    />
                    <Search className={`absolute left-3.5 ${!isTransparent ? 'text-gray-400' : 'text-white/70'}`} size={18} />
                </form>

                <div className="flex items-center space-x-6">
                    <Link
                        to="/demo-dashboard"
                        className={`hidden lg:block text-sm font-bold transition-colors duration-300 ${!isTransparent ? 'text-gray-600 hover:text-primary' : 'text-white/80 hover:text-white'}`}
                    >
                        Live Demo
                    </Link>

                    {/* Wishlist Link */}
                    <Link to="/wishlist" className="relative group p-2">
                        <Heart
                            className={`transition-colors duration-300 ${!isTransparent ? 'text-gray-700 group-hover:text-red-500' : 'text-white/90 group-hover:text-red-400'}`}
                            size={24}
                        />
                        {wishlistItems?.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                                {wishlistItems.length}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="relative group p-2">
                        <ShoppingCart
                            className={`transition-colors duration-300 ${!isTransparent ? 'text-gray-700 group-hover:text-primary' : 'text-white/90 group-hover:text-white'}`}
                            size={24}
                        />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="relative group">
                            <button className={`flex items-center space-x-2 font-medium transition-colors duration-300 ${!isTransparent ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}`}>
                                <User size={22} />
                                <span className="hidden md:inline">{userInfo.name.split(' ')[0]}</span>
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                <div className="p-2">
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                        <p className="text-sm font-semibold text-gray-900">{userInfo.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                                    </div>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg">
                                        Profile
                                    </Link>
                                    {userInfo.isAdmin && (
                                        <>
                                            <div className="my-1 border-t border-gray-100"></div>
                                            <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Admin</p>
                                            <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg">
                                                Dashboard
                                            </Link>
                                            <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg">
                                                Products
                                            </Link>
                                            <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg">
                                                Orders
                                            </Link>
                                            <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg">
                                                Users
                                            </Link>
                                        </>
                                    )}
                                    <div className="my-1 border-t border-gray-100"></div>
                                    <button
                                        onClick={logoutHandler}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                                    >
                                        <LogOut size={14} />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl text-sm font-medium">
                            <span>Sign In</span>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
