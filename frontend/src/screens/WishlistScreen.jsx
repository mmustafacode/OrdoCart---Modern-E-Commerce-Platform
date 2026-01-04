import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Message from '../components/Message';
import { removeFromWishlist } from '../slices/wishlistSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const WishlistScreen = () => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
        toast.success('Item removed from wishlist');
    };

    const addToCartHandler = (product) => {
        dispatch(addToCart({ ...product, qty: 1 }));
        toast.success('Item added to cart');
        dispatch(removeFromWishlist(product._id));
    };

    return (
        <div className="container mx-auto px-6 py-12 animate-fadeIn min-h-screen bg-gray-50/50">
            <h1 className="text-3xl font-bold font-heading mb-8 flex items-center gap-3">
                My Wishlist
                <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                    {wishlistItems.length} items
                </span>
            </h1>

            {wishlistItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto mt-12">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HeartIcon className="text-gray-300" size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-8">Seems like you haven't found anything you like yet.</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all font-medium">
                        Start Shopping
                        <ArrowRight size={18} />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col">
                            <Link to={`/product/${item._id}`} className="relative pt-[100%] overflow-hidden bg-gray-50 cursor-pointer">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {item.countInStock === 0 && (
                                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                                        Out of Stock
                                    </div>
                                )}
                            </Link>

                            <div className="p-5 flex flex-col flex-grow">
                                <Link to={`/product/${item._id}`}>
                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors h-12">
                                        {item.name}
                                    </h3>
                                </Link>

                                <div className="mt-auto">
                                    <p className="text-xl font-bold text-gray-900 mb-4">${item.price}</p>

                                    <div className="grid grid-cols-5 gap-2">
                                        <button
                                            onClick={() => addToCartHandler(item)}
                                            disabled={item.countInStock === 0}
                                            className="col-span-4 bg-black text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingCart size={16} />
                                            {item.countInStock > 0 ? 'Move to Cart' : 'Out of Stock'}
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlistHandler(item._id)}
                                            className="col-span-1 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                                            title="Remove"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Simple Heart Icon for empty state to avoid import conflict if I imported Heart from lucide-react above (I didn't but good to be safe/clean)
const HeartIcon = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

export default WishlistScreen;
