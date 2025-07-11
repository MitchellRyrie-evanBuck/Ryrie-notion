import { siteConfig } from './lib/site-config'

export default siteConfig({
  // 网站的根 Notion 页面（必需）
  rootNotionPageId: '14f8b35ba5da80e9967cd8aacbba6729',

  aboutPageId: '14e8b35ba5da8092a4c8fba105a199f5',

  // 如果你想将页面限制在单个 Notion 工作区中（可选）
  // （这应该是一个 Notion ID；查看文档了解如何提取）
  rootNotionSpaceId: '5fb26c11-110c-4298-be8b-94a73549c3f4', // 5fb26c11-110c-4298-be8b-94a73549c3f4

  // 基本网站信息（必需）
  name: 'Ryrie Lc',
  domain: 'ryrie.ink',
  // https://ryrie.ink/
  author: 'Mitchell Ryrie',

  // open graph 元数据（可选）
  description: 'Produce the best article output',

  // 社交媒体用户名（可选）
  twitter: 'RyrieLc',
  github: 'MitchellRyrie-evanBuck',
  linkedin: 'liuxiao_wen',
  // mastodon: '#', // 可选的 mastodon 个人资料 URL，提供链接验证
  // newsletter: '#', // 可选的通讯 URL
  youtube: '@xiaowenliu5603', // 可选的 youtube 频道名称或 `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // 网站范围内一致性的默认 notion 图标和封面图片（可选）
  // 页面特定的值将覆盖这些网站范围的默认值
  defaultPageIcon: 'https://ryrie.ink/ryrie.png',
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // 是否启用 LQIP 预览图片支持（可选）
  isPreviewImageSupportEnabled: true,

  // 是否启用 redis 用于缓存生成的预览图片（可选）
  // 注意：如果启用 redis，你需要设置 `REDIS_HOST` 和 `REDIS_PASSWORD`
  // 环境变量。查看 readme 获取更多信息
  isRedisEnabled: false,

  // Notion 页面 ID 到 URL 路径的映射（可选）
  // 这里定义的任何页面都将覆盖其默认 URL 路径
  // 示例：
  //
  pageUrlOverrides: null,
  // pageUrlOverrides: {
  //   '/about': '14e8b35ba5da8092a4c8fba105a199f5',
  //   '/web3': '4e5b00cd24a44fcc891aad6d5730be8c',
  //   '/notes': '1508b35ba5da802cbbdadff027583840',
  //   '/apple': '15a8b35ba5da8079bebccefe3f81b215'
  // },

  // pageUrlAdditions: {
    // '/the-social-audio-revolution': 'c4deaf33cc924ad7a5b9f69c6ae04a01'
  // },

  // 是否使用默认的 notion 导航样式或带有重要页面链接的自定义样式
  // 要使用 `navigationLinks`，请将 `navigationStyle` 设置为 `custom`
  // navigationStyle: 'default',
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Web3',
      pageId: '4e5b00cd24a44fcc891aad6d5730be8c'
    },
    {
      title: 'Notes',
      pageId: '1508b35ba5da802cbbdadff027583840'
    },
    {
      title: 'Apple',
      pageId: '15a8b35ba5da8079bebccefe3f81b215'
    },
    {
      title: 'About',
      pageId: '14e8b35ba5da8092a4c8fba105a199f5'
    },
  ]
})
