import Giscus from '@giscus/react';
import { useDarkMode } from '@/lib/use-dark-mode';

export default function Comment() {
  const { isDarkMode } = useDarkMode()


  return (
    <div className='mt-4 w-[720px]'>
      <Giscus
        repo="MitchellRyrie-evanBuck/Ryrie-notion"  // 替换为你的仓库信息
        repoId="R_kgDONXWXIA"     // 从 Giscus 配置中获取
        category="General"       // 创建的讨论分类
        categoryId="DIC_kwDONXWXIM4CnO-F"
        mapping="pathname"        // 映射方式（与 Giscus 配置一致）
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"      // 启用表情反应
        emitMetadata="0"
        theme={isDarkMode ? 'dark_dimmed' : 'light'}             // 主题（可动态切换）
        lang="zh-CN"              // 语言
        loading="lazy"
      />
    </div>
  );
}
