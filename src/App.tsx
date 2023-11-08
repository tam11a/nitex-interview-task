import React, { lazy } from "react";

import theme from "@styles/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@components/layouts/Header";
import Footer from "@components/layouts/Footer";
import { BrowserRouter } from "react-router-dom";

const BaseRoutes = lazy(() => import("./routes"));

const query = new QueryClient();

const App: React.FC = () => {
	return (
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
								<BaseRoutes />
							</main>
							<Footer />
						</section>
					</BrowserRouter>
				</ConfigProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
