"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "../components/loading-screen";

const PortfolioFlow = dynamic(() => import("../components/portfolio-flow"), {
  ssr: false,
  loading: () => (
    <div className="relative h-screen w-screen bg-background">
      <LoadingScreen visible={true} />
    </div>
  ),
});

const Page = () => <PortfolioFlow />;

export default Page;
