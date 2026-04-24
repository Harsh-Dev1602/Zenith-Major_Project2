import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Users, Search, Settings, Loader2, Trash2, Eye, X, BookOpen, Clock
} from 'lucide-react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user/all-user");
        const data = response.data.users || response.data;
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  const openJournal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-cyan-500 mb-4" size={40} />
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Accessing Secure Database...</p>
      </div>
    );
  }

  const handleDeleteUser = async (userId, userName) => {

    const confirmDelete = window.confirm(
      `CRITICAL ACTION: Are you sure you want to delete ${userName}? This will permanently erase all journal logs.`
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/user/delete/${userId}`);

        if (response.data.success) {
          // Update the UI by filtering out the deleted user
          setUsers(users.filter(u => u._id !== userId));
          toast.success("User successfully wiped from system.");
        }
      } catch (error) {
      toast.error("Delete failed:", error);
  alert("Error: Could not delete user. Check permissions.");
}
  }
};

return (
  <div className="min-h-screen bg-zinc-50 font-sans py-10">
    <main className="container mx-auto px-6 space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-950 tracking-tight">Active Directory</h1>
          <p className="text-zinc-500 font-medium mt-1">Reviewing {filteredUsers.length} patient records.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:ring-2 ring-cyan-100 outline-none w-72 transition-all"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] border-b border-zinc-100 bg-zinc-50/50">
              <th className="px-8 py-5">User Profile</th>
              <th className="px-8 py-5">Journals</th>
              <th className="px-8 py-5">Account Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-zinc-50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-zinc-100 flex items-center justify-center font-bold text-zinc-500 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
                      {user.fullname ? user.fullname[0] : "?"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-950">{user.fullname}</p>
                      <p className="text-xs text-zinc-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <button
                    onClick={() => openJournal(user)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-950 hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    <BookOpen size={14} />
                    {user.journal?.length || 0} Entries
                  </button>
                </td>
                <td className="px-8 py-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-50 text-green-600 border border-green-100">
                    <div className="size-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    Active
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openJournal(user)} className="p-2 text-zinc-300 hover:text-cyan-600 transition-colors" title="View Records">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => handleDeleteUser(user._id, user.fullname)} className="p-2 text-zinc-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>

    {/* --- JOURNAL VIEW MODAL --- */}
    {showModal && selectedUser && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>

        {/* Modal Content */}
        <div className="relative bg-white w-full max-w-2xl max-h-[80vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

          {/* Modal Header */}
          <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-[#4facfe] to-[#00f2fe] flex items-center justify-center text-white font-black text-xl">
                {selectedUser.fullname[0]}
              </div>
              <div>
                <h2 className="text-xl font-black text-zinc-950 tracking-tight">{selectedUser.fullname}</h2>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Medical Journal Archive</p>
              </div>
            </div>
            <button onClick={() => setShowModal(false)} className="p-2 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {selectedUser.journal && selectedUser.journal.length > 0 ? (
              selectedUser.journal.map((entry, index) => (
                <div key={index} className="p-6 rounded-3xl border border-zinc-100 bg-zinc-50/30 hover:border-cyan-100 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[10px] font-black text-zinc-500 flex items-center gap-1.5">
                        <Clock size={12} /> {new Date(entry.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                      <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        Mood: {entry.moodScore || 'N/A'}/10
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-zinc-300">#{index + 1}</span>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium italic">
                    "{entry.text || "No reflection text provided for this entry."}"
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="size-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
                  <BookOpen size={30} />
                </div>
                <p className="text-zinc-400 font-bold">No journal entries found for this user.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default AdminDashboard;