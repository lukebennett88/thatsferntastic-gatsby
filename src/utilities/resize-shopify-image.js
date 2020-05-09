export function resizeShopifyImage({ url, width }) {
  const index = url.indexOf('.jpg');
  if (index !== -1) {
    const firstChunk = url.slice(0, index);
    return firstChunk.concat(`_${width}x.jpg`);
  }
  return url;
}
