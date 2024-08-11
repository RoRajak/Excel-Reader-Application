"use client";
import HeroSection from "@/components/HeroSection";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { pinchblackIcon, pinchWhiteIcon } from "@/constants";

export default function Home() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const {resolvedTheme}=useTheme()

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (status === "authenticated" || token) {
        router.push("/");
        setLoading(false);
      } else if (status === "unauthenticated" && !token) {
        router.push("/signin");
      }
    };

    checkAuth();
  }, [status, router]);

  if (loading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4C38C2"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <main
      className={`grid grid-cols-1 ${
        isCollapse ? "sm:grid-cols-[10%_1%_89%]" : "sm:grid-cols-[20%_1%_80%]"
      }`}
    >
      <Sidebar
        isExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
        isCollapse={isCollapse}
        toggleCollapse={toggleCollapse}
      />
      <div className="custom-cursor dark:custom-cursor-dark relative left-[-2.5rem] z-50">
        {}
      </div>

      <HeroSection toggleSidebar={toggleSidebar} />
    </main>
  );
}
