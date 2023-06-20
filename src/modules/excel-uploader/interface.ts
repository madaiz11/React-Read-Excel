import { ChangeEvent } from "react";
import { IExcel } from "../../shares/readExcelFile";

export interface IExcelUploaderCtrlOutput {
    excelData: IExcel[];
    filterFormula: boolean;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleFilterChange: (e: any) => void;
}

export type IExcelUploaderCtrl = () => IExcelUploaderCtrlOutput;