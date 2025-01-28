import React from 'react'
import CashFlow from './../component/dealCheck/CashFlow/CashFlow.jsx'
import FinanceRatio from '../component/dealCheck/FinanceRatio/FinanceRatio.jsx'
import Financing from './../component/dealCheck/Financing/Financing.jsx'

import Header from './../component/dealCheck/Header/Header.jsx'
import Investment from './../component/dealCheck/Invesment/Investment.jsx'
import Purchase from './../component/dealCheck/Purchase/Purchase.jsx'
import PurchaseCriteria from './../component/dealCheck/PurchaseCriteria/PurchaseCriteria.jsx'
import Validation from './../component/dealCheck/Validation/Validation.jsx'
import { useNavigate } from 'react-router-dom'

const DealCheck = () => {

    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1); // Goes to the previous page
    };

  return (
    <>
    <div className="flex items-center space-x-6 p-4 bg-white shadow-md mx-auto w-[1000px]">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="text-teal-500 font-semibold hover:underline"
      >
        Back
      </button>
    </div>
    <div className=' bg-slate-50 mx-auto w-[1000px]'>
      <div className=' mx-2 md:mx-20'>
          <Header></Header>
          <Purchase></Purchase>
          <Financing></Financing>
          <Validation></Validation>
          <CashFlow></CashFlow>
          <Investment></Investment>
          <FinanceRatio></FinanceRatio>
          <PurchaseCriteria></PurchaseCriteria>

      </div>
    </div>
    </>
  )
}

export default DealCheck;

