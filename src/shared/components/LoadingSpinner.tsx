type LoadingScreenProps = {
    message?: string;
};

export default function LoadingScreen({
    message = "Loading your data...",
}: LoadingScreenProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">

            {/* Spinner */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-[#FC4C02] rounded-full animate-spin mb-6" />

            {/* Text */}
            <p className="text-sm sm:text-base text-gray-600 text-center">
                {message}
            </p>

        </div>
    );
}