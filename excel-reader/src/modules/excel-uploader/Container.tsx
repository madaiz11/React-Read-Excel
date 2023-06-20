import { FC } from "react";
import { Tabs, Table } from "antd";
import { useExcelUploaderController } from "./controller";
import { IExcel, IExcelRecordData } from "../../shares/readExcelFIle";
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
    // {
    //   title: "Is Formula",
    //   dataIndex: "isFormula",
    //   key: "isFormula",
    //   render: (isFormula: boolean) => (isFormula ? "Yes" : "No"),
    // },
  ];
}

const getRowClassName = (record: IExcelRecordData) => {
  return record.isFormula ? 'green-row' : '';
};

const Container: FC = () => {
  const { handleFileChange, excelData } = useExcelUploaderController();
  return (
    <div>
      <div>
        <h1>Upload Excel</h1>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>

      {excelData.length > 0 && (
        <div className="table-content">
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
