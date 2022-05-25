import axios from "axios";
import {Collection, CreateCollectionResponseDto} from "../types";

const baseUrl = process.env.REACT_APP_SHVL_API_URL;

export const useApiShvl = () => {

    return {
        collections: {
            fetchAll: () => axios.get<Array<Collection>>(`${baseUrl}/collections`).then(res => res.data),
            fetchOne: (slug: string) => axios.get<Collection>(`${baseUrl}/collections/${slug}`).then(res => res.data),
            create: (slug: string) => axios.post<CreateCollectionResponseDto>(`${baseUrl}/collections/${slug}`).then(res => res.data)
        },
        assets: {
            fetchAll: (slugCollection: string) => axios.get(`${baseUrl}/assets/${slugCollection}`).then(res => res.data),
            create: (slugCollection: string) => axios.post(`${baseUrl}/assets/${slugCollection}`).then(res => res.data),
            upload: (slugCollection: string) => axios.post(`${baseUrl}/assets/upload/${slugCollection}`).then(res => res.data),
        },
        histories: {
            fetchAll: (slugCollection: string) => axios.get(`${baseUrl}/historics/${slugCollection}`).then(res => res.data),
            create: (slugCollection: string) => axios.post(`${baseUrl}/historics/${slugCollection}`).then(res => res.data),
            upload: (slugCollection: string) => axios.post(`${baseUrl}/historics/upload/${slugCollection}`).then(res => res.data),
        }
    }


}