export default function ParseKey(key) {
  return key.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function (str) { return str.toUpperCase(); });
}