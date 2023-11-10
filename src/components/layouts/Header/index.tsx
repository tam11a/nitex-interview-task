import { useGetSearch } from "@/queries/product";
import Iconify from "@components/iconify";
import { Avatar, Button } from "@mui/material";
import { AutoComplete, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Header: React.FC = () => {
	const [q, setQ] = React.useState<string>("");
	const { data: search } = useGetSearch({
		q,
	});

	const [options, setOptions] = React.useState<any>([]);

	React.useEffect(() => {
		setOptions(
			Array.from(search?.products || []).map((item: any) => ({
				label: item.title,
				value: item.id,
				data: item,
			}))
		);
	}, [search]);

	const navigate = useNavigate();

	return (
		<header className="bg-primary-light px-8 py-3 shadow-md">
			<div className="max-w-5xl flex flex-row items-center justify-between gap-4 mx-auto">
				<Link to={"/"}>
					<img
						src="/logo.svg"
						alt="logo"
						className="max-h-12"
					/>
				</Link>
				<div className="flex-1">
					<AutoComplete
						menuItemSelectedIcon={<Iconify icon={"iconamoon:search-duotone"} />}
						showSearch
						allowClear
						autoClearSearchValue
						size="large"
						className="w-full rounded-full"
						placeholder="Search for Products, Brands, Category..."
						options={options}
						onSearch={(value) => setQ(value)}
						onSelect={(value) => {
							navigate(`/product/${value}`);
							setQ("");
						}}
						value={q}
						optionRender={(option) => (
							<Space key={option.data.id}>
								<span
									role="img"
									aria-label={option.data.id}
								>
									<Avatar
										src={option.data?.data?.thumbnail}
										variant="rounded"
										className="h-14 w-14"
									/>
								</span>
								<div>
									<p className="text-xs">{option.data?.data?.brand}</p>
									<p className="font-bold">{option.label}</p>
									<p className="text-xs font-semibold">
										${option.data?.data?.price}
									</p>
								</div>
							</Space>
						)}
					/>
				</div>
				<HashLink
					to="/#all-products"
					className="text-white hidden md:inline-block text-sm"
					smooth
				>
					All Products
				</HashLink>
				<Link
					to="/contact"
					className="text-white hidden md:inline-block text-sm"
				>
					Contact
				</Link>
				<Button
					variant="contained"
					className="text-white bg-primary-dark rounded-full"
				>
					Sign in
				</Button>
			</div>
		</header>
	);
};

export default Header;
