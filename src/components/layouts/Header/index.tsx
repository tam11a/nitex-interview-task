import useAuth from "@/hooks/useAuth";
import { useGetSearch } from "@/queries/product";
import Iconify from "@components/iconify";
import { Avatar, Button } from "@mui/material";
import { AutoComplete, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
	const { isLoggedIn } = useAuth();

	return (
		<header className="bg-primary-light px-8 py-3 shadow-md">
			<div className="max-w-7xl flex flex-row items-center justify-between gap-4 mx-auto">
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
						bordered={false}
						className="w-full max-w-xl [&>.ant-select-selector]:bg-primary-600 [&>.ant-select-selector>.ant-select-selection-search]:text-white  [&>.ant-select-clear]:bg-transparent"
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
				<Link
					to="/search"
					className="text-white hidden md:inline-block text-sm"
				>
					All Products
				</Link>
				<Link
					to="/contact"
					className="text-white hidden md:inline-block text-sm"
				>
					Contact
				</Link>
				<Button
					variant="contained"
					className="text-white bg-primary-dark rounded-full"
					component={Link}
					to={isLoggedIn ? "/app/user" : "/sign"}
				>
					{isLoggedIn ? "My Account" : "Sign in"}
				</Button>
			</div>
		</header>
	);
};

export default Header;
