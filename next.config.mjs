/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "nadinsoft.com",
                pathname: "/**"
            }, {
                protocol: "https",
                hostname: "pexels.com",
                pathname: "/**"
            }, {
                protocol: "https",
                hostname: "unsplash.com",
                pathname: "/**"
            }, {
                protocol: "http",
                hostname: "unsplash.com",
                pathname: "/**"
            }, {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "/**"
            }, {
                protocol: "http",
                hostname: "avatars.githubusercontent.com",
                pathname: "/**"
            },
        ]
    }
};
export default nextConfig;
