import { removeProduct } from "@/store/cart";
import { Avatar } from "@mui/material";
import { Empty } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
	const cart = useSelector((state: any) => state.cart);
	const [totalPrice, setTotalPrice] = React.useState<number>(0);

	React.useEffect(() => {
		let total = 0;
		cart?.products?.forEach((item: any) => {
			if (item) total += item.qt * item.product.price;
		});
		setTotalPrice(total);
	});

	const dispatch = useDispatch();

	const removeFromCart = (index: number) => {
		dispatch(
			removeProduct({
				index,
			})
		);
	};

	return (
		<div>
			<div className="p-3 px-5 min-h-[70vh] bg-slate-100 rounded">
				<h3 className="font-bold text-xl my-2 mb-5">Products:</h3>
				{totalPrice > 0 ? (
					<>
						{cart?.products?.map(
							(item: any, index: number) =>
								item && (
									<div className="flex flex-row my-3 items-center justify-between gap-3">
										<div className="flex flex-row items-center gap-3">
											<Link to={`/product/${item.product.id}`}>
												<Avatar
													variant="rounded"
													src={item.product.thumbnail}
													alt={item.product.title}
													className="w-14 h-14 object-cover"
												/>
											</Link>
											<div>
												<h3 className="font-bold flex flex-row items-center flex-wrap">
													{item.product.title}{" "}
													<span
														className="text-red-500 font-medium ml-1 cursor-pointer text-sm underline"
														onClick={() => removeFromCart(index)}
													>
														Remove
													</span>
												</h3>
												<p className="text-sm">
													${item.product.price} x {item.qt} items
												</p>
											</div>
										</div>
										<p className="text-sm">${item.product.price * item.qt}</p>
									</div>
								)
						)}
					</>
				) : (
					<div className="min-h-[70vh] flex flex-col items-center justify-center">
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					</div>
				)}
			</div>
		</div>
	);
};

export default CartPage;
