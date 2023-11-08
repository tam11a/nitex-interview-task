import Iconify from "@components/iconify";
import React from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import {
	AppBar,
	Avatar,
	Button,
	Container,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import moment from "moment";
import { Badge } from "antd";

const Footer: React.FC = () => {
	return (
		<footer>
			<ScrollToTop
				smooth
				className="z-30 bg-primary-800 shadow-slate-900 shadow-md"
				component={
					<div className="flex flex-row items-center text-white text-xl justify-center">
						<Iconify icon={"line-md:arrow-up"} />
					</div>
				}
			/>
			<AppBar className="bg-primary-light relative shadow-none pt-16 z-20">
				<Container>
					{/* <Avatar
				variant="square"
				src={"/logo.svg"}
				className="w-fit"
			/> */}
					<Grid
						container
						className="pb-0"
						rowGap={5}
						columnGap={3}
					>
						<Grid
							item
							xs={12}
							lg={5.5}
						>
							<Typography
								variant="subtitle2"
								className="font-semibold uppercase"
							>
								e.Arc
							</Typography>
							<Typography
								variant="body2"
								className="my-5 md:max-w-xs"
							>
								The most popular and reliable website for buying branded
								products online. We are the first Bangladeshi website to sell
								100% authentic products from the world's most popular brands.
							</Typography>

							<br />

							<Typography
								variant="caption"
								className="font-semibold mt-3"
							>
								Follow Us on Social Media
							</Typography>

							{/* social media icons */}
							<div className="my-4 flex-1 flex flex-row gap-2 flex-wrap">
								<IconButton
									size="small"
									color="info"
									className="border-2 text-primary-400 border-solid border-primary-400"
									aria-label="Facebook Link"
								>
									<Iconify icon={"ri:facebook-fill"} />
								</IconButton>

								<IconButton
									size="small"
									color="info"
									className="text-primary-400 border-2 border-solid border-primary-400"
									aria-label="Linkedin Link"
								>
									<Iconify icon={"eva:linkedin-fill"} />
								</IconButton>

								<IconButton
									size="small"
									color="info"
									className="border-2 border-solid border-primary-400 text-primary-400"
									aria-label="Instagram Link"
								>
									<Iconify icon={"uil:instagram-alt"} />
								</IconButton>
							</div>
						</Grid>

						<Grid
							item
							xs={5.7}
							md={3}
							lg={1.2}
						>
							<Typography
								variant="subtitle2"
								className="font-semibold uppercase"
							>
								Company
							</Typography>

							<div className="mt-3 flex flex-col gap-2">
								<Link to={"#"}>
									<Typography
										variant="caption"
										// className="font-semibold"
									>
										About
									</Typography>
								</Link>

								<Link to="#">
									<Typography variant="caption">Refund</Typography>
								</Link>
								<Link to="#">
									<Typography
										variant="caption"
										sx={{ whiteSpace: "nowrap" }}
									>
										Cancellation
									</Typography>
								</Link>
							</div>
						</Grid>
						<Grid
							item
							xs={5.7}
							md={3}
							lg={1.9}
						>
							<Typography
								variant="subtitle2"
								className="font-semibold uppercase"
							>
								CONTACT
							</Typography>

							<div className="mt-3 flex flex-col gap-2">
								<Link
									to={"mailto:hello@earc.shop"}
									target="_blank"
								>
									<Typography variant="caption">hello@earc.shop</Typography>
								</Link>
								<Link
									to={`tel:01234567890`}
									target="_blank"
								>
									<Typography variant="caption">01234567890</Typography>
								</Link>
							</div>
						</Grid>
						<Grid
							item
							xs={5.7}
							md={5.3}
							lg={2}
						>
							<Typography
								variant="subtitle2"
								className="font-semibold uppercase"
							>
								DOWNLOAD OUR APP
							</Typography>

							<div className="mt-3 flex flex-row gap-2">
								<Button
									color="primary"
									className="p-0 min-w-[90px] max-w-[100px] flex-1"
								>
									<Avatar
										variant="square"
										src={"/assets/PlayStoreButton.svg"}
										alt="get it on playstore"
										// width="100%"
										className="w-full h-auto"
									/>
								</Button>
								<Button
									color="primary"
									className="p-0 min-w-[90px] max-w-[100px] flex-1"
								>
									<Badge.Ribbon
										text="New!"
										color="red"
										className="text-xs h-fit py-1 -top-2"
									>
										<Avatar
											variant="square"
											src={"/assets/AppStoreButton.svg"}
											alt="get it on playstore"
											// width="100%"
											className="w-full h-auto"
										/>
									</Badge.Ribbon>
								</Button>
							</div>
						</Grid>
					</Grid>
				</Container>
				<div className="bg-primary mt-10 py-10">
					<Typography
						variant="caption"
						className="text-center flex flex-row flex-wrap gap-3 items-center justify-center"
					>
						<span>
							<Link to="#">Privacy Policy</Link> |{" "}
							<Link to="#">Terms of Use</Link>
						</span>
						<span>Cookies and Interest - Based Ads</span>
						<span>Do not Sell My Info (Bangladesh)</span>
						<span>© {moment().format("yyyy")} e.Arc - All Rights Reserved</span>
					</Typography>
				</div>
			</AppBar>
		</footer>
	);
};

export default Footer;
