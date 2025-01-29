import React, { useEffect, useState } from "react";

const CreditPurchase = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Dynamically load the script when the popup is open
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);

      // Clean up the script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Popup Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsOpen(false)} // Close popup on background click
        >
          <div
            style={{
              width: "90%",
              maxWidth: "800px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            {/* Embedded Form */}
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/5TRgrAZpnidWTJiiwc4U"
              style={{
                width: "100%",
                height: "500px",
                border: "none",
                borderRadius: "5px",
              }}
              id="inline-5TRgrAZpnidWTJiiwc4U"
              data-layout='{"id":"INLINE"}'
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
      )}
    </>
  );
};

export default CreditPurchase;
