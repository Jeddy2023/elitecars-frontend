import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import SignUpImage from '../assets/images/Signup2.jpeg'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '../utils/schemas/schemas';
import toast from 'react-hot-toast';
import { api } from '../api/axios';
import { Alert, Button } from '@mantine/core';
import Input from '../components/common/Input';
import { styles } from '../components/styles/styles';

type Props = {}

const SignupPage: React.FC<Props> = ({ }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const registerVendor = async (data: RegisterFormData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/auth/register/', data);
            console.log("This is the response",response)
            toast.success(response.data.message || 'Registration successful!, ');
            navigate('/');
            reset();
        } catch (err: any) {
            console.log("This is the error",err)
            toast.error(err?.response?.data?.message || 'Registration failed, please try again');
        } finally {
            setLoading(false);
        }
    };

    const submitData: SubmitHandler<RegisterFormData> = (data, e) => {
        e?.preventDefault();
        registerVendor(data);
    };

    return (
        <>
            <div className="auto-container center-margin p-4 flex flex-col lg:flex-row dark:bg-[#000000eb] dark:text-gray-100">
                <div className="flex-1 lg:w-2/3 lg:pr-8 h-full flex flex-col justify-center">
                    <Link to="/" className="flex items-center text-bg-general mb-4">
                        <IoIosArrowBack className="text-2xl" />
                        <span className="ml-2">Back home</span>
                    </Link>
                    <br />

                    <div className="w-full">
                        <header className="mb-6">
                            <h2 className={`${styles.title} text-2xl md:text-3xl`}>Register an Account</h2>
                            <p className="text-lg">Welcome to <span className="text-bg-general">Elite Cars</span></p>
                        </header>
                        <form onSubmit={handleSubmit(submitData)} className="space-y-4">
                            {error && (
                                <Alert
                                    variant="light"
                                    color="red"
                                    title="Error"
                                    styles={{ label: { fontSize: '16px' }, body: { gap: '.25rem' } }}
                                    className="mb-4"
                                >
                                    {error}
                                </Alert>
                            )}
                            <div className="flex flex-col md:flex-row gap-4">
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    id="email"
                                    register={register}
                                    error={errors.email?.message}
                                    type="email"
                                />
                                <Input
                                    label="Password"
                                    placeholder="Enter your password"
                                    id="password"
                                    register={register}
                                    error={errors.password?.message}
                                    type={showPassword ? 'text' : 'password'}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <Input
                                    label="Fullname"
                                    placeholder="Enter your fullname"
                                    id="full_name"
                                    register={register}
                                    error={errors.full_name?.message}
                                    type="text"
                                />
                                <Input
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    id="phone_number"
                                    register={register}
                                    error={errors.phone_number?.message}
                                    type="tel"
                                />
                            </div>
                            <div className="space-y-3 mt-5">
                                <Button
                                    size='md'
                                    type="submit"
                                    loading={loading}
                                    className="bg-bg-general hover:bg-bg-general"
                                >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className='text-center mt-4 dark:text-gray-100'>
                        <span>
                            Already have an account?
                            <Link to="/" className="text-bg-general ml-2">Sign in</Link>
                        </span>
                    </div>
                </div>
                <div className='hidden lg:block lg:w-1/3 h-full rounded-tl-full rounded-br-full overflow-hidden'>
                    <img src={SignUpImage} alt="Signup" className="w-full h-full object-fill" />
                </div>
            </div>
        </>
    );
}

export default SignupPage;
