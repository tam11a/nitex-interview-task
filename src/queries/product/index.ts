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
