import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" flex flex-col min-h-screen">
        <div className="px-4 md:px-1 flex-1 max-w-[1100px] mx-auto w-full ">
          <Header />
          <div className="">{children}</div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto w-full flex items-end">
        <Footer />
      </div>
    </>
  );
};
export default Layout;
