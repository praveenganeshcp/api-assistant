import { Injectable } from "@nestjs/common";
import * as axios from "axios";

@Injectable()
export class CRUDAppAPIAdapter {

    async get<T>(port:number, path: string) {
        const response = await axios.default.get(`http://localhost:${port}${path}`)
        return response.data;
    }

    async post<T>(port:number, path: string, body: any) {
        const response = await axios.default.post(`http://localhost:${port}${path}`, body)
        return response.data;
    }

    async patch<T>(port:number, path: string, body: any) {
        const response = await axios.default.patch(`http://localhost:${port}${path}`, body);
        return response.data;
    }

    async delete<T>(port:number, path: string) {
        const response = await axios.default.delete(`http://localhost:${port}${path}`)
        return response.data;
    }
}