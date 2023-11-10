import { useGetCategories } from "@/queries/category";
import React from "react";
import CategoryArea from "./Category";

const Search: React.FC = () => {
	const { data: category } = useGetCategories();

	return (
		<div>
			{category?.map?.((item: string) => (
				<CategoryArea title={item} />
			))}
		</div>
	);
};

export default Search;
