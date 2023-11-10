import { useGetCategories } from "@/queries/category";
import React from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const Home: React.FC = () => {
	const { data } = useGetCategories();
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
						className="items-center p-3 "
					>
						{data?.map((category: string) => {
							return (
								<SwiperSlide
									key={category}
									className="w-fit hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-md"
								>
									<Link to={`/search?=category=${category}`}>
										<div className="capitalize bg-primary-100 bg-opacity-40 hover:bg-opacity-90 bg-blend-multiply text-white hover:text-primary-700 shadow-sm font-bold px-9 py-6 rounded-md drop-shadow-md transition-all duration-300">
											{category?.replace("-", " ")}
										</div>
									</Link>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</>
	);
};

export default Home;
