import { fetchVehicles } from "../api/apiServices";

export const buildQueryString = (params: Record<string, string | number | null>): string => {
    const queryString = Object.entries(params)
        .filter(([value]) => value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`)
        .join('&');

    return queryString ? `?${queryString}` : '';
};

export const getVehicles = async (
    filters: {
        search: string;
        fuelType: string;
        transmission: string;
    },
    setVehicles: React.Dispatch<React.SetStateAction<any[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const params = {
            search: filters.search,
            fuel_type: filters.fuelType,
            transmission: filters.transmission
        };

        const queryString = buildQueryString(params);
        const { vehicles } = await fetchVehicles(queryString);

        setVehicles(vehicles);
    } catch (error: any) {
        console.log(error)
    } finally {
        setIsLoading(false);
    }
};