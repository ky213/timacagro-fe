import { CreateProductInput, Product } from "src/data/types/generated";
import { read, utils } from "xlsx";

export type DataType = CreateProductInput;

export const readFile = (ab: ArrayBuffer) => {
  const wb = read(ab);

  /* generate array of data from the first worksheet */
  const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
  const data: DataType[] = utils.sheet_to_json<DataType>(ws); // generate objects

  /* update state */
  return data;
};
