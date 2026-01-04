import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="text-2xl font-bold text-white font-heading tracking-tight mb-4 block">
                            OrdoCart
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Premium fashion and lifestyle products currated for the modern individual. Quality meets style.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
                            <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Customer Service</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            <li>
                                <Link to="/demo-dashboard" className="hover:text-white transition-colors flex items-center gap-1 text-indigo-400 font-bold">
                                    View Admin Demo <ExternalLink size={12} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="mt-1 text-primary" />
                                <span>123 Fashion Street,<br />Design District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-primary" />
                                <span>support@ordocart.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {currentYear} OrdoCart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
