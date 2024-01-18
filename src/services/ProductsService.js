import getEntity from "@services/api/Get";

export async function getProducts(categoryId) {
  try {
    const response0 = await getEntity("products");
    let response = response0.filter(function (product) {
      return product.categoryId === categoryId;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
