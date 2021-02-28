import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (err) {
        console.log(err);
        return await Promise.reject(err);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const resquests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => resquests.get<Activity[]>('/activities'),
    details: (id: string) => resquests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => resquests.post<void>('/activities', activity),
    update: (activity: Activity) => resquests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => resquests.del<void>(`/activities/${id}`)
}

const agent ={
    Activities
}

export default agent;