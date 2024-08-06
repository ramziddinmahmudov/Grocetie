import { useLocation } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header";
import { useLayoutEffect } from "react";

const LayoutWrapper = (props: { children: React.ReactNode }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div style={{ minHeight: "50vh" }}>{props.children}</div>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
