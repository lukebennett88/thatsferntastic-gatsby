function resizeShopifyImage({ url, width }) {
  let fileExtension = '.jpg';
  let index = url.indexOf('.jpg');
  if (index === -1) {
    index = url.indexOf('.png');
    fileExtension = '.png';
  }
  if (index !== -1) {
    const firstChunk = url.slice(0, index);
    return firstChunk.concat(`_${width}x${fileExtension}`);
  }
  return url;
}

export { resizeShopifyImage };
