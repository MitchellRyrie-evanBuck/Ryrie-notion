import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取字体文件并转换为 base64
const playwriteFont = readFileSync(join(__dirname, '../public/fonts/PlaywriteUSTrad-VariableFont_wght.ttf'));
const alexBrushFont = readFileSync(join(__dirname, '../public/fonts/AlexBrush-Regular.ttf'));

// 生成 TypeScript 文件
const playwriteContent = `export default Buffer.from('${playwriteFont.toString('base64')}', 'base64')`;
const alexBrushContent = `export default Buffer.from('${alexBrushFont.toString('base64')}', 'base64')`;

// 写入文件
writeFileSync(join(__dirname, '../lib/fonts/playwrite.ts'), playwriteContent);
writeFileSync(join(__dirname, '../lib/fonts/alexbrush.ts'), alexBrushContent);

console.log('Font files generated successfully!');
