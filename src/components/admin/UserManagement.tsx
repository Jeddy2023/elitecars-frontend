import React, { useEffect, useState } from 'react'
import { User } from '../../utils/types';
import { api } from '../../api/axios';
import toast from 'react-hot-toast';
import { Loader } from '@mantine/core';
import UsersTable from './UsersTable';

type Props = {}

const UserManagement: React.FC<Props> = ({ }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get("/auth/users/");
            console.log(res)
            setUsers(res?.data?.results);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Error fetching users, please refesh the page');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center p-5">
                <h1 className="font-semibold">Manage Users</h1>
                <p className="text-gray-500 text-sm">Admin &gt; manage-users</p>
            </div>
            {loading ? (
                <div className="min-h-screen grid place-items-center">
                    <Loader size={50} />
                </div>
            )
                : <UsersTable data={users} fetchUsers={fetchUsers} />}
        </div>
    )
}

export default UserManagement