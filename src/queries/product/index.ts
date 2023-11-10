import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

const getProducts = (params: any) => {
	return instance.get(`/products`, {
		params,
	});
};

export const useGetProducts = (params?: any) => {
	return useQuery(["get-all-products", params], () => getProducts(params), {
		select: (data) => data.data,
	});
};

const getSearch = (params: any) => {
	return instance.get(`/products/search`, {
		params,
	});
};

export const useGetSearch = (params?: any) => {
	return useQuery(["get-search", params], () => getSearch(params), {
		select: (data) => data.data,
	});
};
