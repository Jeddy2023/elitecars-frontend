import { Vehicle } from "../utils/types";
import { api } from "./axios";

export const fetchVehicles = async (queryString: string): Promise<{ vehicles: Vehicle[]}> => {
    const url = `/vehicles/all/${queryString}`;
    const response = await api.get(url);
    console.log(response)
    return {
        vehicles: response?.data?.results || [],
    };
};