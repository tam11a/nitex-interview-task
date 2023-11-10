import instance from "@/service";
import { useMutation } from "@tanstack/react-query";

const confirmOrder = (params: any) => {
	// No Order API.. So I just using cart API to simulate the request
	return instance.post(`/carts/add`, { ...params });
};

export const useConfirmOrder = () => {
	return useMutation(confirmOrder, {});
};
