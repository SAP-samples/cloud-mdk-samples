function Uint8ArrayToBase64(uint8Array) {
  let binaryString = '';
  const CHUNK_SIZE = 0x8000; // 32768

  for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
    const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
    binaryString += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binaryString);
}

export default function BinaryToBase64(context, content) {
  let base64String = "";
  let platform = context.nativescript.platformModule;
  if (platform.isAndroid) {
    base64String = android.util.Base64.encodeToString(content, android.util.DEFAULT);
  } else if (platform.isIOS) {
    base64String = content.base64EncodedStringWithOptions(0);
  } else {  // Assume MDK Web
    base64String = Uint8ArrayToBase64(new Uint8Array(content));
  }
  return base64String;
}