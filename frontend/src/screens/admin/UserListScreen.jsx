import { Link } from 'react-router-dom';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User deleted');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Users</h1>
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
                                <th className="py-2 px-4 border-b">EMAIL</th>
                                <th className="py-2 px-4 border-b">ADMIN</th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 border-b">{user._id}</td>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {user.isAdmin ? (
                                            <Check className="text-green-500" />
                                        ) : (
                                            <X className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b flex space-x-2">
                                        <Link to={`/admin/user/${user._id}/edit`} className="text-blue-600 hover:text-blue-800">
                                            <Edit size={20} />
                                        </Link>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
