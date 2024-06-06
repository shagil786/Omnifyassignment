import { Poppins } from "next/font/google";
import "@/styles/global.css";
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";
import { AppData, navProps } from "@/types/types";
import Loader from "@/components/Loader/Loader";
import { DeveloperDataProvider } from "@/utils/appContext";
import frameIcon from '@/public/images/Frame.svg';
import calendarIcon from '@/public/images/calendar-days.svg';
import hourglassIcon from '@/public/images/hourglass.svg';
import inboxIcon from '@/public/images/inbox.svg';

interface RootLayoutProps {
  children: React.ReactNode;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Hind Medical App",
  description: "Hind medical app for pharmacy and doctor consultation.",
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    const navList: Array<navProps> = [
        {name: "Orders", icon: inboxIcon, id: 0},
        {name: "Subscriptions", icon: frameIcon, id: 1},
        {name: "Calendar", icon: calendarIcon, id: 2},
        {name: "Waitlist", icon: hourglassIcon, id: 3},
    ]
  return (
    <html lang="en">
      <body
        className={`${poppins?.className} h-[100vh] w-full transition-all`}
      >
        <DeveloperDataProvider>
          <Suspense fallback={<Loader />}>
            <main className="flex h-full">
              <Navbar navList={navList}/>
              {children}
            </main>
          </Suspense>
        </DeveloperDataProvider>
      </body>
    </html>
  );
};

export default RootLayout;
