import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  noContainer?: boolean;
}

function MainLayout({
  children,
  noContainer,
}: MainLayoutProps) {
  return (
    <div
      className="flex flex-col min-h-screen"
      data-testid="main-layout"
    >
      <Header />
      {noContainer ? children : (
        <div className="container mx-auto flex-1 py-10">
          {children}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MainLayout;
