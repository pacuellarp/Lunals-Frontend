import getEntity from "@services/api/Get";

export async function getVideos(productId) {
  try {
    const response0 = await getEntity("videos");
    let response = response0.filter(function (video) {
      return video.productId === productId;
    });
    return response;
  } catch (error) {
    throw error;
  }
}
