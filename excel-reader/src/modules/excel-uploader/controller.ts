import { ChangeEvent, useState } from "react";
import { IExcelUploaderCtrl } from "./interface";
import readExcelFile, { IExcel } from "../../shares/readExcelFIle";

export const useExcelUploaderController: IExcelUploaderCtrl = () => {
  const [excelData, setExcelData] = useState<IExcel[]>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const excelData = await readExcelFile(file);

        console.log(`[ log-debug] 🪲 ----------------------------------------------------------------------------------[ log-debug] 🪲`)
        console.log(`[ log-debug] 🪲 ~ file: controller.ts:14 ~ handleFileChange ~ excelData:`, excelData)
        console.log(`[ log-debug] 🪲 ----------------------------------------------------------------------------------[ log-debug] 🪲`)

        setExcelData(excelData);
        // Use the parsed Excel data in your application
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    handleFileChange,
    excelData
  };
}