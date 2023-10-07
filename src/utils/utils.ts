import { ProfileCreateDTO, ProfileModifyDTO } from '../DTO/ProfileDTO';

export function removeSameObjectFromArray<T extends Object>(array: T[]) {
  const result: T[] = [];
  array.forEach((each) => {
    if (
      result.every(
        (value) => convertObjectToString(value) != convertObjectToString(each)
      )
    ) {
      result.push(each);
    }
  });
  return result;
}

export function convertObjectToString<T extends Object>(o: T) {
  return Object.entries(o).toString();
}

export const getCreateDTO = (data: any) => {
  const dto = new ProfileCreateDTO();
  Object.entries(data).forEach(([key, value]) => {
    dto[key] = value;
  });
  return dto;
};

export const getModifyDTO = (data: any) => {
  const dto = new ProfileModifyDTO();
  Object.entries(data).forEach(([key, value]) => {
    dto[key] = value;
  });
  return dto;
};
