import { Modal, Button } from '@mantine/core';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormData, signInSchema } from '../../utils/schemas/schemas';
import { UserContext } from '../../hooks/userContext';
import { api } from '../../api/axios';
import { Link } from 'react-router-dom';
import Input from '../common/Input';
import '../../assets/styles/modal.css';
import { useTheme } from '../../hooks/ThemeContext';

type Props = {};

const SignInModal: React.FC<Props> = () => {
    const [opened, setOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { getCurrentTheme } = useTheme();
    const currentTheme = getCurrentTheme();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login/", data);
            console.log("This is the response",response?.data);
            login(response?.data);
            toast.success(response?.data?.message || 'Sign in successful!');
            reset();
            setOpened(false);
        } catch (error: any) {
            console.log("This is the error",error);
            toast.error(error?.response?.data?.message || 'Login failed, please try again');
        } finally {
            setIsLoading(false);
        }
    };

    const modalBgColor = currentTheme === 'dark' ? 'bg-black' : 'bg-white';
    const modalTextColor = currentTheme === 'dark' ? 'text-white' : 'text-black';

    return (
        <>
            <div className="mantine-custom-modal">
                <Modal
                    opened={opened}
                    onClose={() => {
                        setOpened(false);
                        reset();
                    }}
                    title={
                        <Link to="/" className={`font-bold ${modalTextColor}`}>
                            Elite Cars
                        </Link>
                    }
                    centered
                    classNames={{
                        content: `transition-colors duration-300 ${modalBgColor}`,
                        header: `${modalBgColor}`,
                    }}
                    zIndex={1000}
                >
                    <div className="login-form">
                        <div className="text-center">
                            <h1 className={`text-3xl font-bold ${modalTextColor}`}>Welcome Back</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">We've missed you so much</p>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-[2%]">
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                id="email"
                                register={register}
                                error={errors.email?.message}
                                type="text"
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
                            <div className="space-y-3 mt-5">
                                <Button
                                    fullWidth
                                    type="submit"
                                    loading={isLoading}
                                    className="bg-bg-general hover:bg-bg-general"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                            <span className={`text-sm ${modalTextColor}`}>
                                Don't have an account?
                                <Link to="/register" className="text-bg-general ml-1">Sign Up</Link>
                            </span>
                        </div>
                    </div>
                </Modal>
            </div>

            <Button color={'#ff992e'} variant="outline" className="transition duration-300"
                onClick={() => {
                    setOpened(true);
                }}>
                Sign in
            </Button>
        </>
    );
};

export default SignInModal;
