
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import { createTask, deleteTask, getAllTasks, updateStatus } from '../api/TaskAPI';
import { Task, TaskFormData } from '../types';
import Tasks from '../components/Tasks';
import { useTaskStore } from '../store';

export default function Home() {

    const { filter, setFilter } = useTaskStore()

    const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
        setFilter(newFilter);
    };

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>()
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message || "Failed to create task")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
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
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task deleted successfully");
        }
    });


    const { mutate: updateStatusMutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message || "Failed to update task status");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task status updated successfully");
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
        return <div className='bg-[#161722] h-screen flex text-center items-start justify-center text-white mt-4'>Loading tasks...</div>;
    }

    if (isError) {
        return <div className='bg-[#161722] h-screen flex text-center items-start justify-center text-white mt-4'>Error: {error instanceof Error ? error.message : "Unknown error"}</div>;
    }


    const handleStatusChange = (taskId: string, currentStatus: boolean) => {
        updateStatusMutate({ taskId, status: !currentStatus });
    };

    const handleDelete = (taskId: string) => {
        deleteTaskMutate({ taskId });
    };

    const handleEdit = (taskId: string) => {
        navigate(`/edit/${taskId}`);
    };

    const filteredTasks: Task[] = data?.filter((task: Task) => {
        if (filter === 'active') {
            return !task.status;
        } else if (filter === 'completed') {
            return task.status;
        }
        return true;
    });

    return (
        <div className="flex relative min-h-screen bg-[#161722] transition duration-500">
            <div className="max-w-[550px] m-2 absolute inset-y-0 inset-x-0 mx-auto">

                <div className="flex items-center justify-between mt-10 mb-5">
                    <h1 className="md:text-[2.5rem] text-[1.7rem] font-bold tracking-[0.9rem] text-white">
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
                    <div className="absolute rounded-full flex w-[1.2rem] h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem] items-center justify-center border border-gray-200 top-[0.9rem] left-[1.2rem] md:top-5 md:left-6"></div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <input
                                type="text"
                                placeholder="Create a new todo..."
                                maxLength={52}
                                {...register("title", { required: "Title is required" })}
                                className=" w-full p-3 text-[#cacde8] bg-[#25273c]  px-[1.5rem] pl-[3.5rem] md:pl-[4.4rem] py-[1rem] md:py-[1.2rem] rounded-[5px] text-[12px] md:text-[15px] mb-[1.5rem] shadow-sm "
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        <div>
                            <textarea
                                placeholder="Description..."
                                maxLength={255}
                                {...register("description", { required: "Description is required" })}
                                className="w-full p-4 text-[#cacde8] bg-[#25273c] px-6 pl-4 py-3 rounded-lg text-[13px] md:text-[15px] mb-4 shadow-lg resize-none"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        <button
                            className='absolute right-[1rem] top-[0.8rem] md:top-[1.1rem]  font-bold text-blue-600 text-[16px] md:text-[20px]'
                            type='submit'
                        >
                            Add
                        </button>

                    </form>
                </div>

                <div>
                    {filteredTasks?.length === 0 ? (
                        <div className='text-white text-center mb-4'>No tasks available</div>
                    ) : (
                        filteredTasks.map((task) => (
                            <Tasks
                                key={task._id}
                                title={task.title}
                                created={task.createdAt}
                                description={task.description}
                                status={task.status}
                                onEdit={() => handleEdit(task._id)}
                                onDelete={() => handleDelete(task._id)}
                                onStatusChange={() => handleStatusChange(task._id, task.status)}
                            />
                        ))
                    )}
                </div>

                <footer className="flex dark:bg-[#25273c]  bg-white border-b border-l border-r dark:border-none border-gray-200   rounded-b-[5px] justify-between px-6 py-[0.9rem] text-[14px] text-[#C8C5C4] shadow-2xl">
                    <div> {filteredTasks?.length} items</div>
                    <div className="flex gap-4 footer">
                        <button
                            className={`hover:text-black dark:hover:text-blue-400 font-bold transition-colors duration-300`}
                            onClick={() => handleFilterChange('all')}
                        >
                            All
                        </button>
                        <button
                            className={`hover:text-black dark:hover:text-blue-400  font-bold transition-colors duration-300 `}
                            onClick={() => handleFilterChange('active')}

                        >
                            Pending
                        </button>
                        <button
                            className={`hover:text-black dark:hover:text-blue-400  font-bold transition-colors duration-300 `}
                            onClick={() => handleFilterChange('completed')}
                        >
                            Completed
                        </button>
                    </div>

                </footer>
            </div>
        </div>
    )
}






