import React, { useState } from 'react';
import { GoQuestion } from "react-icons/go";
import { FaPen } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';


const CashFlow = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const handleToggle = () => {
        setIsVisible(!isVisible)
    }
    const handleToggle1 = () => {
        setIsVisible1(!isVisible)
    }
    const handleToggle2 = () => {
        setIsVisible2(!isVisible)
    }
    return (
        <div className='pt-16'>
            <div className='flex justify-between'>
                <h2 className='text-blue-600 text-xl font-semibold pb-5'>CASHFLOW (Year 1)</h2>
                <div className='flex gap-5'>
                    <h2 className='text-blue-600 pb-5'>Monthly</h2>
                    <p>Yearly</p>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 bg-white shadow-2xl'>
                {/* left  */}
                <div className=''>
                    <div className='flex justify-between pl-2 pt-6 pr-6'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Gross Rent: </p>
                        <p>$1,600</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 pr-6'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Vacancy: </p>
                        <p onClick={handleToggle} className='text-blue-600'><IoIosArrowDown></IoIosArrowDown> </p>
                        <p>- $155</p>
                    </div>

                    {
                        isVisible && (
                            <div className='flex justify-end pr-6'>
                                <p className='text-sm'>10% of Rent</p>
                            </div>
                        )
                    }
                    <hr className='h-1 my-1 mx-6 bg-blue-600' />
                    <div className='flex justify-between pl-2 pr-6 text-blue-600'>
                        <p className='flex gap-1 items-center '><GoQuestion className='text-blue-600'></GoQuestion> Operating Income: </p>
                        <p> $1,449</p>
                    </div>

                    <div className='flex justify-between pl-2 pt-6'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Operating Expenses: </p>
                        <p onClick={handleToggle1} className='text-blue-600'><IoIosArrowDown></IoIosArrowDown> </p>
                        <p className='flex gap-1 items-center'>+ $ 5,820 <FaPen className='text-blue-600'></FaPen></p>
                    </div>
                    {
                        isVisible1 && (
                            <div className='flex justify-end pr-6'>
                                <p className='text-sm'>42.8% of Income</p>
                            </div>
                        )
                    }

                    <hr className='h-1 my-1 mx-6 bg-blue-600' />
                    <div className='flex justify-between pl-2 pr-6 text-blue-600'>
                        <p className='flex gap-1 items-center '><GoQuestion className='text-blue-600'></GoQuestion>Net Operating Income: </p>
                        <p> $1,449</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-6'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Loan Payments: </p>
                        <p onClick={handleToggle2} className='text-blue-600'><IoIosArrowDown></IoIosArrowDown> </p>
                        <p className='flex gap-1 items-center'>- $ 5,820 <FaPen className='text-blue-600'></FaPen></p>
                    </div>
                    {
                        isVisible2 && (
                            <div className='flex justify-end pr-6'>
                                <p className='text-sm'>42.8% of Income</p>
                            </div>
                        )
                    }
                    <hr className='h-1 my-1 mx-6 bg-blue-600' />
                    <div className='flex justify-between pl-2 pr-6 text-red-600'>
                        <p className='flex gap-1 items-center '><GoQuestion className='text-blue-600'></GoQuestion>Cash Flow: </p>
                        <p>= $1,449</p>
                    </div>
                    <div className='flex justify-between pl-2 pr-6 pb-6 text-red-600'>
                        <p className='flex gap-1 items-center '><GoQuestion className='text-blue-600'></GoQuestion>Post-Tax Cash Flow: </p>
                        <p>- $1,449</p>
                    </div>


                </div>
                {/* right  */}
                <div>
                    <div className='flex justify-evenly pt-6'>
                        <p className='flex items-center gap-1'>Income</p>
                        <p className='flex items-center gap-1 text-blue-600'>Expenses <FaPen ></FaPen></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashFlow;