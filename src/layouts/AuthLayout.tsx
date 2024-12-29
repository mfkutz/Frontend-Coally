import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


export default function AuthLayout() {
    return (
        <>
            <div className="bg-[#161722] min-h-screen">
                <div className="py-10 lg:py-20 mx-auto w-[450px]">
                    <div className="text-white text-center text-[60px] font-bold">CoallyTasks</div>
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
