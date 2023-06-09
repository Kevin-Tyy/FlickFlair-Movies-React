import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { TailSpin } from "react-loader-spinner";
import "./Pages.css";

function TVSeries() {
	const [series, setSeries] = useState([]);
	const [loading, setLoading] = useState(false);
	const API_KEY = "a96ad25cf6347c7de13c995a2c2f4c2d";

	useEffect(() => {
		axios.get(
			`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
		)
			.then((response) => {
				setSeries(response.data.results);
				setLoading(true);
				console.log(series);
			})
			.catch((error) => {
				console.log(error);
			});

		document.title = " Flick Flair | Series";
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	const posterUrl = "https://image.tmdb.org/t/p/original";

	return (
		<>
			{loading ? (
				<div className="pages">
					<h1 style={{ textAlign: "center" }}>
						Famous TV Series
					</h1>
					<div className="pages-container series">
						{series.map((serie) => (
							<div key={serie.id} className="movie-card">
								<div className="image-container">
									
									<img
										src={
											`${posterUrl}` +
											serie.poster_path
										}
									/>
								</div>
								<div className="description">
									<h2>{serie.name}</h2>
									<p style={{ lineHeight: 3 }}>
										<span>
											First Release Date :{" "}
										</span>
										{serie.first_air_date}
									</p>
									<span>
										Rating
									</span>
									<ReactStars
										count={serie.rating}
										size={20}
										isHalf={true}
										activeColor="orange"
										color="grey"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="spinner">
					<TailSpin
						height="80"
						width="80"
						color="#4000cb"
						ariaLabel="tail-spin-loading"
						radius="1"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
					/>
				</div>
			)}
		</>
	);
}

export default TVSeries;
