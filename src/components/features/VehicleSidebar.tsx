import { Accordion, Card, TextInput } from '@mantine/core'
import React from 'react'
import { useTheme } from '../../hooks/ThemeContext';

type Props = {
    search: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearFunction: (type: string) => void;
}

const VehicleSidebar: React.FC<Props> = ({ search, handleSearchChange, clearFunction }) => {
    const { getCurrentTheme } = useTheme();
    const currentTheme = getCurrentTheme();

    return (
        <div className="w-full lg:w-1/4 bg-white dark:bg-[#0e0e0ec1]">
            {/* Search Products */}
            <Accordion p={0} className='dark:bg-transparent'>
                <Accordion.Item value="search">
                    <Card radius="sm" className="bg-white dark:bg-[#0e0e0ec1] shadow-lg mb-5">
                        <Accordion.Control className="hover:bg-transparent p-0">
                            <Card.Section px={20} mb={25}>
                                <h2 className="text-xl md:text-2xl font-semibold relative !font-saira dark:text-gray-200">
                                    Search Vehicles
                                    <span className="absolute bottom-[-10px] left-0 w-[40px] md:w-[50px] h-[3px] bg-[#ff992e] rounded-md dark:bg-[#0e0e0efc]"></span>
                                    <span className="absolute bottom-[-10px] left-[45px] md:left-[55px] w-[5px] h-[3px] bg-[#ff992e] rounded-md dark:bg-[#0e0e0efc]"></span>
                                </h2>
                            </Card.Section>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Card.Section>
                                <TextInput
                                    placeholder="Search Products"
                                    value={search}
                                    onChange={handleSearchChange}
                                    className="border-gray-300 focus:border-[#ff992e] focus:ring-[#ff992e] !font-saira dark:bg-transparent dark:focus:border-[#ff992e] dark:focus:ring-[#ff992e]"
                                    classNames={{
                                        input: `transition-colors duration-300 ${currentTheme === 'dark' ? 'bg-[#0e0e0ec1] text-white' : 'bg-white text-black'
                                            }`,
                                    }}
                                />
                            </Card.Section>
                            <button
                                className="text-[#ff992e] hover:underline mt-2 !font-saira dark:text-[#ff992e]"
                                onClick={() => clearFunction('search')}
                            >
                                Clear
                            </button>
                        </Accordion.Panel>
                    </Card>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default VehicleSidebar