import Sidebar from "../components/sidebar/sidebar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {

  return (
        <div className="flex flex-1">
          <Sidebar />
          <div className="bg-slate-100 min-h-sceen w-full ps-4 pe-4 py-2">
            {children}
          </div>
        </div>
  );
}
