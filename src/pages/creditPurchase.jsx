import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreditPurchase = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes to the previous page
  };

  const handlePurchase = () => {
    alert("Purchase button clicked!");
  };

  useEffect(() => {
    // Listen for messages from the iframe
    const messageHandler = (event) => {
      // Ensure the message is from the correct origin (optional)
      if (event.origin === 'https://api.leadconnectorhq.com/widget/form/5TRgrAZpnidWTJiiwc4U') {  // Adjust the origin based on the iframe URL
        if (event.data === 'purchase_clicked') {
          handlePurchase();
        }
      }
    };

    // Add event listener for messages
    window.addEventListener("message", messageHandler);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl p-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="text-teal-500 font-semibold hover:text-teal-600 mb-4 inline-block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <div className="relative">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/5TRgrAZpnidWTJiiwc4U"
              style={{
                width: "100%",
                height: "85vh",
                border: "none",
                borderRadius: "8px",
                overflow: "hidden", // Hide scrollbars
              }}
              id="inline-5TRgrAZpnidWTJiiwc4U"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Credit Purchase Sell Home9"
              data-height="941"
              data-layout-iframe-id="inline-5TRgrAZpnidWTJiiwc4U"
              data-form-id="5TRgrAZpnidWTJiiwc4U"
              title="Credit Purchase Sell Home9"
            ></iframe>
          </div>
        </div>
      </div>

      <script src="https://link.msgsndr.com/js/form_embed.js"></script>
    </>
  );
};

export default CreditPurchase;
