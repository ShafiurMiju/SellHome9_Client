import React from 'react';
import { FaPen, FaRegCheckCircle } from 'react-icons/fa';
import { GoCrossReference, GoQuestion } from 'react-icons/go';
import { RxCrossCircled } from "react-icons/rx";
const PurchaseCriteria = () => {
    return (
        <div className='py-16'>
            <div className='flex justify-between'>
                <h2 className='text-blue-600 text-xl font-semibold pb-5'>PURCHASE CRITERIA</h2>
                <div className='flex items-center gap-2 text-blue-600'>
                    <FaPen></FaPen>
                    <p>Edit Criteria</p>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 bg-white shadow-2xl'>
                {/* left  */}
                <div>
                    <div className='flex justify-between pl-2 pt-6 pr-6'>
                        <p className='flex gap-1 items-center'><FaRegCheckCircle className='text-green-600' /> Total Cash Needed <span className='text-green-600'>less than $50,000 </span></p>
                        
                    </div>
                    <div className='flex justify-between pl-2 pt-4 pb-6 pr-6'>
                        <p className='flex gap-1 items-center'><FaRegCheckCircle className='text-green-600' /> <span className='text-green-600'>Passes 50% Rule</span></p>
                        
                    </div>
                    
                </div>
                {/* right  */}
                <div>
                <div className='flex justify-between pl-2 pt-6 pr-6'>
                        <p className='flex gap-1 items-center'><RxCrossCircled className='text-red-600'></RxCrossCircled> Cash Flow <span className='text-red-600'>less than $150 </span></p>
                        
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PurchaseCriteria;