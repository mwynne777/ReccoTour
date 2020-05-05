import "../App.css";
import 'antd/dist/antd.css';
import "../components/RelatedArtists/RelatedArtistsPane.css";
import "../components/SelectedArtists/SelectedArtistsPane.css";
import { useTour } from "../hooks/useTour";
import { TourContext } from "../store/TourStore";

export default function MyApp({ Component, pageProps }) {
  const tour = useTour();

  return <TourContext.Provider value={tour}><Component {...pageProps} /></TourContext.Provider>
}