import { useGetCategories } from "@/queries/category";
import React from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import { useGetProducts } from "@/queries/product";
import ProductCard from "./components/ProductCard";
import { Drawer, IconButton } from "@mui/material";
import Iconify from "@components/iconify";
import { Checkbox, Divider, Pagination, Slider, Tooltip } from "antd";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { ProductCardProps } from "@/types/ProductCard.type";
import { HashLink } from "react-router-hash-link";

const Home: React.FC = () => {
	const { data } = useGetCategories();
	const { state: open, toggleState: onClose } = useToggle(false);
	const [productFilter, setProductFilter] = React.useState<{
		maxPrice: number;
		minPrice: number;
		categories: string[];
	}>({
		maxPrice: 3000,
		minPrice: 0,
		categories: [],
	});

	const {
		setPage,
		page,
		limit = 0,
	} = usePaginate({
		defaultParams: {
			page: 1,
			limit: 30,
		},
	});

	const { data: products } = useGetProducts({
		limit: limit,
		skip: (page + 1) * limit - limit,
	});

	return (
		<>
			<div className="relative h-[70vh] flex flex-col">
				<img
					src="/banner.jpg"
					alt="banner"
					className="w-full brightness-[60%] h-[70vh] object-cover rounded-md absolute"
				/>
				<div className="p-3 z-10 flex-1 flex flex-col items-center gap-4 justify-center text-center">
					<h1 className="text-3xl md:text-6xl font-bold text-white">
						Find your next favorite thing.
					</h1>
					<p className="text-white text-lg md:text-2xl font-semibold">
						Discover and buy amazing things
					</p>
					<Link to={"/search"}>
						<button className="bg-slate-100 hover:bg-slate-300 text-primary-700 px-7 py-3 rounded-md shadow-md font-bold uppercase mt-8">
							Shop Now
						</button>
					</Link>
				</div>
				<div
					id="all-products"
					className="relative"
				>
					<Swiper
						spaceBetween={10}
						slidesPerView={"auto"}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false,
						}}
						modules={[Autoplay]}
						className="items-center p-3 "
					>
						{data?.map((category: string) => {
							return (
								<SwiperSlide
									key={category}
									className="w-fit hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-md"
								>
									<HashLink
										smooth
										to={`/search#${category}`}
									>
										<div className="capitalize bg-primary-100 bg-opacity-40 hover:bg-opacity-90 bg-blend-multiply text-white hover:text-primary-700 shadow-sm font-bold px-9 py-6 rounded-md drop-shadow-md transition-all duration-300">
											{category?.replace("-", " ")}
										</div>
									</HashLink>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
			<div className="mt-11 flex flex-row gap-3 items-center justify-center">
				<div>
					<Tooltip title={"Search"}>
						<IconButton color="primary">
							<Iconify icon={"iconamoon:search-duotone"} />
						</IconButton>
					</Tooltip>
				</div>
				<h2 className="text-2xl font-bold">All Products</h2>
				<div>
					<Tooltip title={"Filter Products"}>
						<IconButton
							color="primary"
							onClick={onClose}
						>
							<Iconify icon={"mi:filter"} />
						</IconButton>
					</Tooltip>
					<Drawer
						open={open}
						onClose={onClose}
						anchor="right"
						PaperProps={{
							className: "w-full max-w-[95vw] md:max-w-[500px]",
						}}
					>
						<div className="flex flex-row items-center justify-between py-4 px-7">
							<p className="font-bold">Filter Products</p>
							<IconButton
								color="primary"
								onClick={onClose}
							>
								<Iconify icon={"mdi:close"} />
							</IconButton>
						</div>
						<Divider className="my-0" />
						<div className="px-7 mt-4">
							<h4 className="mb-6">
								Price Range{" "}
								<span className="text-primary-500">
									(${productFilter.minPrice} - ${productFilter.maxPrice})
								</span>
							</h4>
							<Slider
								range={{ draggableTrack: true }}
								max={5000}
								min={0}
								marks={{
									0: "0",
									1000: "1k",
									2000: "2k",
									3000: "3k",
									4000: "4k",
									5000: "5k",
								}}
								value={[productFilter.minPrice, productFilter.maxPrice]}
								onChange={(v: any) => {
									setProductFilter((prev: any) => ({
										...prev,
										minPrice: v[0],
										maxPrice: v[1],
									}));
								}}
							/>
						</div>
						<div className="px-7 mt-4">
							<h4 className="mb-6">Categories</h4>
							<Checkbox.Group
								options={data?.flatMap((item: any) => ({
									label: item.replace("-", " ").toUpperCase(),
									value: item,
								}))}
								value={productFilter.categories}
								onChange={(v) => {
									setProductFilter((prev: any) => ({
										...prev,
										categories: v,
									}));
								}}
							/>
						</div>
					</Drawer>
				</div>
			</div>
			<div className="flex flex-row gap-4 flex-wrap items-center justify-center my-7">
				{products?.products?.map(
					(product: ProductCardProps) =>
						product.price >= productFilter.minPrice &&
						product.price <= productFilter.maxPrice &&
						(productFilter.categories.length > 0
							? productFilter.categories.includes(product.category)
							: true) && (
							<ProductCard
								key={product.id}
								{...product}
							/>
						)
				)}
			</div>
			<div className="flex flex-row items-center justify-center">
				<Pagination
					pageSize={limit}
					hideOnSinglePage
					showSizeChanger={false}
					current={page + 1}
					total={products?.total}
					onChange={(page) => {
						setPage(page - 1);
					}}
				/>
			</div>
		</>
	);
};

export default Home;
