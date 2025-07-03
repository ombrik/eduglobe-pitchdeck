import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// Layout теперь всегда знает mode и demoRole!
export default function Layout({ mode, demoRole }) {
  return (
    <>
      <Header mode={mode} demoRole={demoRole} />
      <Outlet />
      <Footer />
    </>
  );
}
