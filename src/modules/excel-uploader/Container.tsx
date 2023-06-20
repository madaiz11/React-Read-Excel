import { FC } from "react";
import { Tabs, Table, Checkbox, Button } from "antd";
import { useExcelUploaderController } from "./controller";
import { IExcel, IExcelRecordData } from "../../shares/readExcelFile";
const { TabPane } = Tabs;

function getColumns() {
  return [
    {
      title: "Order No",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Column",
      dataIndex: "column",
      key: "column",
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
  ];
}

const getRowClassName = (record: IExcelRecordData) => {
  return record.isFormula ? "green-row" : "";
};

const Container: FC = () => {
  const { handleFileChange, handleFilterChange, handleExportExcel, excelData, filterFormula } =
    useExcelUploaderController();
  return (
    <div>
      <div>
        <h1>Upload Excel</h1>
      </div>
      <div>
        <Checkbox checked={filterFormula} onChange={handleFilterChange}>
          Show only formula
        </Checkbox>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>

      {excelData.length > 0 && (
        <div className="table-content">
          <Button onClick={handleExportExcel}>Export Excel</Button>
          <Tabs>
            {excelData.map((sheet: IExcel) => (
              <TabPane tab={sheet.sheetName} key={sheet.sheetName}>
                <Table
                  dataSource={sheet.data}
                  columns={getColumns()}
                  bordered
                  pagination={{ pageSize: 10 }}
                  rowClassName={getRowClassName}
                />
              </TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Container;
