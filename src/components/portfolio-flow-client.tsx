"use client";

import dynamic from "next/dynamic";

const PortfolioFlow = dynamic(() => import("./portfolio-flow"), {
  ssr: false,
});

const PortfolioFlowClient = () => <PortfolioFlow />;

export default PortfolioFlowClient;
