import StravaIcon from '../../assets/logo/strava-icon.svg';
import LeftBackground from './asset/bg-left.jpg';
import StrydIcon from './asset/stryd-icon.svg';
import LockIcon from './asset/lock.svg'

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/strava`;
  };

  return (
    <main className="min-h-screen bg-[#f6faf8] text-[#171d1c] antialiased">
      <div className="flex container min-h-screen flex-col md:flex-row mx-auto">
        <section className="relative flex h-[40vh] min-h-[340px] w-full flex-col items-center justify-center overflow-hidden px-8 text-center md:h-auto md:min-h-screen md:w-1/2 md:items-start md:justify-center md:px-[120px] md:text-left">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjbLTD-ekAYVC5hzkB-Eh1bLE_GUAmlV5JUiiHUzKlebz-Jukt7CRtkcp5Z-z3PAtjoFIgt9JVAk7t0_zevIW4bhhMbGa2ktnN_nfYve93Aq82IQfD6f4bIsNjNwXlB9JWHrILf4gCZBpwypwgyBfE5x2OrlUbBe1gb0SIYvmHY22q4OQKZp5lvbxKm4EiSxzbrTq_0APSDciHoFWMlVIz-0FKFlAK5L1LJvkVEJCMilJY619TCl1nQ8rCoHUEgMPNZKpYP5Ktl_E')",
            }}
          />
          <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#eaefed] to-transparent md:block" />

          <img src={StrydIcon} alt="STRYD" className="mx-auto mb-10 h-20 w-20 md:hidden" />

          <div className="relative z-10 max-w-lg">
            <h1 className="mb-6 text-5xl font-bold tracking-[-0.025em] text-[#006a63]">STRYD</h1>

            <h2 className="mb-4 hidden text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#171d1c] md:block">
              Understand your cycling performance at a glance with STRYD.
            </h2>

            <p className="mx-auto max-w-xs text-lg leading-relaxed text-[#3d4947] md:mx-0 md:max-w-md md:text-xl">
              Understand your cycling performance at a glance with STRYD.
            </p>

            <p className="mt-6 hidden max-w-md text-lg leading-[1.6] text-[#3d4947] md:block">
              Connect your data to track fitness, manage fatigue, and optimize form. No clutter, just actionable
              physiological insights for high-performance individuals.
            </p>

            <div className="mt-[25px] hidden gap-4 md:flex">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#006a63]">Fitness</span>
                <div className="h-1 w-16 rounded-full bg-[#4db6ac]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6764]">Fatigue</span>
                <div className="h-1 w-16 rounded-full bg-[#fd6764]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#171d1c]">Form</span>
                <div className="h-1 w-16 rounded-full bg-[#171d1c]" />
              </div>
            </div>
          </div>
        </section>

        <section className="z-10 flex w-full flex-1 flex-col rounded-t-[32px] bg-white px-8 pb-10 pt-8 shadow-[0_-8px_32px_rgba(0,0,0,0.03)] md:min-h-screen md:w-1/2 md:justify-center md:rounded-none md:bg-[#f6faf8] md:px-12 md:py-16 md:shadow-[-20px_0_40px_rgba(0,0,0,0.03)] lg:px-16">
          <div className="mx-auto w-full max-w-sm md:w-[384px] md:max-w-[384px]">
            <div className="mb-8 h-1.5 mx-auto w-12 rounded-full bg-[#dfe3e2] md:hidden" />

            <img src={StrydIcon} alt="STRYD" className="mb-8 hidden h-20 w-20 md:block" />

            <h3 className="mb-4 text-center text-[24px] font-semibold leading-[31.2px] text-[#171d1c]">
              Sync Your Activities with STRYD
            </h3>

            <p className="mb-12 text-base leading-relaxed text-[#3d4947] md:px-8 md:text-base md:leading-6 md:text-center">
              Import your history and start building your physiological profile immediately.
            </p>

            <button
              type="button"
              onClick={handleLogin}
              className="mb-6 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FC4C02] px-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#FC4C02]/20 transition-all duration-200 hover:bg-[#e34402] active:scale-[0.99] md:h-12 md:normal-case md:tracking-normal"
            >
              <img src={StravaIcon} alt="Strava" className="h-5 w-5" />
              <span>Connect with Strava</span>
            </button>

            <div className="mt-4 border-t border-[#dfe3e2] pt-6 md:mt-4 md:rounded-xl md:border-0 md:bg-[#f0f5f3] md:p-4">
              <div className="flex items-start gap-3">
                <img className="mt-0.5 text-lg text-[#6d7a77] md:text-base" src={LockIcon} />
                <p className="text-sm leading-relaxed text-[#3d4947]">
                  We only read your activity data. No posting without permission. Your physiological data is kept
                  private and secure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};


// export const Login = () => {
//   const handleLogin = () => {
//     window.location.href = `${API_URL}/auth/strava`;
//   };
//   return (
//     <div className="bg-[#f6faf8] text-[#171d1c] min-h-screen w-full overflow-hidden flex flex-col md:flex-row antialiased">
//       {/* Left Side */}
//       <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-[#eaefed] flex flex-col justify-center px-8 lg:px-[120px] overflow-hidden">
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-multiply"
//           style={{
//             backgroundImage:
//               "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjbLTD-ekAYVC5hzkB-Eh1bLE_GUAmlV5JUiiHUzKlebz-Jukt7CRtkcp5Z-z3PAtjoFIgt9JVAk7t0_zevIW4bhhMbGa2ktnN_nfYve93Aq82IQfD6f4bIsNjNwXlB9JWHrILf4gCZBpwypwgyBfE5x2OrlUbBe1gb0SIYvmHY22q4OQKZp5lvbxKm4EiSxzbrTq_0APSDciHoFWMlVIz-0FKFlAK5L1LJvkVEJCMilJY619TCl1nQ8rCoHUEgMPNZKpYP5Ktl_E')",
//           }}
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#eaefed] to-transparent md:bg-gradient-to-r" />

//         <div className="relative z-10 max-w-lg">
//           <h1 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-[#006a63] mb-6">
//             STRYD
//           </h1>

//           <h2 className="text-[32px] leading-[1.2] tracking-[-0.01em] font-semibold text-[#171d1c] mb-6">
//             Understand your cycling performance at a glance with STRYD.
//           </h2>

//           <p className="text-[18px] leading-[1.6] text-[#3d4947] mb-12 max-w-md">
//             Connect your data to track fitness, manage fatigue, and optimize
//             form. No clutter, just actionable physiological insights for
//             high-performance individuals.
//           </p>

//           {/* Metrics */}
//           <div className="flex gap-4 mt-12">
//             <div className="flex flex-col gap-1">
//               <span className="text-[12px] font-semibold tracking-[0.05em] uppercase text-[#006a63]">
//                 Fitness
//               </span>
//               <div className="h-1 w-16 bg-[#4db6ac] rounded-full" />
//             </div>

//             <div className="flex flex-col gap-1">
//               <span className="text-[12px] font-semibold tracking-[0.05em] uppercase text-[#fd6764]">
//                 Fatigue
//               </span>
//               <div className="h-1 w-16 bg-[#fd6764] rounded-full" />
//             </div>

//             <div className="flex flex-col gap-1">
//               <span className="text-[12px] font-semibold tracking-[0.05em] uppercase text-[#171d1c]">
//                 Form
//               </span>
//               <div className="h-1 w-16 bg-[#171d1c] rounded-full" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-[#f6faf8] flex flex-col justify-center items-center px-8 py-12 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] relative z-10">
//         <div className="max-w-sm w-full flex flex-col items-center text-center">
//           {/* Icon */}
//           <img src={StrydIcon} alt="STRYD" className="mb-8 hidden h-20 w-20 md:block" />

//           {/* <div className="w-20 h-20 rounded-2xl bg-[#e4e9e7] flex items-center justify-center mb-12 shadow-sm">
//             <svg
//               className="w-10 h-10 text-[#006a63]"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M5 18a3 3 0 100-6 3 3 0 000 6zm14 0a3 3 0 100-6 3 3 0 000 6zM15 6l-3 6m0 0l-3-3m3 3h5"
//               />
//             </svg>
//           </div> */}

//           <h3 className="text-[24px] leading-[1.3] font-semibold text-[#171d1c] mb-4">
//             Sync Your Activities with STRYD
//           </h3>

//           <p className="text-[16px] leading-[1.5] text-[#3d4947] mb-12">
//             Import your history and start building your physiological profile
//             immediately.
//           </p>

//           {/* Strava Button */}
//           <button className="w-full bg-[#fc4c02] hover:bg-[#e34402] text-white h-12 rounded-lg text-[16px] font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm mb-6" onClick={handleLogin}>
//             <svg
//               aria-hidden="true"
//               className="w-5 h-5 fill-current"
//               viewBox="0 0 24 24"
//             >
//               <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
//             </svg>

//             Connect with Strava
//           </button>

//           {/* Privacy Note */}
//           <div className="flex items-start gap-3 text-left mt-4 p-4 bg-[#f0f5f3] rounded-xl">
//             <div className="mt-1">
//               <svg
//                 className="w-[18px] h-[18px] text-[#6d7a77]"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm-7 9v-2a7 7 0 1114 0v2H5z"
//                 />
//               </svg>
//             </div>

//             <p className="text-[14px] leading-[1.5] text-[#3d4947]">
//               We only read your activity data. No posting without permission.
//               Your physiological data is kept private and secure.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Login;
