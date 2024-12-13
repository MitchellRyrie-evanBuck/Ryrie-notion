/**
 * 删除字符串中的破折号并拼接
 * @param str 输入的字符串
 * @returns 处理后的字符串
 */
export function removeHyphenAndJoin(str: string): string {
    return str.split('-').join('');
}
