import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

import heroBg from '../assets/hero-bg.jpg';
import heroProduct from '../assets/hero-product.jpg';
import avatar1 from '../assets/avatar-1.jpg';
import avatar2 from '../assets/avatar-2.jpg';
import avatar3 from '../assets/avatar-3.jpg';
import { addToWishlist } from '../slices/wishlistSlice';
import { toast } from 'react-toastify';

const HomeScreen = () => {
    const { keyword } = useParams();
    const dispatch = useDispatch();

    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber: 1 });

    const addToWishlistHandler = (product) => {
        dispatch(addToWishlist(product));
        toast.success(`${product.name} added to wishlist!`);
    };

    return (
        <div className="animate-fadeIn bg-gray-50 min-h-screen">
            {/* Hero Section */}
            {!keyword && (
                <div className="relative bg-gray-900 text-white overflow-hidden mb-12 rounded-3xl mx-4 lg:mx-0">
                    <div 
                        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
                        style={{ backgroundImage: `url(${heroBg})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />

                    <div className="relative z-20 container mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            {/* Left Content */}
                            <div className="md:w-1/2 animate-slideUp text-center md:text-left">
                                <span className="inline-block py-2 px-6 rounded-full bg-white/10 border border-white/10 text-sm font-bold mb-6 backdrop-blur-md text-indigo-300 tracking-wide uppercase">
                                    New Collection 2025
                                </span>
                                <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6 drop-shadow-2xl">
                                    Redefine Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                                        Digital Life
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
                                    Experience the future of commerce with our curated selection of premium electronics and lifestyle products.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <a href="#products" className="bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25">
                                        Shop Collection <ArrowRight size={20} />
                                    </a>
                                    <Link to="/register" className="bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm">
                                        Create Account
                                    </Link>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="md:w-1/2 relative animate-fadeIn mt-10 md:mt-0">
                                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src={heroProduct}
                                        alt="Premium Audio"
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/800x600?text=Hero+Product';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                            <p className="font-bold text-white">VR Headset Pro</p>
                                            <p className="text-indigo-300 text-sm">$499.99</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section - Modern Gradient (Hide on Search) */}
            {!keyword && (
                <div className="relative py-24 bg-white overflow-hidden">
                    {/* Soft Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 opacity-70"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: Truck, title: "Free Shipping", desc: "On all orders over $100", color: "text-blue-600", bg: "bg-blue-50" },
                                { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure payment", color: "text-indigo-600", bg: "bg-indigo-50" },
                                { icon: Clock, title: "24/7 Support", desc: "Dedicated support", color: "text-purple-600", bg: "bg-purple-50" },
                                { icon: CreditCard, title: "Easy Returns", desc: "30-day money back", color: "text-pink-600", bg: "bg-pink-50" }
                            ].map((feature, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-gray-100/50 border border-white/50 flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group">
                                    <div className={`p-4 rounded-xl ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className={feature.color} size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1 text-lg">{feature.title}</h3>
                                        <p className="text-sm text-gray-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div id="products" className="container mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
                        {keyword ? 'Search Results' : 'Our Products'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
                        {keyword ? `Results for "${keyword}"` : 'Latest Arrivals'}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error?.data?.message || error.error}</Message>
                ) : data.products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-400">No products found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                        {keyword && (
                            <Link to='/' className='inline-block mt-4 text-indigo-600 font-bold hover:underline'>
                                Clear Search
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {data.products.map((product, index) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100 flex flex-col transform hover:-translate-y-1 relative"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <button
                                    onClick={() => addToWishlistHandler(product)}
                                    className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                                    title="Add to Wishlist"
                                >
                                    <Heart size={20} />
                                </button>

                                <Link to={`/product/${product._id}`} className="relative pt-[110%] overflow-hidden bg-gray-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                                        }}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {product.countInStock === 0 && (
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                                            Sold Out
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                </Link>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.brand}</span>
                                            <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 px-2 py-1 rounded-full">
                                                <Star size={12} fill="currentColor" />
                                                <span>{product.rating}</span>
                                            </div>
                                        </div>
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                                {product.name}
                                            </h3>
                                        </Link>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-0.5">Price</span>
                                            <span className="text-2xl font-black text-gray-900 tracking-tight">${product.price}</span>
                                        </div>
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-primary transition-colors shadow-lg hover:shadow-primary/50"
                                        >
                                            <ArrowRight size={22} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Testimonials Section (Hide on Search) */}
            {!keyword && (
                <div className="bg-[#0f172a] py-24 text-white overflow-hidden relative">
                    {/* Aurora Background Effects - No Noise */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">What Our Customers Say</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">Don't just take our word for it. Here's what our community has to say about their OrdoCart experience.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Alex Thompson",
                                    role: "Verified Buyer",
                                    text: "The quality of the products is unmatched. Shipping was incredibly fast, and the customer service team went above and beyond!",
                                    image: avatar1,
                                },
                                {
                                    name: "Sarah Jenkins",
                                    role: "Tech Enthusiast",
                                    text: "I love the clean design of the store and how easy it is to find exactly what I'm looking for. Definitely my go-to for tech gear.",
                                    image: avatar2,
                                },
                                {
                                    name: "Michael Chen",
                                    role: "Verified Buyer",
                                    text: "Premium packaging, premium products. You can tell they really care about the customer experience. Highly recommended!",
                                    image: avatar3,
                                }
                            ].map((review, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 group">
                                    <div className="relative">
                                        <Quote className="text-indigo-500 mb-6 transform group-hover:scale-110 transition-transform duration-300" size={32} />
                                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <p className="text-gray-300 mb-8 leading-relaxed">"{review.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/50 group-hover:ring-indigo-400 transition-all" />
                                            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-indigo-200 transition-colors">{review.name}</h4>
                                            <p className="text-xs text-indigo-300">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Newsletter Section - Modern Gradient (Hide on Search) */}
            {!keyword && (
                <div className="py-32 bg-gray-50 relative overflow-hidden">
                    {/* Clean Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="bg-[#111] text-white rounded-[2.5rem] p-8 md:p-20 text-center shadow-2xl overflow-hidden relative border border-gray-800">
                            {/* Vivid Gradient Blobs behind the card content */}
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/40 to-blue-600/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 mix-blend-screen animate-pulse-slow"></div>
                            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/40 to-pink-600/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/10 text-xs font-bold mb-6 text-indigo-300 uppercase tracking-widest">
                                    Stay Updated
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Join the Revolution</h2>
                                <p className="text-gray-400 mb-10 text-lg md:text-xl font-light">
                                    Subscribe to our newsletter to get the latest news, announcements, and special deals delivered straight to your inbox.
                                </p>

                                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                                    <div className="flex-grow relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="relative w-full px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-sm transition-all"
                                        />
                                    </div>
                                    <button className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-white/20">
                                        Subscribe <Send size={18} />
                                    </button>
                                </form>
                                <p className="text-xs text-gray-500 mt-8">
                                    No spam, ever. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
