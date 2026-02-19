import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
     <div className="layout">
      <Sidebar />

      <div className="main">
        <Topbar />

        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>  
  );
}
