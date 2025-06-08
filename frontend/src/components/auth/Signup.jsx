import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate("/login");
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error", error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 space-y-4'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    <div className='grid w-full items-center gap-3'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="Enter name"
                            onChange={changeEventHandler}
                            value={input.fullname}
                        />
                    </div>

                    <div className='grid w-full items-center gap-3'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            onChange={changeEventHandler}
                            value={input.email}
                        />
                    </div>

                    <div className='grid w-full items-center gap-3'>
                        <Label>Phone Number</Label>
                        <Input
                            type="number"
                            name="phoneNumber"
                            placeholder=""
                            onChange={changeEventHandler}
                            value={input.phoneNumber}
                        />
                    </div>

                    <div className='grid w-full items-center gap-3'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder=""
                            onChange={changeEventHandler}
                            value={input.password}
                        />
                    </div>

                    <div className='flex items-center justify-between gap-2'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className="cursor-pointer"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full my-4">Signup</Button>

                    <span className='text-sm'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup;
