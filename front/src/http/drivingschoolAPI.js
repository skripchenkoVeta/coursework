import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/type/'+id});
    return data;
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand);
    return data;
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand');
    return data;
}

export const deleteBrand = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/brand/'+id});
    return data;
}

export const createDrivingSchool = async (brand) => {
    const {data} = await $authHost.post('api/drivingschool', brand);
    return data;
}

export const fetchDrivingSchool = async (typeId, brandId, page, limit = 9) => {
    const {data} = await $host.get('api/drivingschool', {params: {
            typeId, brandId,page, limit
        }});
    return data;
}

export const fetchOneDrivingSchool = async (id) => {
    const {data} = await $host.get(`api/drivingschool/${id}`);
    return data;
}

export const fetchDeleteDrivingSchool = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/drivingschool/${id}`});
    return data;
}

export const updateDrivingSchools = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/drivingschool/${id}`, data: body});
    return data;
}

export const getAllDrivingSchoolsInAdminPage = async (name, page = 1, filter = "Все") => {
    const {data} = await $authHost({method:'GET', url:`api/drivingschool/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}
export const getAllDrivingSchoolsInShopPage = async (name, page = 1, filter = "Все") => {
    const {data} = await $authHost({method:'GET', url:`api/drivingschool/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

export const addDrivingSchoolToBasket = async (drivingschool) => {
    const {data} = await $authHost.post('api/basket', drivingschool);
    return data;
}

export const getDrivingSchoolFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteDrivingSchoolFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}

export const addRating = async (body) => {
    const {data} = await $authHost.post('api/rating', body);
    return data;
}

export const checkRating = async (body) => {
    const {data} = await $authHost.post('api/rating/check-rating', body);
    return data;
}
export const fetchRating = async () => {
    const {data} = await $host.get('api/rating');
    return data;
}