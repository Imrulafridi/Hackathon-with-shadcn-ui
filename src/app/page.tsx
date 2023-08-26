import Hero from "../components/section/Hero";
import Products from "../components/section/Products";
import EventsBanner from "../components/section/Promotion";
import Newsletter from "../components/section/Newsletter";



export default function Home() {
  return (
    <>
      <Hero />
      <EventsBanner />
      <Products/>
      <Newsletter/>
    </>
  );
}
