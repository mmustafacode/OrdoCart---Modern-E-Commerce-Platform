import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Method</label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="PayPal">PayPal or Credit Card</label>
                    </div>
                </div>
                <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default PaymentScreen;
