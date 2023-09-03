const ua = navigator.userAgent
export const browser = {
  platform: {
    ios: !!ua.match(/macintosh|mac os x/i)
  }
}
