import Searchbox from "./components/Searchbox";
import BlogCards from "./components/BlogCards";

const HomePage = () => {
  return (
    <div className="container mx-auto py-24">
      <Searchbox />
      <BlogCards />
    </div>
  );
};

export default HomePage;
