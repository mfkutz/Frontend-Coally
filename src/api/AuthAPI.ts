import api from "../lib/axios";
import { isAxiosError } from "axios";
import { UserLoginForm, UserRegistrationForm, userSchema } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = "/user/create-account";
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = "/auth/login";
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Unknown error");
        }
        throw new Error("An unknown error occurred");
    }
}


export async function getUser() {
    try {
        const { data } = await api('/auth/current')
        const response = userSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}