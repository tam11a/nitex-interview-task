import { useGetCategoryProducts } from "@/queries/product";
import ProductCard from "@pages/Home/components/ProductCard";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const CategoryArea: React.FC<{ title: string }> = ({ title }) => {
	const { data } = useGetCategoryProducts({
		category: title,
		limit: 1000,
	});
	return (
		<div>
			<div
				className="py-5 "
				id={title}
			>
				<h3 className="capitalize font-bold text-xl">
					{title?.replace("-", " ")}
				</h3>
				<p className="font-bold text-primary-400 text-sm">
					{data?.total || 0} Products Found
				</p>
			</div>
			<div className="relative">
				<Swiper
					spaceBetween={10}
					slidesPerView={"auto"}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
					className="p-3"
				>
					{data?.products?.map((product: any) => (
						<SwiperSlide
							key={product.id}
							className="w-fit"
						>
							<ProductCard
								{...product}
								flexbox={true}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default CategoryArea;
