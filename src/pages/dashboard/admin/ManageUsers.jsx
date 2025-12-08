import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaUserShield, FaUserTie } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Load all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        { withCredentials: true }
      );
      setUsers(res.data);
    } catch (error) {
      console.log("User Fetch Error:", error);
    }
  };

  // Update role
  const updateRole = async (email, role) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/users/role/${email}`,
        { role },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (error) {
      console.log("Role Update Error:", error);
    }
  };

  // Delete user
  const deleteUser = async (email) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/users/${email}`,
        { withCredentials: true }
      );
      fetchUsers();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto bg-base-200 p-4 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Make Manager</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr key={u.email}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={u.photoURL || "https://i.pravatar.cc/50"}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{u.name}</span>
                  </div>
                </td>

                <td>{u.email}</td>

                <td className="font-semibold capitalize">{u.role}</td>

                {/* Make Admin Button */}
                <td>
                  <button
                    disabled={u.role === "admin"}
                    onClick={() => updateRole(u.email, "admin")}
                    className="btn btn-sm btn-success"
                  >
                    <FaUserShield /> Admin
                  </button>
                </td>

                {/* Make Manager Button */}
                <td>
                  <button
                    disabled={u.role === "manager"}
                    onClick={() => updateRole(u.email, "manager")}
                    className="btn btn-sm btn-warning"
                  >
                    <FaUserTie /> Manager
                  </button>
                </td>

                {/* Delete Button */}
                <td>
                  <button
                    onClick={() => deleteUser(u.email)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
