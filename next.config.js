/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cloudfront-us-east-1.images.arcpublishing.com",
      "s3.amazonaws.com",
      "author-service-images-prod-us-east-1.publishing.aws.arc.pub",
    ],
  },
};

module.exports = nextConfig;
