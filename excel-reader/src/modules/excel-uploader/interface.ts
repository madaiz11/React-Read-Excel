import { ChangeEvent } from "react";
import { IExcel } from "../../shares/readExcelFIle";

export interface IExcelUploaderCtrlOutput {
    excelData: IExcel[];
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export type IExcelUploaderCtrl = () => IExcelUploaderCtrlOutput;