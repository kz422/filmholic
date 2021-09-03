const API_KEY = "453487eb1f45dc7adae6655a7b5a63d3";

export default {
  fetchPopular: {
    title: 'Popular',
    url: `/movie/popular?api_key=${API_KEY}&language=en=US&page`
  },
  fetchTrending: {
    title: 'Trending',
    url: `/trending/all/week?api_key=${API_KEY}&language=en=US`
  },
  fetchTopRated: {
    title: 'TopRated',
    url: `/movie/top_rated?api_key=${API_KEY}&language=en=US`
  },
  fetchActionMovies: {
    title: 'Action',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`
  },
  fetchComedyMovies: {
    title: 'Comedy',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`
  },
  fetchHorrorMovies: {
    title: 'Horror',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`
  },
  fetchRomanceMovies: {
    title: 'Romance',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`
  },
  fetchMysteryMovies: {
    title: 'Mystery',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`
  },
  fetchSciFiMovies: {
    title: 'SF',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=878`
  },
  fetchWesternMovies: {
    title: 'Western',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=37`
  },
}