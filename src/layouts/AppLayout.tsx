import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from "../hooks/useAuth"


export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()


    if (isLoading) return <div className="bg-[#161722] text-white min-h-screen flex items-center justify-center">Loading...</div>
    if (isError) {
        return <Navigate to='/auth/login' />
    }

    if (data) return (
        <>
            <section className="px-5">
                <Outlet />
            </section>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
