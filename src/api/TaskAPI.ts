import api from "../lib/axios";

import { isAxiosError } from "axios";
import { TaskFormData, UpdateTaskParams } from "../types";

export async function createTask(formData: TaskFormData) {
    try {
        const url = `/tasks`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllTasks() {
    try {
        const url = `/tasks`;
        const { data } = await api.get(url)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getTaskById({ taskId }: Pick<UpdateTaskParams, "taskId">) {
    try {
        const url = `/tasks/${taskId}`;
        const { data } = await api.get(url)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


export async function deleteTask({ taskId }: Pick<UpdateTaskParams, "taskId">) {
    try {
        const url = `/tasks/${taskId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateStatus({ taskId, status }: Pick<UpdateTaskParams, "taskId" | "status">) {
    try {
        const url = `/tasks/${taskId}/status`;
        const { data } = await api.put<string>(url, { status });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTask({ taskId, formData }: Pick<UpdateTaskParams, "taskId" | "formData">) {
    try {
        const url = `/tasks/${taskId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
