import  getEntity  from '@services/api/get';

export async function getCategories(genderId) {
  try {
    const response0 = await getEntity('categories');
    let response = response0.filter(function (category){
        return category.genderId===genderId;
    })
    return response;

  } catch (error) {
    throw error;
  }
}
