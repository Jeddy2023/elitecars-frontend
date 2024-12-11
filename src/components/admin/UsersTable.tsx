import React, { useState } from 'react'
import { User } from '../../utils/types'
import { Input, Table, TableData , Text} from '@mantine/core'
import { FiSearch } from 'react-icons/fi'

type Props = {
    data: User[],
    fetchUsers: () => void
}

const UsersTable: React.FC<Props> = ({ data, fetchUsers }) => {
    const [query, setQuery] = useState<string>("");
    console.log(fetchUsers);

    const filteredData = data.filter(
        (user) =>
            user.full_name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user.phone_number.includes(query) ||
            user.address.toLowerCase().includes(query) 
    );

    const tableData: TableData = {
        head: ["Name", "Email", "Phone", "Address", "Role", "Date Created"],
        body: filteredData.map((user: User) => [
            user.full_name,
            user.email,
            user.phone_number,
            user.address,
            user.role,
            new Date(user.created_at).toDateString(),
        ]),
    };

    return (
        <div className="mt-5 p-3 border">
            <div className="w-full min-h-20 border-b flex items-center justify-between p-3">
                <p className="font-semibold">Users</p>
                <p className="text-blue-700">Users Table</p>
            </div>
            <div className="py-5 sm:w-1/5 w-3/5">
                <Input
                    width={50}
                    value={query}
                    placeholder="Search users..."
                    leftSection={<FiSearch size={16} />}
                    onChange={(event) => setQuery(event.currentTarget.value)}
                />
            </div>
            <div className="overflow-scroll">
                {filteredData.length === 0 ? (
                    <div className="text-center py-3">
                        <Text>No content found</Text>
                    </div>
                ) : (
                    <Table data={tableData} verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover />
                )}
            </div>
        </div>
    )
}

export default UsersTable