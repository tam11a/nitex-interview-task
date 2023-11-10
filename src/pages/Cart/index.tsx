import { useConfirmOrder } from "@/queries/order";
import { clean, removeProduct } from "@/store/cart";
import { handleResponse } from "@/utilities";
import Label from "@components/Label";
import { Avatar, Button } from "@mui/material";
import { Empty, Input, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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

	const navigate = useNavigate();

	const [data, setData] = React.useState<{
		name: string;
		phone: string;
		address: string;
	}>({
		name: "",
		phone: "",
		address: "",
	});

	const { mutateAsync, isLoading } = useConfirmOrder();

	const order = async () => {
		if (!!data?.name && !!data?.phone && !!data?.address) {
			message.open({
				type: "loading",
				content: "Confirming order..",
				duration: 0,
			});
			const res = await handleResponse(
				() =>
					mutateAsync({
						userId: 1,
						products: cart?.products?.filter((item: any) => !!item),
					}),
				[200]
			);
			message.destroy();
			if (res.status) {
				localStorage.setItem(
					"orders",
					JSON.stringify([
						...(JSON.parse(localStorage.getItem("orders") || "[]") || []),
						{
							products: cart?.products?.filter((item: any) => !!item),
							receipent: data,
						},
					])
				);
				dispatch(clean());
				navigate(`/congratulations/${data?.name}`);
			} else {
				message.error(res.message);
			}
		} else {
			message.error("Please fill all fields");
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
													{item.product.title} &bull;{" "}
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
										<p className="text-sm font-bold">
											${item.product.price * item.qt}
										</p>
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
			<div className="px-7">
				<h3 className="font-bold text-xl my-2 mb-5">Delivery Information:</h3>
				<Label isRequired>Receipent Name</Label>
				<Input
					placeholder="Enter Name (Example: John Doe)"
					className="mb-3 mt-2"
					size="large"
					value={data.name}
					onChange={(e) =>
						setData((prev: any) => ({ ...prev, name: e.target.value }))
					}
				/>
				<Label isRequired>Receipent Phone Number</Label>
				<Input
					prefix="+880"
					placeholder="1768 161 994"
					className="mb-3 mt-2"
					size="large"
					value={data.phone}
					onChange={(e) =>
						setData((prev: any) => ({ ...prev, phone: e.target.value }))
					}
				/>
				<Label isRequired>Receipent Address</Label>
				<Input.TextArea
					placeholder="Landmark, Street, City, State, Country, Pincode.."
					className="mb-3 mt-2"
					size="large"
					rows={6}
					value={data.address}
					onChange={(e) =>
						setData((prev: any) => ({ ...prev, address: e.target.value }))
					}
				/>
				<Button
					size="large"
					variant="contained"
					fullWidth
					disabled={isLoading}
					onClick={() => order()}
				>
					Confirm Order
				</Button>
			</div>
		</div>
	);
};

export default CartPage;
