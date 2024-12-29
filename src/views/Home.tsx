
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import { createTask, deleteTask, getAllTasks } from '../api/TaskAPI';
import { TaskFormData } from '../types';
import Tasks from '../components/Tasks';

export default function Home() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>()

    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message || "Failed to create task")
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"])
            toast.success("Task created successfuly");
            reset()
        }
    })

    const { mutate: deleteTaskMutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message || "Failed to delete task")
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            toast.success("Task deleted successfully");
        }
    });


    const onSubmit = (formData: TaskFormData) => mutate(formData)

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.removeQueries({ queryKey: ['user'] });
        navigate('/auth/login')
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: getAllTasks,
        enabled: true,
        retry: false,
    })

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (isError) {
        return <div>Error: {error instanceof Error ? error.message : "Unknown error"}</div>;
    }




    console.log(data)
    const handleDelete = (taskId: string) => {
        deleteTaskMutate({ taskId });
    };

    const handleEdit = (taskId: string) => {
        navigate(`/edit/${taskId}`);
    };

    return (
        <div className="flex relative min-h-screen bg-[#161722] transition duration-500">
            <div className="wrapper m-2 absolute inset-y-0 inset-x-0 mx-auto">

                <div className="flex items-center justify-between pt-[1.3rem] sm:pt-[2rem] lg:pt-[3.4rem] pb-[1.5rem]  sm:pb-[1.7rem] lg:pb-[1.85rem]">
                    <h1 className="lg:text-[2.5rem] text-[1.5rem] font-bold tracking-[0.9rem] text-white pt-2">
                        TODO
                    </h1>

                    <button
                        className='text-gray-300 bg-blue-600 px-3 py-1 cursor-pointer hover:bg-blue-700 transition-colors duration-300'
                        onClick={logout}
                    >
                        Log out
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute rounded-full flex w-[1.2rem] h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem] items-center justify-center border border-gray-200 top-[0.9rem] left-[1.2rem] lg:top-5 lg:left-6"></div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <input
                                type="text"
                                placeholder="Create a new todo..."
                                maxLength={52}
                                {...register("title", { required: "Title is required" })}
                                className=" w-full p-3 text-[#cacde8] bg-[#25273c]  px-[1.5rem] pl-[3.5rem] lg:pl-[4.4rem] py-[1rem] lg:py-[1.2rem] rounded-[5px] text-[12px] lg:text-[18px] mb-[1.5rem] shadow-sm "
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        <div>
                            <textarea
                                placeholder="Description..."
                                maxLength={255}
                                {...register("description", { required: "Description is required" })}
                                className="w-full p-4 text-[#cacde8] bg-[#25273c] px-6 pl-4 py-3 rounded-lg text-[13px] lg:text-[15px] mb-4 shadow-lg resize-none"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        <button
                            className='absolute right-[1rem] top-[1.1rem]  font-bold text-blue-600 text-[20px]'
                            type='submit'
                        >
                            Add
                        </button>

                    </form>
                </div>

                <div>
                    {data && data.length === 0 ? (
                        <div className='text-white text-center mb-4'>No tasks available</div>
                    ) : (
                        data.map((task) => (
                            <Tasks
                                key={task._id}
                                title={task.title}
                                description={task.description}
                                onEdit={() => handleEdit(task._id)}
                                onDelete={() => handleDelete(task._id)}
                            />
                        ))
                    )}
                </div>

                <footer className="flex dark:bg-[#25273c]  bg-white border-b border-l border-r dark:border-none border-gray-200   rounded-b-[5px] justify-between px-6 py-[0.9rem] text-[14px] text-[#C8C5C4] shadow-2xl">
                    <div> 0 items left</div>
                    <div className="flex gap-4 footer">
                        <button
                            className={`hover:text-black dark:hover:text-blue-400 font-bold transition-colors duration-300`}
                        >
                            All
                        </button>
                        <button
                            className={`hover:text-black dark:hover:text-blue-400  font-bold transition-colors duration-300 `}

                        >
                            Active
                        </button>
                        <button
                            className={`hover:text-black dark:hover:text-blue-400  font-bold transition-colors duration-300 `}
                        >
                            Completed
                        </button>
                    </div>
                    <button
                        className="hover:text-black dark:hover:text-blue-400 transition-colors duration-300  "
                    >
                        Clear Completed
                    </button>
                </footer>
            </div>
        </div>
    )
}






