import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomePage from "@/features/Homepage";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}
