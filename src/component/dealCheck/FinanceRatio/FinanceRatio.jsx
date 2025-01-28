import React from 'react';
import { GoQuestion } from 'react-icons/go';

const FinanceRatio = () => {
    return (
        <div className='pt-16'>
            <h2 className='text-blue-600 text-xl font-semibold pb-5'>FINANCIAL RATIOS (At Purchase)</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-2xl'>
                {/* left  */}
                <div>
                    <div className='flex justify-between pl-2 pt-6'>

                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Rent to value: </p>
                        <p>0.8%</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Gross Rent Multiplier: </p>
                        <p>10.04</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 text-red-600'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Equity Multiple: </p>
                        <p>0.71</p>
                    </div>

                </div>
                {/* right  */}
                <div className='pr-6 pb-6'>
                    <div className='flex justify-between pl-2 pt-6 text-red-600'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Break Even Ratio: </p>
                        <p>102.6%</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 text-red-600'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Debt Coverage Ratio: </p>
                        <p>0.8</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 '>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Debt Yield: </p>
                        <p>6.4%</p>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default FinanceRatio;