export function proxyAvatarUrl(avatar: string, memberId: string): string {
  if (!avatar.startsWith('http')) return avatar
  return `/api/avatar/${memberId}`
}

export function isImageSrc(src: string): boolean {
  return src.startsWith('/') || src.startsWith('http')
}
