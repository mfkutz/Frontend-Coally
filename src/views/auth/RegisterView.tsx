import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "../../types";
import { useMutation } from '@tanstack/react-query'
import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const navigate = useNavigate()

    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });


    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: () => {
            toast.error("Error")
        },
        onSuccess: () => {
            toast.success("User Registered")
            reset()
            setTimeout(() => {
                navigate('/auth/login')
            }, 3000);
        }
    })

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData)
    }

    return (
        <>
            <p className="text-2xl font-light text-white mt-5">
                Fill out the form to {''}
                <span className=" text-blue-300 font-bold"> create your account</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >


                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Name</label>
                    <input
                        type="name"
                        placeholder="Registration Name"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Registration Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "The registration email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Registration Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: 'The password must be at least 8 characters long'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repeat Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repeat Registration Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repeat Password is required",
                            validate: value => value === password || 'Passwords are not equal'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Sign up'
                    className="bg-gray-600 hover:bg-gray-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/auth/login'}
                    className="text-center text-gray-300 font-normal"
                >
                    Already have an account?  <span className="text-blue-300 font-bold">Login</span>
                </Link>
            </nav>
        </>
    )
}