"use client";

import dynamic from "next/dynamic";

const PortfolioFlow = dynamic(() => import("../components/portfolio-flow"), {
  ssr: false,
});

const Page = () => <PortfolioFlow />;

export default Page;
