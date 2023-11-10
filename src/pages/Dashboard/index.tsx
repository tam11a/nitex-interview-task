import useAuth from "@/hooks/useAuth";
import { clean } from "@/store/auth";
import Iconify from "@components/iconify";
import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import { Collapse, Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const Dashboard: React.FC = () => {
	const { user } = useAuth();

	const orders = JSON.parse(localStorage.getItem("orders") || "[]") || [];

	const dispatch = useDispatch();

	return (
		<div className="max-w-5xl mx-auto">
			<p className="font-bold text-2xl mb-4">My Account</p>
			<div className="flex flex-row gap-3 items-center p-3 bg-slate-100 rounded-md">
				<Avatar
					src={user?.photoURL}
					variant="rounded"
				/>
				<div className="flex flex-col flex-1">
					<h1 className="font-bold">
						{user?.displayName}{" "}
						<span className="hidden sm:inline">
							&bull;{" "}
							<span className="text-slate-500 text-sm">
								Signed in with Google
							</span>
						</span>
					</h1>
					<h2 className="text-sm text-slate-600">{user?.email}</h2>
				</div>
				<div>
					<Tooltip title="Logout">
						<IconButton
							onClick={() => {
								dispatch(clean());
							}}
						>
							<Iconify icon="mdi:logout" />
						</IconButton>
					</Tooltip>
				</div>
			</div>
			<p className="font-bold text-2xl my-4 mt-8">My Orders</p>
			{orders?.length === 0 ? (
				<div>
					<p className="text-slate-500 max-w-sm text-center mx-auto my-32">
						You have no orders yet. Please order some products to see them here.
					</p>
				</div>
			) : (
				<div>
					<Collapse
						expandIcon={() => <></>}
						bordered={false}
						items={Array.from(orders || [], (item: any, index: number) => {
							let totalQt = 0;
							let totalPrice = 0;

							item?.products?.forEach((product: any) => {
								totalQt += product?.qt;
								totalPrice += product?.product?.price * product?.qt;
							});

							return {
								key: index,
								label: (
									<div
										className="grid grid-cols-2
								md:grid-cols-3 gap-3"
									>
										<div>
											<b>{item.receipent.name}</b>
											<p>+880 {item.receipent.phone}</p>
										</div>
										<div>
											<AvatarGroup
												total={item?.products?.length}
												className="mr-3 float-left"
											>
												{item?.products?.map?.(
													(product: any, index: number) => (
														<Avatar
															alt={product?.product?.title}
															src={product?.product?.thumbnail}
															key={index}
														/>
													)
												)}
											</AvatarGroup>
											<div>
												<p>{item?.products?.length || 0} Products</p>
												<p className="font-bold">{totalQt} Items</p>
											</div>
										</div>
										<div className="col-span-2 md:col-span-1">
											<p className="text-right">
												Total: <b>${totalPrice}</b>
											</p>
										</div>
									</div>
								),
								children: (
									<div className="bg-white p-3 rounded flex flex-col gap-3">
										{item?.products?.map?.((product: any, index: number) => (
											<div
												className="flex flex-row gap-3"
												key={index}
											>
												<div>
													<Avatar
														variant="rounded"
														className="mt-1"
														alt={product?.product?.title}
														src={product?.product?.thumbnail}
													/>
												</div>
												<div>
													<p className="font-bold">{product?.product?.title}</p>
													<p className="text-sm text-slate-600">
														{product?.product?.description}
													</p>
													<p className="text-sm text-slate-600">
														${product?.product?.price} x{" "}
														<b>{product?.qt} items</b> ={" "}
														<b>${product?.product?.price * product?.qt}</b>
													</p>
												</div>
											</div>
										))}
									</div>
								),
							};
						})}
					/>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
