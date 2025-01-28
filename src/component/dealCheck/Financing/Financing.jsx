import React, { useState } from 'react';
import { GoQuestion } from "react-icons/go";
import { FaPen } from 'react-icons/fa'
import { IoIosArrowUp } from "react-icons/io";

const Financing = () => {
    const [isVisible, setIsVisible] = useState(false)

    const handleToggle = () => {
        setIsVisible(!isVisible); // Toggle visibility
    };
    return (
        <div className='pt-16'>
            <h2 className='text-blue-600 text-xl font-semibold pb-5'>FINANCING (Purchase)</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-2xl'>
                {/* left  */}
                <div>
                    <div className='flex justify-between pl-2 pt-6'>

                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Loan Amount: </p>
                        <p onClick={handleToggle} className='cursor-pointer text-blue-600'><IoIosArrowUp></IoIosArrowUp></p>
                        <p>$194,000</p>
                    </div>
                    {isVisible && (
                        <div className="flex justify-between pl-2 pt-4">
                            <p className="pl-10">
                                Financed Price:
                            </p>
                            <p>$ 155,200</p>
                        </div>
                    )}
                    <div className='flex justify-between pl-2 pt-4'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Loan to Cost: </p>
                        <p>80%</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 pb-6'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Loan to Value: </p>
                        <p>80%</p>
                    </div>

                </div>
                {/* right  */}
                <div className='pr-6'>
                    <div className='flex justify-between pl-2 pt-6'>
                        <p className='flex gap-1 items-center'> Financing Of: </p>
                        <p>Price(80%)</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4'>
                        <p className='flex gap-1 items-center'> Loan Type: </p>
                        <p>Amortizing, 30 Year</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4'>
                        <p className='flex gap-1 items-center'> Interes Rate: </p>
                        <p>7%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financing;