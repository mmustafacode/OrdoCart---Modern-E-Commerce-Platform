import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-3 mb-10">
                    <ShoppingBag className="text-gray-900" size={32} />
                    <h1 className="text-4xl font-bold font-heading text-gray-900">Your Cart</h1>
                    <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
                    </span>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your bag is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all">
                            Start Shopping <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md">
                                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-grow text-center sm:text-left">
                                        <Link to={`/product/${item._id}`} className="text-xl font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1 mb-1">
                                            {item.name}
                                        </Link>
                                        <p className="text-gray-500 text-sm mb-4">{item.brand}</p>

                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center border border-gray-200 rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                                                    className="p-1 text-gray-500 hover:text-black"
                                                    disabled={item.qty <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="mx-3 font-semibold w-6 text-center">{item.qty}</span>
                                                <button
                                                    onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                                                    className="p-1 text-gray-500 hover:text-black"
                                                    disabled={item.qty >= item.countInStock}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCartHandler(item._id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                                        <p className="text-sm text-gray-400">${item.price} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-28">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-900">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax Estimate</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-4"></div>
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="mt-6 flex justify-center">
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Secure Checkout Encrypted
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartScreen;
