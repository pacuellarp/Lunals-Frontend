import getEntity from "@services/api/Get";

export async function getProduct(productId) {
  try {
    const response0 = await getEntity("products");
    let response = response0.filter(function (product) {
      return product.id === productId;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
