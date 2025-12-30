import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserShield, FaUser } from "react-icons/fa";

export default function CheckUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URI + "/api/users/check-users",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // ✅ FIXED
      setUsers(Array.isArray(res.data.users) ? res.data.users : []);

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 font-fancy">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Users</h1>
        <p className="text-gray-500 mt-1">
          Manage all registered users in the system
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* EMPTY */}
      {!loading && users.length === 0 && (
        <div className="text-center text-gray-400 py-24">
          No users found
        </div>
      )}

      {/* TABLE */}
      {!loading && users.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  User
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const isAdmin = user.role?.toLowerCase() === "admin";

                return (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* USER */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center
                          ${isAdmin ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                        >
                          {isAdmin ? <FaUserShield /> : <FaUser />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${isAdmin ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-600"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}
