import React from 'react';
import { GoQuestion } from 'react-icons/go';

const Investment = () => {
    return (
        <div className='pt-16'>
            <h2 className='text-blue-600 text-xl font-semibold pb-5'>INVESTMENT RETURNS (Year 1)</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-2xl'>
                {/* left  */}
                <div>
                    <div className='flex justify-between pl-2 pt-6'>

                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Cap Rate (Purchase Price): </p>
                        <p>5.1%</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Cap Rate (Market Value): </p>
                        <p>5.1%</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 text-red-600'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Cash on Cas Return: </p>
                        <p>-5.5%</p>
                    </div>

                </div>
                {/* right  */}
                <div className='pr-6 pb-6'>
                    <div className='flex justify-between pl-2 pt-6 text-red-600'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Return on Equity: </p>
                        <p>-5.3%</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 text-red-600'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Return on Ivestment: </p>
                        <p>-28.8%</p>
                    </div>
                    <div className='flex justify-between pl-2 pt-4 text-red-600'>
                        <p className='flex gap-1 items-center'><GoQuestion className='text-blue-600'></GoQuestion> Internal Rate of Return: </p>
                        <p>-28.8%</p>
                    </div>
                    

                </div>
            </div>
        </div>
    );
};

export default Investment;