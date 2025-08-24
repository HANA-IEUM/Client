import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex justify-center">
      <main className="w-full max-w-md">
        <Outlet />
      </main>
    </div>
  );
}
