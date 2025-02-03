import { Info, Mail, Phone, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SkipTrace = ({
  ownerInfo,
  handleSkipTrace,
  buttonRef,
  showText,
  OwnersData,
}) => {
  const navigate = useNavigate();

  if(ownerInfo===undefined){
    return (
      <div className="text-center mt-16">
        <h1 className="text-2xl font-bold">No Data Found</h1>
        <button
          onClick={() => navigate("/property-search")}
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No date available"; // Handle undefined or null dateString
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits for month
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  // console.log(OwnersData?.existingData);
  // Safely access OwnersDetails from OwnersData
  const { data: OwnersDetails } = OwnersData || {};

  // Safely access the date from existingData
  const formattedDate = OwnersData?.existingData?.[0]?.date
    ? formatDate(OwnersData.existingData[0].date)
    : formatDate(new Date());


  const ownerFullNames = Object.keys(ownerInfo)
    .filter(
      (key) =>
        key.includes("FullName") && // Check if the key includes "FullName"
        ownerInfo[key] && // Ensure the value is not null or undefined
        ownerInfo[key].trim() !== "" // Ensure the value is not an empty string
    )
    .map((key) => ownerInfo[key]);

  return (
    <div>
      <div className={`mb-8`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Owner Information</h2>
          {/* <ChevronUp size={20} className="text-gray-500" /> */}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {/* Owner Name */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex gap-2">
                <User size={16} className="text-gray-400 mt-[5px]" />
                <span className="text-gray-500">Owner Name</span>
              </div>
              <div className={`text-right`}>
                <ul className="list-none p-0 m-0">
                  {ownerFullNames && ownerFullNames.length > 0 ? (
                    ownerFullNames.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))
                  ) : (
                    <li>--</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Mailing Address */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex gap-2">
                <Mail size={16} className="text-gray-400 mt-[5px]" />
                <span className="text-gray-500">Mailing Address</span>
              </div>
              <div
                className={`text-right ${
                  !OwnersDetails ? "blur-sm" : ""
                }`}
              >
                {!OwnersDetails ? (
                  <div>mail address</div>
                ) : (
                  <div>{ownerInfo?.mailAddress?.label || "--"}</div>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex gap-2">
                <Mail size={16} className="text-gray-400 mt-[5px]" />
                <span className="text-gray-500">Email Address</span>
              </div>
              <div
                className={`text-right ${
                  !OwnersDetails ? "blur-sm" : ""
                }`}
              >
                {!OwnersDetails ? (
                  <div>mail@exmple.com</div>
                ) : (
                  <div>
                    <ul className="list-none p-0 m-0">
                      {OwnersDetails?.output?.identity?.emails &&
                      OwnersDetails?.output?.identity?.emails.length > 0 ? (
                        OwnersDetails?.output?.identity?.emails.map(
                          (name, index) => <li key={index}>{name?.email}</li>
                        )
                      ) : (
                        <li>--</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Age */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex gap-2">
                <Info size={16} className="text-gray-400 mt-[5px]" />
                <span className="text-gray-500">Age</span>
              </div>
              <div
                className={`text-right ${
                  !OwnersDetails ? "blur-sm" : ""
                }`}
              >
                {!OwnersDetails ? (
                  <div>-- years old</div>
                ) : (
                  <div>{OwnersDetails?.output?.demographics?.age} years old</div>
                )}
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex gap-2">
                <Phone size={16} className="text-gray-400 mt-[5px]" />
                <span className="text-gray-500">Phone Number(s)</span>
              </div>
              <div
                className={`text-right ${
                  !OwnersDetails ? "blur-sm" : ""
                }`}
              >
                {!OwnersDetails ? (
                  <div>0000000000</div>
                ) : (
                  <div>
                    <ul className="list-none p-0 m-0">
                      {OwnersDetails?.output?.identity?.phones &&
                      OwnersDetails?.output?.identity?.phones.length > 0 ? (
                        OwnersDetails?.output?.identity?.phones.map(
                          (name, index) => <li key={index}>{name.phoneType} {name.phone}</li>
                        )
                      ) : (
                        <li>--</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Skip Trace Button */}
      <div className="mt-6">
        {OwnersDetails || showText ? (
          <div className="flex gap-4 justify-center items-center">
            <p className="text-lg text-center text-gray-700 mt-2">
              {formattedDate}
            </p>
            <p
              onClick={handleSkipTrace}
              className="text-center text-blue-500 hover:text-blue-700 text-lg mt-2 cursor-pointer underline"
              aria-label="Skip Trace Again"
            >
              Skip Trace Again
            </p>
          </div>
        ) : (
          <button
            ref={buttonRef}
            onClick={handleSkipTrace}
            className="w-full bg-orange-400 text-white py-3 rounded flex items-center justify-center gap-2"
            aria-label="Skip Trace"
          >
            <Mail size={20} />
            Skip Trace
          </button>
        )}

        <p className="text-center text-gray-500 text-sm mt-2">
          Get the owner's phone number(s), email address(es), and more.
        </p>
      </div>
    </div>
  );
};

export default SkipTrace;
