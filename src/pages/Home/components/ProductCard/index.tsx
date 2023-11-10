import { ProductCardProps } from "@/types/ProductCard.type";
import { Rating, Typography } from "@mui/material";
import { Badge } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard: React.FC<ProductCardProps> = ({
	id,
	title,
	price,
	discountPercentage,
	rating,
	stock,
	brand,
	thumbnail,
	flexbox = false,
}) => {
	return (
		<Link to={`/product/${id}`}>
			<div className="relative w-[274px] border-2 border-slate-200 rounded-2xl py-[6px]">
				<Badge.Ribbon
					text={`${discountPercentage}% OFF`}
					color="red"
					className="text-xs h-fit py-1"
				>
					<img
						src={thumbnail}
						alt={title}
						height={400}
						width={400}
						className="object-cover h-[280px] w-[260px] border border-slate-200 shadow-slate-300 shadow rounded-xl mx-auto"
					/>
				</Badge.Ribbon>
				<div
					className={`relative rounded-xl ${
						flexbox ? "w-[235px]" : "w-[95%]"
					} p-2 px-3 border border-slate-200 shadow-slate-300 shadow mt-2 mx-auto`}
				>
					<Typography
						noWrap
						variant="h6"
						className="text-sm font-bold"
					>
						{title}
					</Typography>

					<div className="mt-1 text-xs flex flex-row items-center gap-1">
						<Typography
							noWrap
							variant="subtitle2"
							className="text-slate-500 font-medium text-xs"
						>
							{brand} &bull;
						</Typography>
						<Typography
							noWrap
							variant="subtitle2"
							className="text-slate-500 font-medium text-xs"
						>
							{stock} items available
						</Typography>
					</div>
					<div className="pt-1 text-xs flex flex-row items-center justify-between gap-2">
						<Typography
							noWrap
							variant="subtitle2"
							className="text-xs min-w-fit text-slate-800 font-black"
						>
							${price}
						</Typography>
						<div>
							<Rating
								value={rating}
								size="small"
								readOnly
								precision={0.5}
							/>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
