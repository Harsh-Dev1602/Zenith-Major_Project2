import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthProvider';

function Login() {

    const [authUser, setAuthUser] = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.pass,
        };

        await axios.post("/api/user/login", userInfo)
            .then((response) => {
                if (response.data) {
                    toast.success("Login successfully");
                }
                sessionStorage.setItem("Zenith_User", JSON.stringify(response.data));
                setAuthUser(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Error: " + error.response.data.error);
                }
            });

    };

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div style={{ minHeight: "calc(100vh - 81px)" }} className=" w-full flex bg-white">

            <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 flex-col justify-center items-center p-12 relative overflow-hidden">

                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#4facfe]/10 to-[#00f2fe]/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -ml-48 -mb-48" />

                <div className="relative z-10 max-w-md text-center space-y-6">

                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe] tracking-tight">
                        Welcome back
                    </h2>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                        "Your mind is a garden. Your thoughts are the seeds. You can grow flowers or you can grow weeds."
                    </p>
                    <div className="pt-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-zinc-100 text-sm font-medium text-zinc-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            12k+ users journaling today
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-20">
                <div className="w-full max-w-md space-y-8">

                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r leading-normal from-[#4facfe] to-[#00f2fe]">Log in</h1>
                        <p className="text-zinc-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
                                Sign up for free
                            </Link>
                        </p>
                    </div>



                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-zinc-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="harsh@example.com"
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            {errors.email && <span className=" text-red-500 font-semibold">Email is required</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-zinc-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    {...register("pass", { required: true })}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            {errors.pass && <span className=" text-red-500 font-semibold">Password is required</span>}
                        </div>

                        <button className="w-full py-4 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2">
                            Log in
                            <ArrowRight size={20} />
                        </button>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default Login;