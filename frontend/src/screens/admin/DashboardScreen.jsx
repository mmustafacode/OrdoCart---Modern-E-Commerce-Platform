import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Package, DollarSign, ArrowUpRight, TrendingUp, Activity, CreditCard } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

// ... imports

const DashboardScreen = ({ isDemo = false }) => {
    // 1. Fetch Real Data (only if not demo)
    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetOrdersQuery(undefined, { skip: isDemo });
    const { data: users, isLoading: loadingUsers, error: errorUsers } = useGetUsersQuery(undefined, { skip: isDemo });
    const { data: productsData, isLoading: loadingProducts, error: errorProducts } = useGetProductsQuery({ keyword: '', pageNumber: 1 }, { skip: isDemo });

    // 2. Define Mock Data for Demo Mode (Impressive Stats)
    const mockStats = {
        totalRevenue: 54320.50,
        totalOrders: 156,
        totalProducts: 85,
        totalUsers: 243
    };

    // Smooth upward trend for demo chart
    const mockRevenueData = [
        { name: 'Mon', revenue: 4000, orders: 24 },
        { name: 'Tue', revenue: 5500, orders: 32 },
        { name: 'Wed', revenue: 4800, orders: 28 },
        { name: 'Thu', revenue: 6200, orders: 35 },
        { name: 'Fri', revenue: 7800, orders: 42 },
        { name: 'Sat', revenue: 9500, orders: 55 },
        { name: 'Sun', revenue: 12400, orders: 68 },
    ];

    const mockStatusData = [
        { name: 'Paid', value: 142 },
        { name: 'Unpaid', value: 14 },
    ];

    const mockRecentOrders = [
        { _id: '5f9d88b9c8', user: { name: 'Alice Portfolio' }, createdAt: '2025-12-05', totalPrice: 299.99, isPaid: true, isDelivered: true },
        { _id: '5f9d88b9c9', user: { name: 'Bob Client' }, createdAt: '2025-12-05', totalPrice: 1250.00, isPaid: true, isDelivered: false },
        { _id: '5f9d88b9ca', user: { name: 'Charlie Demo' }, createdAt: '2025-12-04', totalPrice: 89.99, isPaid: true, isDelivered: true },
        { _id: '5f9d88b9cb', user: { name: 'Diana Reviewer' }, createdAt: '2025-12-04', totalPrice: 450.50, isPaid: true, isDelivered: true },
        { _id: '5f9d88b9cc', user: { name: 'Ethan Recruiter' }, createdAt: '2025-12-03', totalPrice: 2100.00, isPaid: false, isDelivered: false },
    ];

    // 3. Determine Final Data to Display
    const finalRevenue = isDemo ? mockStats.totalRevenue : (orders?.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0) || 0);
    const finalTotalOrders = isDemo ? mockStats.totalOrders : (orders?.length || 0);
    const finalTotalProducts = isDemo ? mockStats.totalProducts : (productsData?.products?.length || 0);
    const finalTotalUsers = isDemo ? mockStats.totalUsers : (users?.length || 0);
    const finalRevenueData = isDemo ? mockRevenueData : [
        { name: 'Mon', revenue: 4000, orders: 24 },
        { name: 'Tue', revenue: 3000, orders: 18 },
        { name: 'Wed', revenue: 2000, orders: 12 },
        { name: 'Thu', revenue: 2780, orders: 20 },
        { name: 'Fri', revenue: 1890, orders: 15 },
        { name: 'Sat', revenue: 2390, orders: 18 },
        { name: 'Sun', revenue: 3490, orders: 25 },
    ];

    const paidOrdersCount = isDemo ? 142 : (orders?.filter(o => o.isPaid).length || 0);
    const unpaidOrdersCount = finalTotalOrders - paidOrdersCount;
    const finalStatusData = isDemo ? mockStatusData : [
        { name: 'Paid', value: paidOrdersCount },
        { name: 'Unpaid', value: unpaidOrdersCount },
    ];

    const finalRecentOrders = isDemo ? mockRecentOrders : orders?.slice(0, 5);

    const COLORS = ['#10B981', '#EF4444']; // Green, Red

    const stats = [
        { label: 'Total Revenue', value: `$${finalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100' },
        { label: 'Total Orders', value: finalTotalOrders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-100' },
        { label: 'Products', value: finalTotalProducts, icon: Package, color: 'text-purple-500', bg: 'bg-purple-100' },
        { label: 'Users', value: finalTotalUsers, icon: Users, color: 'text-orange-500', bg: 'bg-orange-100' },
    ];

    if (!isDemo && (loadingOrders || loadingUsers || loadingProducts)) return <Loader />;
    if (!isDemo && (errorOrders || errorUsers || errorProducts)) return <Message variant='danger'>Error loading dashboard data</Message>;

    return (
        <div className="container mx-auto px-6 py-8 animate-fadeIn">
            {isDemo && (
                <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <Activity /> Demo Mode Active
                        </h2>
                        <p className="text-indigo-100 text-sm">You are viewing a simulation of the admin dashboard with mock data. No real data is being shown.</p>
                    </div>
                    <Link to="/" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                        Back to Home
                    </Link>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, here's what's happening with your store today.</p>
                </div>
                {!isDemo && (
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
                            Download Report
                        </button>
                        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all">
                            Refresh Data
                        </button>
                    </div>
                )}
            </div>

            {/* Scorecards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <TrendingUp size={12} /> +12.5%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold font-heading text-gray-900">Revenue Analytics</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                            <span className="text-xs text-gray-500">Revenue</span>
                            <span className="w-3 h-3 rounded-full bg-purple-500 ml-2"></span>
                            <span className="text-xs text-gray-500">Orders</span>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={finalRevenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="orders" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Order Status</h3>
                    <p className="text-sm text-gray-500 mb-6">Payment status distribution</p>
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={finalStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {finalStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <span className="text-3xl font-bold text-gray-900 block">{finalTotalOrders}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Total Orders</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold font-heading text-gray-900">Recent Orders</h3>
                    {!isDemo && (
                        <Link to="/admin/orderlist" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                            View All <ArrowUpRight size={16} />
                        </Link>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="p-4 border-b border-gray-100">Order ID</th>
                                <th className="p-4 border-b border-gray-100">User</th>
                                <th className="p-4 border-b border-gray-100">Date</th>
                                <th className="p-4 border-b border-gray-100">Total</th>
                                <th className="p-4 border-b border-gray-100">Paid</th>
                                <th className="p-4 border-b border-gray-100">Delivered</th>
                                <th className="p-4 border-b border-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {finalRecentOrders?.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors text-sm">
                                    <td className="p-4 font-mono text-gray-500">#{order._id.substring(0, 8)}...</td>
                                    <td className="p-4 font-semibold text-gray-900">{order.user && order.user.name}</td>
                                    <td className="p-4 text-gray-500">{order.createdAt.substring(0, 10)}</td>
                                    <td className="p-4 font-bold text-gray-900">${order.totalPrice}</td>
                                    <td className="p-4">
                                        {order.isPaid ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {order.isDelivered ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Delivered</span>
                                        ) : (
                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Processing</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {!isDemo && (
                                            <Link to={`/order/${order._id}`} className="text-gray-400 hover:text-indigo-600 transition-colors">
                                                <ArrowUpRight size={18} />
                                            </Link>
                                        )}
                                        {isDemo && (
                                            <span className="text-gray-300 cursor-not-allowed"><ArrowUpRight size={18} /></span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Disclaimer for Demo */}
            {isDemo && (
                <div className="text-center mt-8 text-gray-400 text-xs">
                    * This is a demo view using generated data. Administrative actions are disabled.
                </div>
            )}
        </div>
    );
};

export default DashboardScreen;
