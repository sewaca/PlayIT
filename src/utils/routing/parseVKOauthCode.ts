export function parseVKOauthCode() {
  return window.location.href
    .split("access_token=")[1]
    ?.split("&")[0]
    ?.split("?")[0] || null;
}
