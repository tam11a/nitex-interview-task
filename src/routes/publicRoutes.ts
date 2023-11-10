import { lazy } from "react";
import { PUBLIC_ROUTES } from "./paths";

export const publicRoutes = [
	{
		path: PUBLIC_ROUTES.HOME,
		Component: lazy(() => import("@pages/Home")),
	},
	{
		path: PUBLIC_ROUTES.SEARCH,
		Component: lazy(() => import("@pages/Search")),
	},
	{
		path: PUBLIC_ROUTES.PRODUCT,
		Component: lazy(() => import("@pages/Product")),
	},
	{
		path: PUBLIC_ROUTES.CONTACT,
		Component: lazy(() => import("@pages/Contact")),
	},
	{
		path: PUBLIC_ROUTES.SIGN,
		Component: lazy(() => import("@pages/Sign")),
	},
	{
		path: PUBLIC_ROUTES.NOTFOUND,
		Component: lazy(() => import("@pages/NotFound")),
	},
];
