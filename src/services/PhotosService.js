import getEntity from "@services/api/Get";

export async function getPhotos(productId) {
  try {
    const response0 = await getEntity("photos");
    let response = response0.filter(function (photo) {
      return photo.productId === productId;
    });
    return response;
  } catch (error) {
    throw error;
  }
}
