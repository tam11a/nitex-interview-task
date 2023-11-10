import useAuth from "@/hooks/useAuth";
import Iconify from "@components/iconify";
import { Avatar, Button, Drawer, IconButton } from "@mui/material";
import { useToggle } from "@tam11a/react-use-hooks";
import { Divider, Empty } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
	const cart = useSelector((state: any) => state.cart);
	const [totalPrice, setTotalPrice] = React.useState<number>(0);

	React.useEffect(() => {
		let total = 0;
		cart?.products?.forEach((item: any) => {
			if (item) total += item.qt * item.product.price;
		});
		setTotalPrice(total);
	});

	const { state: open, toggleState: toggleOpen } = useToggle(false);

	const { isLoggedIn } = useAuth();

	return isLoggedIn ? (
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
				onClick={toggleOpen}
			>
				{totalPrice > 0 ? <> ${totalPrice}</> : <>Cart</>}
			</Button>
			<Drawer
				anchor="right"
				open={open}
				onClose={toggleOpen}
				PaperProps={{
					className: "w-[400px] max-w-full",
				}}
			>
				<div className="p-5 flex flex-row items-center justify-between">
					<h1 className="text-2xl font-bold">Cart</h1>
					<IconButton onClick={toggleOpen}>
						<Iconify icon="mdi:close" />
					</IconButton>
				</div>
				<Divider className="my-0" />
				{totalPrice > 0 ? (
					<>
						<div className="px-3 min-h-[70vh]">
							{cart?.products?.map(
								(item: any) =>
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
													<h3 className="font-bold">{item.product.title}</h3>
													<p className="text-sm">
														${item.product.price} x {item.qt} items
													</p>
												</div>
											</div>
											<p className="text-sm">${item.product.price * item.qt}</p>
										</div>
									)
							)}
						</div>
					</>
				) : (
					<div className="min-h-[70vh] flex flex-col items-center justify-center">
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					</div>
				)}
				<p className="mx-3 p-4 rounded font-bold text-right bg-slate-100">
					Total: ${totalPrice}
				</p>
				<Button
					component={Link}
					to={"/app/cart"}
					variant="contained"
					className="m-3"
					size="large"
					onClick={toggleOpen}
				>
					CHECKOUT NOW
				</Button>
			</Drawer>
		</>
	) : (
		<></>
	);
};

export default Cart;
