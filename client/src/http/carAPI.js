import {$authHost, $host} from "./index";

export const createManufacturer = async (manufacturer) => {
    const {data} = await $authHost.post('api/manufacturer', manufacturer)
    return data
}

export const fetchManufacturers = async () => {
    const {data} = await $host.get('api/manufacturer')
    return data
}

export const createCarName = async (CarName) => {
    const {data} = await $authHost.post('api/carname', CarName)
    return data
}

export const fetchCarNames = async () => {
    const {data} = await $host.get('api/carname')
    return data
}

export const createCar = async (car) => {
    const {data} = await $authHost.post('api/car', car)
    return data
}

export const fetchCars = async (manufacturerId, carNameId, page, limit= 10) => {
    const {data} = await $host.get('api/car', {params: {
            manufacturerId, carNameId, page, limit
        }})
    return data
}

export const fetchOneCar = async (id) => {
    const {data} = await $host.get('api/car/' + id)
    return data
}

export const changeStatus = async (id, value) => {
    const {data} = await $authHost({method:'PUT', url:`api/car/${id}`, data: value});
    return data;
}

export const deleteManufacturer = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/manufacturer/'+id});
    return data;
}
export const deleteCarName = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/carname/'+id});
    return data;
}
export const deleteCar = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/car/${id}`});
    return data;
}



