import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: true,
    },
    allowedDevOrigins: ["10.1.82.6"],
};

export default nextConfig;
