import React from 'react';
import { GiNetworkBars } from 'react-icons/gi'
import { FaPen } from 'react-icons/fa'
const Header = () => {
    return (
        <div>
            <div className='flex flex-col justify-between pt-10 lg:flex-row'>
                <div>
                    <h2 className='text-2xl font-semibold text-blue-600'>Property Analysis</h2>
                    <p><span className='text-blue-600'>Rentals</span> / <span className='text-blue-600'>5353 Parkline Dr</span> / Property Analysis</p>
                </div>
                <div className='flex gap-5'>
                    <button className='text-blue-600 border-2 border-blue-600 p-2 font-semibold flex gap-2 items-center'><FaPen></FaPen> <p>Edit Property</p></button>
                    <button className='text-blue-600 border-2 border-blue-600 p-2 font-semibold flex gap-2 items-center'><GiNetworkBars></GiNetworkBars> <p>Buy & Hold Projections</p></button>
                </div>
            </div>
            <p className='pt-3'>This page shows the purchase breakdown, cash flow and investment returns for this Property</p>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-10 mt-12'>
                <div className='bg-white shadow-2xl'>
                    <h2 className='pt-6 pl-6'>CASH NEEDED</h2>
                    <p className='font-bold text-blue-600 pb-6 pl-6'>$44,620</p>
                </div>
                <div className='bg-white shadow-2xl'>
                    <h2 className='pt-6 pl-6'>CASH FLOW</h2>
                    <p className='font-bold text-red-600 pb-6 pl-6'>-$203/mo</p>
                </div>
                <div className='bg-white shadow-2xl'>
                    <h2 className='pt-6 pl-6'>CAP RATE</h2>
                    <p className='font-bold text-blue-600 pb-6 pl-6'>5.1%</p>
                </div>
                <div className='bg-white shadow-2xl'>
                    <h2 className='pt-6 pl-6'>COC</h2>
                    <p className='font-bold text-blue-600 pb-6 pl-6'>-5.5%</p>
                </div>
            </div>
        </div>
    );
};

export default Header;