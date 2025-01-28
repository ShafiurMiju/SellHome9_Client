import React from 'react';
import { GoQuestion } from "react-icons/go";

const Validation = () => {
    return (
        <div className='pt-16'>
                    <h2 className='text-blue-600 text-xl font-semibold pb-5'>VALUATION</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-2xl'>
                        {/* left  */}
                        <div>
                            <div className='flex justify-between pl-2 pt-6'>
        
                                <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> After Repair Value: </p>
                                <p>$194,000</p>
                            </div>
                            <div className='flex justify-between pl-2 pt-4'>
                                <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Loan to Cost: </p>
                                <p>$207.3</p>
                            </div>
        
                        </div>
                        {/* right  */}
                        <div className='pr-6 pb-6'>
                            <div className='flex justify-between pl-2 pt-6'>
                                <p className='flex gap-1 items-center'> Price Per Square Foot: </p>
                                <p>$207</p>
                            </div>
                            <div className='flex justify-between pl-2 pt-4'>
                                <p className='flex gap-1 items-center'> Rehab Per Square Foot: </p>
                                <p>$ 0</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
    );
};

export default Validation;