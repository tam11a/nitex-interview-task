import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

const getCategories = (params: any) => {
	return instance.get(`/products/categories`, {
		params,
	});
};

export const useGetCategories = (params: any = {}) => {
	return useQuery(["get-all-category", params], () => getCategories(params), {
		select: (data) => data.data,
	});
};
