import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    const navigate = useNavigate();

    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber: 1 });

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id);
                refetch();
                toast.success('Product deleted');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <button
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center"
                    onClick={createProductHandler}
                >
                    <Plus className="mr-2" size={20} /> Create Product
                </button>
            </div>

            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">NAME</th>
                                <th className="py-2 px-4 border-b">PRICE</th>
                                <th className="py-2 px-4 border-b">CATEGORY</th>
                                <th className="py-2 px-4 border-b">BRAND</th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td className="py-2 px-4 border-b">{product._id}</td>
                                    <td className="py-2 px-4 border-b">{product.name}</td>
                                    <td className="py-2 px-4 border-b">${product.price}</td>
                                    <td className="py-2 px-4 border-b">{product.category}</td>
                                    <td className="py-2 px-4 border-b">{product.brand}</td>
                                    <td className="py-2 px-4 border-b flex space-x-2">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:text-blue-800">
                                            <Edit size={20} />
                                        </Link>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ProductListScreen;
