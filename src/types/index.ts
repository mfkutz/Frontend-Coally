import { z } from "zod"

export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;


/* Users */
export const userSchema = authSchema.pick({
    email: true
}).extend({
    _id: z.string()
})


export type TaskFormData = {
    title: string;
    description: string;
}

export type UpdateTaskParams = {
    taskId: string;
    formData: TaskFormData;
    status: boolean
};


export type Task = {
    _id: string;
    title: string;
    description: string;
    status: boolean;
    createdAt: string
};