import getEntity from "@services/api/Get";

export async function getCategories(genderId) {
  try {
    const response0 = await getEntity("categories");
    let response = response0.filter(function (category) {
      return category.genderId === genderId;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
