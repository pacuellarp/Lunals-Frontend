import getEntity from "@services/api/Get";

export async function getGenders() {
  try {
    const response = await getEntity("genders");
    return response;
  } catch (error) {
    console.log(error);
  }
}
