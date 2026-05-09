import { logout } from "../../api/auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            window.location.href = "/";
        }
    };

    return (
        <div className="min-h-screen container mx-auto bg-gray-50 text-gray-900">

            {/* Header */}
            <header className="flex justify-between items-center p-4">
                <h1 className="text-lg font-semibold">STRYD</h1>

                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-black"
                >
                    Logout
                </button>
            </header>

            {/* Content */}
            <main className="p-4 md:p-6">{children}</main>
        </div>
    );
};

export default Layout;