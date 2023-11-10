import Iconify from "@components/iconify";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Cart: React.FC = () => {
	const cart = useSelector((state: any) => state.cart);
	console.log(cart);
	const [totalPrice, setTotalPrice] = React.useState<number>(0);

	React.useEffect(() => {
		let total = 0;
		cart?.products?.forEach((item: any) => {
			if (item) total += item.qt * item.product.price;
		});
		setTotalPrice(total);
	});

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				startIcon={
					<Iconify
						icon="mdi:cart"
						className="text-white"
					/>
				}
				size="large"
				className="fixed bottom-[50%] -translate-y-[50%] rounded-r-none right-0 z-50 "
			>
				${totalPrice}
			</Button>
		</>
	);
};

export default Cart;
