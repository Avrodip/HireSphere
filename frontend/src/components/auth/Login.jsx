import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);
    // Step 1: Create state for form fields
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    });

    // Step 2: Generic change handler for text/email/password/radio inputs
    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate("/");
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 space-y-4'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    {/* Email Input */}
                    <div className='grid w-full items-center gap-3'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            value={input.email}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* Password Input */}
                    <div className='grid w-full items-center gap-3'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={input.password}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* Role Selection */}
                    <div className='flex items-center justify-between gap-2'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-1 cursor-pointer">Login</Button>
                    }

                    {/* Submit Button */}

                    {/* Redirect to Signup */}
                    <span className='text-sm'>
                        Don’t have an account? <Link to="/signup" className='text-blue-600'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
