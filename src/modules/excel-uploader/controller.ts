import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { IExcelUploaderCtrl } from "./interface";
import readExcelFile, { IExcel } from "../../shares/readExcelFile";

export const useExcelUploaderController: IExcelUploaderCtrl = () => {
  const [excelData, setExcelData] = useState<IExcel[]>([]);
  const [filterFormula, setFilterFormula] = useState(false);

  const displayExcelData = useMemo(() => {
    return excelData.map((sheet) => {
      const newSheet = { ...sheet };
      newSheet.data = sheet.data.filter((record) => {
        if (filterFormula) {
          return record.isFormula;
        }
        return true;
      });
      return newSheet;
    });
  }, [excelData, filterFormula]);

  const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const data = await readExcelFile(file);
      setExcelData(data);
    }
  }, [filterFormula]);

  const handleFilterChange = useCallback((e: any) => {
    setFilterFormula(e.target.checked);

    // setExcelData((prev) => {
    //   const newData = prev.map((sheet) => {
    //     const newSheet = { ...sheet };
    //     newSheet.data = sheet.data.filter((record) => {
    //       if (e.target.checked) {
    //         return record.isFormula;
    //       } else {
    //         return true;
    //       }
    //     });
    //     return newSheet;
    //   });
    //   return newData;
    // })
  }, []);

  return {
    handleFileChange,
    handleFilterChange,
    excelData: displayExcelData,
    filterFormula
  };
}