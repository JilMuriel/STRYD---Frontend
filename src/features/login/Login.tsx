import StravaIcon from '../../assets/logo/strava-icon.svg';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/strava`;
  };

  return (
    <main className="min-h-screen bg-[#f6faf8] text-[#171d1c] antialiased">
      <div className="flex container min-h-screen flex-col md:flex-row mx-auto">
        <section className="relative flex h-[40vh] min-h-[340px] w-full flex-col items-center justify-center overflow-hidden px-8 text-center md:h-auto md:min-h-screen md:w-1/2 md:items-start md:justify-center md:px-16 md:text-left lg:px-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#4db6ac]/20 via-[#f6faf8] to-[#f6faf8] md:bg-[#eaefed]" />

          <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e4e9e7] shadow-sm md:hidden">
            <svg viewBox="0 0 24 24" className="h-10 w-10 fill-[#006a63]" aria-hidden="true">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
          </div>

          <div className="relative z-10 max-w-lg">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-[#006a63] md:mb-6">STRYD</h1>

            <h2 className="mb-4 hidden text-4xl font-semibold leading-tight text-[#171d1c] md:block">
              Understand your cycling performance at a glance with STRYD.
            </h2>

            <p className="mx-auto max-w-xs text-lg leading-relaxed text-[#3d4947] md:mx-0 md:max-w-md md:text-xl">
              Understand your cycling performance at a glance with STRYD.
            </p>

            <p className="mt-6 hidden max-w-md text-lg leading-relaxed text-[#3d4947] md:block">
              Connect your data to track fitness, manage fatigue, and optimize form. No clutter, just actionable
              physiological insights for high-performance individuals.
            </p>

            <div className="mt-10 hidden gap-6 md:flex">
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
          <div className="mx-auto w-full max-w-sm md:max-w-md">
            <div className="mb-8 h-1.5 w-12 rounded-full bg-[#dfe3e2] md:hidden" />

            <div className="mb-8 hidden h-20 w-20 items-center justify-center rounded-2xl bg-[#e4e9e7] shadow-sm md:flex">
              <svg viewBox="0 0 24 24" className="h-10 w-10 fill-[#006a63]" aria-hidden="true">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
            </div>

            <h3 className="mb-3 text-3xl font-semibold leading-tight text-[#171d1c] md:text-4xl">
              Sync Your Activities with STRYD
            </h3>

            <p className="mb-8 text-base leading-relaxed text-[#3d4947] md:text-lg">
              Seamlessly import your ride history and real-time metrics to start generating actionable physiological
              insights.
            </p>

            <button
              type="button"
              onClick={handleLogin}
              className="mb-6 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#FC4C02] px-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#FC4C02]/20 transition-all duration-200 hover:bg-[#e34402] active:scale-[0.99] md:h-12 md:normal-case md:tracking-normal"
            >
              <img src={StravaIcon} alt="Strava" className="h-5 w-5" />
              <span>Connect with Strava</span>
            </button>

            <div className="mt-8 border-t border-[#dfe3e2] pt-6 md:mt-4 md:rounded-xl md:border-0 md:bg-[#f0f5f3] md:p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-lg text-[#6d7a77] md:text-base">🔒</span>
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

export default Login;