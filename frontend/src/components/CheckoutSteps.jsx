import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex justify-center mb-4">
            <ol className="flex items-center space-x-4">
                <li>
                    {step1 ? (
                        <Link to="/login" className="text-green-600 font-bold">Sign In</Link>
                    ) : (
                        <span className="text-gray-400">Sign In</span>
                    )}
                </li>
                <li>
                    {step2 ? (
                        <Link to="/shipping" className="text-green-600 font-bold">Shipping</Link>
                    ) : (
                        <span className="text-gray-400">Shipping</span>
                    )}
                </li>
                <li>
                    {step3 ? (
                        <Link to="/payment" className="text-green-600 font-bold">Payment</Link>
                    ) : (
                        <span className="text-gray-400">Payment</span>
                    )}
                </li>
                <li>
                    {step4 ? (
                        <Link to="/placeorder" className="text-green-600 font-bold">Place Order</Link>
                    ) : (
                        <span className="text-gray-400">Place Order</span>
                    )}
                </li>
            </ol>
        </nav>
    );
};

export default CheckoutSteps;
