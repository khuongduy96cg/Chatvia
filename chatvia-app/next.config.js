
module.exports =  {
  env: {
    MONGODB_DB: 'mongodb+srv://admin:12345^@cluster0.pvojlsx.mongodb.net/?retryWrites=true&w=majority',
    JWT_SECRET: 'JWT_SECRET'
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
        port: '',
        pathname: '/s.cdpn.io/3364143/**',
      },
    ],
  },
}

