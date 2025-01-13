import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 max-w-[1100px] mx-auto w-full">
        <Header />
        <div className="">{children}</div>
      </div>
      <div className="max-w-[1100px] mx-auto w-full">
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
