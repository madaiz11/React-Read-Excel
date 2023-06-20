import * as XLSX from 'xlsx';
import { IExcel } from './readExcelFile';

const exportExcelFile = (data: IExcel[]) => {
    const workbook = XLSX.utils.book_new();

    data.forEach((sheet: IExcel) => {
        const worksheet = XLSX.utils.json_to_sheet(sheet.data);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.sheetName);
    });

    XLSX.writeFile(workbook, 'exported_data.xlsx');
};

export default exportExcelFile;