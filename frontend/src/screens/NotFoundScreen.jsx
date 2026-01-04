import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

const NotFoundScreen = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">

            <div className="relative mb-12">
                <h1 className="text-[150px] md:text-[200px] font-black text-gray-200 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-2xl md:text-3xl font-bold uppercase tracking-widest">
                        Page Not Found
                    </span>
                </div>
            </div>

            <p className="text-gray-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    <Home size={20} />
                    Go Back Home
                </Link>
                <Link
                    to="/contact"
                    className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
                >
                    Contact Support
                    <ArrowRight size={20} />
                </Link>
            </div>

            {/* Decorative BG elements */}
            <div className="fixed top-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"></div>
        </div>
    );
};

export default NotFoundScreen;
