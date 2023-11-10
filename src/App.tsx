import React, { lazy } from "react";

import theme from "@styles/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@components/layouts/Header";
import Footer from "@components/layouts/Footer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store";
import Cart from "@components/Cart";

const BaseRoutes = lazy(() => import("./routes"));

const query = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={query}>
				<ThemeProvider theme={theme}>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: theme.palette.primary.main,
								borderRadius: 4,
								fontFamily: theme.typography.fontFamily,
							},
						}}
					>
						<CssBaseline />
						<BrowserRouter>
							<section className="max-w-7xl shadow-lg mx-auto bg-white">
								<Header />
								<main className="min-h-[70vh] p-5">
									<Cart />
									<BaseRoutes />
								</main>
								<Footer />
							</section>
						</BrowserRouter>
					</ConfigProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	);
};

export default App;
