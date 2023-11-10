import React from "react";
import { Checkbox, Divider, Pagination, Slider, Tooltip } from "antd";
import { Drawer, IconButton } from "@mui/material";
import Iconify from "@components/iconify";
import { ProductCardProps } from "@/types/ProductCard.type";
import ProductCard from "@pages/Home/components/ProductCard";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { useGetProducts } from "@/queries/product";
import { useGetCategories } from "@/queries/category";

const Search: React.FC = () => {
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

	const { data: categories } = useGetCategories();

	return (
		<>
			<div className="my-6 flex flex-row gap-3 items-center justify-center">
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
								options={categories?.flatMap?.((item: any) => ({
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

export default Search;
