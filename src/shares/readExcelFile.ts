import * as XLSX from 'xlsx';

export interface IExcel {
    sheetName: string,
    data: IExcelRecordData[]
}

export interface IExcelRecordData {
    orderNo: string
    column: string
    data: string
    isFormula: boolean
}

function readExcelFile(file: File): Promise<IExcel[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            const result: IExcel[] = workbook.SheetNames.reduce((accum: IExcel[], sheetName: string) => {
                const roa = workbook.Sheets[sheetName]
                if (roa) {
                    const records = Object.keys(roa)
                        .filter((key: string) => key[0] !== '!')
                        .map((key: string, i: number) => {
                            const rawData = roa[key]
                            const isFormula = rawData.f !== undefined
                            return {
                                orderNo: `${i + 1}`,
                                column: key,
                                data: `${isFormula ? rawData.f : rawData.v}`,
                                isFormula: isFormula,
                            }
                        })
                    accum.push({
                        sheetName: sheetName,
                        data: records
                    });
                }
                return accum;
            }, []);

            resolve(result);
        };

        reader.onerror = () => {
            reject(new Error('Error reading Excel file.'));
        };

        reader.readAsArrayBuffer(file);
    });
}

export default readExcelFile;