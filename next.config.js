import bundleAnalyzer from '@next/bundle-analyzer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withSentryConfig } from '@sentry/nextjs'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

// 基础 Next.js 配置
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 's3-us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'public.notion-static.com' },
      { protocol: 'https', hostname: 'childlike-diagnostic-c0e.notion.site' },
      { protocol: 'https', hostname: 'ryrie.ink' },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com'
      },
      { protocol: 'https', hostname: 'api.microlink.io' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'img.notionusercontent.com' },
      { protocol: 'https', hostname: 'img.notion.so' },
      { protocol: 'https', hostname: 'sqlite.org' },
      { protocol: 'https', hostname: 'static.ads-twitter.com' },
      { protocol: 'https', hostname: 'ryrie.ink' },
      { protocol: 'https', hostname: 'file.notion.so' },
      { protocol: 'https', hostname: 'notion-emojis.s3-us-west-2.amazonaws.com' }

    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false
  },

  webpack: (config, _context) => {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    config.resolve.alias.react = path.resolve(dirname, 'node_modules/react')
    config.resolve.alias['react-dom'] = path.resolve(
      dirname,
      'node_modules/react-dom'
    )

    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [fileURLToPath(import.meta.url)]
      }
    }
    return config
  },

  transpilePackages: ['react-tweet'],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ]
  }
}

// Sentry 配置
const sentryWebpackPluginOptions = {
  org: 'ry-re',
  project: 'ryrie-notion',
  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  hideSourceMaps: true,
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true
}

// 组合所有配置
const config = withBundleAnalyzer(nextConfig)

// 导出最终配置
export default withSentryConfig(config, sentryWebpackPluginOptions)
