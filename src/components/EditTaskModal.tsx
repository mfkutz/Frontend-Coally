import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getTaskById, updateTask } from '../api/TaskAPI';
import { TaskFormData } from '../types';

export default function EditTaskModal() {

    const navigate = useNavigate()

    const params = useParams()
    const taskId = params.taskId!

    const { data } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({ taskId }),
        enabled: !!taskId,
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>()

    useEffect(() => {
        if (data) {
            reset({
                title: data.title,
                description: data.description,
            });
        }
    }, [data, reset]);

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message || "Error updating task")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task", taskId] })
            toast.success("Task updated successfully");
            navigate(-1);
        }
    })

    const handleEditTask = (formData: TaskFormData) => {
        mutate({ taskId, formData });
    };

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(-1)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#161722] text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="text-white text-4xl  my-5"
                                >
                                    Edit Task
                                </Dialog.Title>

                                <p className="text-xl font-bold text-white">Make changes to a task in {''}
                                    <span className="text-blue-600">this form</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Create a new todo..."
                                            maxLength={52}
                                            {...register("title", { required: "Title is required" })}
                                            className=" w-full p-3 text-[#cacde8] bg-[#25273c]  px-[1.5rem] pl-[1rem] lg:pl-[1rem] py-[1rem] lg:py-[1.2rem] rounded-[5px] text-[12px] lg:text-[18px] mb-[1.5rem] shadow-sm "
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


                                    <input
                                        type="submit"
                                        className=" bg-gray-600 hover:bg-gray-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Save'
                                    />

                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}