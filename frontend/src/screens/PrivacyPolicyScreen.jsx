import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicyScreen = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-[#0F172A] p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-50"></div>
                    <div className="relative z-10">
                        <Shield size={48} className="text-indigo-400 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-300 text-lg">
                            Last Updated: December 2025
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-12">
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="text-primary" size={24} />
                            <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email address, shipping address, and payment information.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We also automatically collect certain information about your device and how you interact with our website, such as your IP address, browser type, and pages visited.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-primary" size={24} />
                            <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Process your orders and payments.</li>
                            <li>Send you order confirmations and shipping updates.</li>
                            <li>Respond to your comments and questions.</li>
                            <li>Improve our website and product offerings.</li>
                            <li>Detect and prevent fraud.</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-primary" size={24} />
                            <h2 className="text-2xl font-bold text-gray-900">3. Data Security</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use SSL encryption for all sensitive transactions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at:
                            <br />
                            <a href="mailto:privacy@ordocart.com" className="text-primary font-semibold hover:underline">
                                privacy@ordocart.com
                            </a>
                        </p>
                    </section>

                    <div className="border-t border-gray-100 pt-8 mt-8 text-center text-gray-500">
                        <p>
                            By using our website, you agree to the terms of this Privacy Policy.
                        </p>
                        <Link to="/" className="inline-block mt-6 px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyScreen;
