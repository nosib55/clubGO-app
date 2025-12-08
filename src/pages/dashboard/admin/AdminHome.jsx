import { FaUsers, FaClipboardList, FaRegCalendarAlt, FaMoneyBill } from "react-icons/fa";

const AdminHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Users Card */}
        <div className="p-6 bg-white shadow rounded flex items-center gap-4">
          <FaUsers className="text-4xl text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Manage Users</h2>
            <p className="text-gray-500">View & control user roles</p>
          </div>
        </div>

        {/* Clubs Card */}
        <div className="p-6 bg-white shadow rounded flex items-center gap-4">
          <FaClipboardList className="text-4xl text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">Manage Clubs</h2>
            <p className="text-gray-500">Approve & remove clubs</p>
          </div>
        </div>

        {/* Events Card */}
        <div className="p-6 bg-white shadow rounded flex items-center gap-4">
          <FaRegCalendarAlt className="text-4xl text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">Manage Events</h2>
            <p className="text-gray-500">Handle all events</p>
          </div>
        </div>

        {/* Payments Card */}
        <div className="p-6 bg-white shadow rounded flex items-center gap-4">
          <FaMoneyBill className="text-4xl text-red-600" />
          <div>
            <h2 className="text-xl font-semibold">Payments</h2>
            <p className="text-gray-500">Monitor transactions</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
