import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-5">
        {children}
      </main>
    </>
  );
};

export default MainLayout;