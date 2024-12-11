import React, { useEffect, useState } from 'react';
import { Tabs, rem, Button, Alert } from '@mantine/core';
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileSchemaType } from "../../utils/schemas/schemas";
import toast, { Toaster } from 'react-hot-toast';
import { api } from "../../api/axios";

const Profile: React.FC = () => {
    const iconStyle = { width: rem(20), height: rem(20) };
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProfileSchemaType>({
        resolver: zodResolver(ProfileSchema),
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profileError, setProfileError] = useState<string>("");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get("auth/user-details/");
                const profileData = response?.data;
                // Populate the form fields with the fetched data
                setValue("full_name", profileData.full_name);
                setValue("email", profileData.email);
                setValue("phone_number", profileData.phone_number);
                setValue("address", profileData.address);
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || "Failed to fetch profile data.";
                toast.error(errorMessage);
                setProfileError(errorMessage);
            }
        };

        fetchProfileData();
    }, [setValue]);

    const updateProfile = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await api.put("auth/update-profile/", data);
            toast.success(response?.data?.message || "Profile updated successfully!");
        } catch (err: any) {
            console.log(err)
            const errorMessage = err.response?.data?.message || "Profile update failed. Please try again.";
            toast.error(errorMessage);
            setProfileError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const submitData: SubmitHandler<ProfileSchemaType> = (data, e) => {
        e?.preventDefault();
        setProfileError("");
        updateProfile(data);
    };

    return (
        <div className='auto-container'>
            <Toaster />
            <div className='w-full shadow-lg mt-6'>
                <Tabs defaultValue="profile" className='custom-tabs'>
                    <Tabs.List>
                        <Tabs.Tab value="profile" leftSection={<IoPersonCircleOutline style={iconStyle} />} className='p-5 text-[14px] text-[#5a6a85] font-medium'>
                            Profile
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="profile">
                        <div className='p-[4%]'>
                            <div className='mt-3'>
                                <h1 className='font-semibold text-[18px] text-[#2a3547] mb-1'>Personal Details</h1>
                                <span className='text-[14px] text-[#2a3547]'>To change your personal details, edit and save from here</span>
                            </div>
                            {profileError && (
                                <Alert
                                    variant="light"
                                    color="red"
                                    title="Error"
                                    icon={<MdError />}
                                    withCloseButton
                                    onClose={() => setProfileError("")}
                                    styles={{ label: { fontSize: "16px" }, body: { gap: ".25rem" } }}
                                >
                                    {profileError}
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit(submitData)} className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                                <div className="flex flex-col gap-1">
                                    <label className='text-[#2a3547] text-[14px] font-medium ml-1 mb-1'>Full Name</label>
                                    <input
                                        type="text"
                                        className={`border-[0.5px] border-[#dfe5ef] rounded-lg py-2 px-3 
                      placeholder:text-[#5a6a85] placeholder:text-[14px] text-[14px] focus:outline-none focus:border-[0.5px] 
                      focus:border-[#0912ff] focus:shadow-active-input ${errors.full_name &&
                                            `focus:border-error-color focus:shadow-error-input`
                                            }`}
                                        placeholder="Full Name"
                                        disabled={true}
                                        {...register("full_name")}
                                    />
                                    {errors.full_name && (
                                        <div className="text-[#E30101] text-xs flex items-center gap-1">
                                            {errors.full_name.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='text-[#2a3547] text-[14px] font-medium ml-1 mb-1'>Email</label>
                                    <input
                                        type="email"
                                        className={`border-[0.5px] border-[#dfe5ef] rounded-lg py-2 px-3 
                      placeholder:text-[#5a6a85] placeholder:text-[14px] text-[14px] focus:outline-none focus:border-[0.5px] 
                      focus:border-[#0912ff] focus:shadow-active-input ${errors.email &&
                                            `focus:border-error-color focus:shadow-error-input`
                                            }`}
                                        placeholder="Email"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <div className="text-[#E30101] text-xs flex items-center gap-1">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='text-[#2a3547] text-[14px] font-medium ml-1 mb-1'>Phone Number</label>
                                    <input
                                        type="text"
                                        className={`border-[0.5px] border-[#dfe5ef] rounded-lg py-2 px-3 
                      placeholder:text-[#5a6a85] placeholder:text-[14px] text-[14px] focus:outline-none focus:border-[0.5px] 
                      focus:border-[#0912ff] focus:shadow-active-input ${errors.phone_number &&
                                            `focus:border-error-color focus:shadow-error-input`
                                            }`}
                                        placeholder="Phone Number"
                                        {...register("phone_number")}
                                    />
                                    {errors.phone_number && (
                                        <div className="text-[#E30101] text-xs flex items-center gap-1">
                                            {errors.phone_number.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 lg:col-span-2">
                                    <label className='text-[#2a3547] text-[14px] font-medium ml-1 mb-1'>Address</label>
                                    <input
                                        type="text"
                                        className={`border-[0.5px] border-[#dfe5ef] rounded-lg py-2 px-3 
                      placeholder:text-[#5a6a85] placeholder:text-[14px] text-[14px] focus:outline-none focus:border-[0.5px] 
                      focus:border-[#0912ff] focus:shadow-active-input ${errors.address &&
                                            `focus:border-error-color focus:shadow-error-input`
                                            }`}
                                        placeholder="Address"
                                        {...register("address")}
                                    />
                                    {errors.address && (
                                        <div className="text-[#E30101] text-xs flex items-center gap-1">
                                            {errors.address.message}
                                        </div>
                                    )}
                                </div>
                                <div className="lg:col-span-2 flex justify-end gap-2 mt-6">
                                    <Button type="submit" color='#5d87ff' size="md" loading={isLoading}>Save</Button>
                                </div>
                            </form>
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}

export default Profile;
