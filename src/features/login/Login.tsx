import StravaIcon from '../../assets/logo/strava-icon.svg'
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/strava`;
  };

  return (
    <div className="min-h-screen bg-[#5F81F0] flex items-center px-4">
      <div className="w-full max-w-lg py-10 sm:py-16 bg-white shadow-[6px_12px_8.9px_-3px_rgba(0,0,0,0.25)] mx-auto text-center ">

        <div className="w-full max-w-sm mx-auto px-4">

          <h1 className="text-4xl sm:text-4xl font-bold mb-4 text-[#1A1B1F]">
            Elevate Your Performance
          </h1>

          <p className="text-base sm:text-lg mb-8 text-[#414755] leading-6">
            Connect your Strava account to sync your
            activities and get deep insights into your
            training progress.
          </p>

          <button
            onClick={handleLogin}
            className="gap-3 cursor-pointer justify-center w-full h-14 sm:h-16 text-base sm:text-lg bg-[#FC4C02] font-bold flex items-center text-white rounded-full mb-6"
          >
            <img src={StravaIcon} alt="strava-icon" className="w-6 h-6" />
            <span>Connect with Strava</span>
          </button>

          <p className="text-sm text-gray-500">
            Securely authorized via Strava API
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;