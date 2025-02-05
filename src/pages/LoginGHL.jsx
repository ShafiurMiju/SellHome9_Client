import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../component/Loading";
import { AlertCircle, PhoneCall } from "lucide-react";
import loginFail from "../assets/login_fail.avif"
import { API_URL } from "../baseurl";

const LoginGHL = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (email && password) {
      handleLogin(email, password);
    }
    else{
      navigate("/")
    }
  }, [searchParams]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result?.token);
        localStorage.setItem("user", JSON.stringify(result?.user));
        navigate("/property-search");
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Login failed");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-96">
        {loading ? (
          <Loading />
        ) : (
          <h1 className="text-2xl font-bold text-gray-700"></h1>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex flex-col items-center">
            <div className="flex items-center">
              <AlertCircle className="mr-2 text-red-500" />
              <span className="uppercase">{errorMessage}</span>
            </div>
            <img src={loginFail} alt="No User Found" className="mt-5 rounded" />
            <button
              onClick={() => window.location.href = "tel:+1234567890"}
              className="mt-5 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600"
            >
              <PhoneCall className="mr-2" /> Call Support
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginGHL;
