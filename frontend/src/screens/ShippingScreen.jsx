import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <CheckoutSteps step1 step2 />
            <h1 className="text-2xl font-bold mb-4">Shipping</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter postal code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default ShippingScreen;
