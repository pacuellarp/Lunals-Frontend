import getEntity from "@services/api/Get";

export async function getAllProducts() {
  try {
    const response = await getEntity("products");
    return response;
  } catch (error) {
    console.log(error);
  }
}
