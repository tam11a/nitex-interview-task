import { useGetProduct } from "@/queries/product";
import { addProduct } from "@/store/cart";
import Iconify from "@components/iconify";
import { Avatar, Chip, IconButton } from "@mui/material";
import { Breadcrumb, Button, Image, Tag } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Product: React.FC = () => {
	const params = useParams();
	const { data: product } = useGetProduct({
		id: params.id,
	});

	const [image, setImage] = React.useState<string>(product?.thumbnail);

	const [VisibleImage, setVisibleImage] = React.useState<number | null>(null);

	React.useEffect(() => {
		setImage(product?.thumbnail);
	}, [product?.thumbnail]);

	const [qt, setQt] = React.useState<number>(1);

	const dispatch = useDispatch();

	const addToCart = () => {
		dispatch(
			addProduct({
				id: product?.id,
				qt,
				product,
			})
		);
	};

	const navigate = useNavigate();

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<Image
					src={image}
					className="border-2 border-primary-200 rounded-md w-full h-auto"
					preview={false}
					onClick={() =>
						setVisibleImage(
							product?.images?.findIndex((i: string) => i === image)
						)
					}
				/>
				<div className="flex flex-row items-center gap-3 flex-wrap">
					{product?.images?.map((i: string, index: number) => (
						<Avatar
							key={i}
							src={i}
							variant="rounded"
							className="border-2 border-primary-200"
							sx={{
								width: 60,
								height: 60,
								cursor: "pointer",
							}}
							onClick={() => {
								setImage(i);
								setVisibleImage(index);
							}}
						/>
					))}
				</div>
				<Image.PreviewGroup
					preview={{
						visible: !!VisibleImage,
						current: VisibleImage || 1,
						onVisibleChange(value) {
							if (!value) setVisibleImage(null);
						},
						onChange(current) {
							setImage(product?.images[current]);
							setVisibleImage(current);
						},
						keyboard: true,
					}}
					items={product?.images?.flatMap((i: string) => ({
						src: i,
					}))}
				/>
			</div>
			<div className="md:col-span-2 p-5">
				<Breadcrumb className="uppercase font-semibold">
					<Breadcrumb.Item>{product?.brand}</Breadcrumb.Item>
					<Breadcrumb.Item>
						{product?.category?.replace("-", " ")}
					</Breadcrumb.Item>
				</Breadcrumb>
				<h1 className="text-3xl font-semibold my-2 flex flex-row items-center gap-3">
					{product?.title}
					{product?.stock > 0 ? (
						<Tag color="success">In Stock</Tag>
					) : (
						<Tag color="error">Out of Stock</Tag>
					)}
				</h1>
				<p className="whitespace-pre-line text-sm max-w-sm">
					{product?.description}
				</p>
				<h3 className="font-bold text-3xl mt-3 flex flex-row items-center gap-3">
					${product?.price}
					<Chip
						label={`${product?.discountPercentage}% Off`}
						color="error"
						className="font-medium"
					/>
				</h3>
				<h4 className="mt-5">
					Quantity{" "}
					<span className="text-primary-400">
						({product?.stock} items available)
					</span>
				</h4>
				<div className="bg-primary-600 p-2 w-fit my-3 rounded-full flex flex-row items-center justify-between gap-3">
					<IconButton
						color="primary"
						className="bg-secondary-400"
						onClick={() => (qt > 1 ? setQt(qt - 1) : null)}
					>
						<Iconify icon={"mdi:cart-minus"} />
					</IconButton>
					<span className="text-white text-2xl">{qt}</span>
					<IconButton
						color="primary"
						className="bg-secondary-400"
						onClick={() => (qt < product?.stock ? setQt(qt + 1) : null)}
					>
						<Iconify icon={"mdi:cart-plus"} />
					</IconButton>
				</div>
				<h4 className="mt-5">
					Total Price{" "}
					<span className="text-primary-400">
						({product?.discountPercentage}% Saved)
					</span>
				</h4>
				<div>
					<div className="text-xl font-bold">${qt * product?.price}</div>
				</div>
				<div className="mt-5 flex flex-row items-center gap-3">
					<Button
						type="primary"
						size="large"
						className="bg-primary-700 flex flex-row items-center gap-4"
						onClick={() => addToCart()}
					>
						Add to Cart
					</Button>
					<Button
						size="large"
						className="flex flex-row items-center gap-4 text-primary-600 border-2 border-primary-600"
						onClick={() => {
							addToCart();
							navigate("/cart");
						}}
					>
						Order Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Product;
