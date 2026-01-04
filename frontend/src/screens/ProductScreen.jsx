import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    // Zoom state
    const [showZoom, setShowZoom] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setMousePosition({ x, y });
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb / Back */}
            <div className="container mx-auto px-6 py-8">
                <Link className="inline-flex items-center text-gray-500 hover:text-black transition-colors font-medium mb-8" to="/">
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Collection
                </Link>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Image with Zoom */}
                        <div className="relative group">
                            <div
                                className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 cursor-crosshair"
                                onMouseEnter={() => setShowZoom(true)}
                                onMouseLeave={() => setShowZoom(false)}
                                onMouseMove={handleMouseMove}
                                ref={imageRef}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-auto object-cover transform transition-transform duration-500"
                                />

                                {/* Zoom Lens Effect (Optional, can be just the result on the side, but doing overlay style for simplicity first) */}
                            </div>

                            {/* Zoomed Result Overlay - Amazon Style (Appears next to image or on top) */}
                            {showZoom && (
                                <div
                                    className="absolute inset-0 z-50 pointer-events-none rounded-3xl overflow-hidden shadow-2xl hidden md:block"
                                    style={{
                                        left: '105%', // Position to the right
                                        width: '600px',
                                        height: '600px',
                                        top: '0',
                                        backgroundImage: `url(${product.image})`,
                                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                                        backgroundSize: '250%', // Zoom level
                                        border: '1px solid #e5e7eb'
                                    }}
                                >
                                </div>
                            )}
                        </div>

                        {/* Right Column: Details */}
                        <div className="flex flex-col">
                            <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={18} fill="currentColor" />
                                    <span className="font-bold text-lg pt-0.5">{product.rating}</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500 font-medium">{product.numReviews} Verified Reviews</span>
                                <span className="text-gray-300">|</span>
                                <span className={`${product.countInStock > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Sold Out'}
                                </span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                                {product.description}
                            </p>

                            <div className="border-t border-b border-gray-100 py-8 mb-10">
                                <div className="flex items-end gap-4 mb-6">
                                    <span className="text-5xl font-bold text-gray-900 tracking-tight">${product.price}</span>
                                </div>

                                {product.countInStock > 0 && (
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 w-max">
                                            <button
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                                className="p-1 text-gray-500 hover:text-black transition-colors"
                                                disabled={qty <= 1}
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="mx-4 text-xl font-bold min-w-[20px] text-center">{qty}</span>
                                            <button
                                                onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                                className="p-1 text-gray-500 hover:text-black transition-colors"
                                                disabled={qty >= product.countInStock}
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={addToCartHandler}
                                            disabled={product.countInStock === 0}
                                            className="flex-1 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingCart size={20} />
                                            Add to Cart
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                                        <Truck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Free Delivery</h4>
                                        <p className="text-sm text-gray-500 mt-1">Enter your postal code for delivery availability</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Return Delivery</h4>
                                        <p className="text-sm text-gray-500 mt-1">Free 30 Days Delivery Returns. Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductScreen;
