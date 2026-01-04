import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    useGetProductDetailsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            }).unwrap();
            toast.success('Product updated');
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error.data.message}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="image">Image</label>
                            <input
                                type="text"
                                id="image"
                                className="w-full border rounded px-3 py-2 mb-2"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input
                                type="file"
                                className="w-full"
                                onChange={uploadFileHandler}
                            />
                            {loadingUpload && <Loader />}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="brand">Brand</label>
                            <input
                                type="text"
                                id="brand"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="countInStock">Count In Stock</label>
                            <input
                                type="number"
                                id="countInStock"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
                            <input
                                type="text"
                                id="category"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                            Update
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default ProductEditScreen;
