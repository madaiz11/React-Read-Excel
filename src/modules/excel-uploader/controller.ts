import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { IExcelUploaderCtrl } from "./interface";
import readExcelFile, { IExcel } from "../../shares/readExcelFile";
import exportExcelFile from "../../shares/exportExcelFile";

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
  }, []);

  const handleExportExcel = useCallback(() => {
    exportExcelFile(displayExcelData);
  }, [displayExcelData]);

  return {
    handleFileChange,
    handleFilterChange,
    handleExportExcel,
    excelData: displayExcelData,
    filterFormula
  };
}