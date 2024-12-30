import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


export default function AuthLayout() {
    return (
        <>
            <div className="bg-[#161722] min-h-screen flex">
                <div className="py-10 lg:py-20 mx-auto max-w-[450px] w-full flex flex-col">
                    <div className="text-white text-center text-[40px] sm:text-[60px]  font-bold">CoallyTasks</div>
                    <div className="mt-5 sm:mt-3">
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
