import { Fragment, useMemo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "@douyinfe/semi-ui";
import { addData, deleteDataById, getAllData } from "../db/indexDB";

import AppHeader from "../common/AppHeader.jsx";
import AppPopup from "../common/AppPopup.jsx";

const datas = [
  {
    Project: "Ruby",
    Build: "P2",
    WFID: 1,
    RelNo: "REL1436",
    SN: "R2R3967M0B",
    Config: "P2PDFCA1-MVPN",
    TargetTestItem: "[DOE] RDG1m (Margin 500 drops)",
    AllocateToRelTime: "2023/7/3 17:01",
    Prediction: "",
    PredictionStartDate: "",
    PredictionCompleteDate: "",
    PredictionETC: "",
    Test1: "[DOE] RDG1m (Margin 500 drops)",
    Test1StartDate: "2024/1/6",
    Test1CompleteDate: "",
    Test1ETC: "",
    Test2: "",
    Test2StartDate: "",
    Test2CompleteDate: "",
    Test2ETC: "",
    Strife: "",
    StrifeStartDate: "",
    StrifeCompleteDate: "",
    StrifeETC: "",
    FAStatus: "",
    CurrentCP: "T0",
    NextCP: "Drop100",
    NextCPETC: "2024/1/9",
    CurrentStoragePlace: "跌落",
    UpdateDate: "2024/1/6 17:51",
    Remark: "",
  },
  {
    Project: "Ruby",
    Build: "P2",
    WFID: 1,
    RelNo: "REL1437",
    SN: "R2R3967M0C",
    Config: "P2PDFCA1-MVPN",
    TargetTestItem: "[DOE] RDG1m (Margin 500 drops)",
    AllocateToRelTime: "2023/7/3 17:01",
    Test1: "[DOE] RDG1m (Margin 500 drops)",
    Test1StartDate: "2024/1/6",
    CurrentCP: "T0",
    NextCP: "Drop100",
    NextCPETC: "2024/1/9",
    CurrentStoragePlace: "跌落",
    UpdateDate: "2024/1/6 17:51",
    Remark: "",
  },
  {
    Project: "Ruby",
    Build: "P2",
    WFID: 1,
    RelNo: "REL1438",
    SN: "R2R3967M0D",
    Config: "P2PDFCA1-MVPN",
    TargetTestItem: "[DOE] RDG1m (Margin 500 drops)",
    AllocateToRelTime: "2023/7/3 17:01",
    Test1: "[DOE] RDG1m (Margin 500 drops)",
    Test1StartDate: "2024/1/6",
    CurrentCP: "T0",
    NextCP: "Drop100",
    NextCPETC: "2024/1/9",
    CurrentStoragePlace: "跌落",
    UpdateDate: "2024/1/6 17:51",
    Remark: "",
  },
  {
    Project: "Ruby",
    Build: "P2",
    WFID: 1,
    RelNo: "REL1439",
    SN: "R2R3967M0E",
    Config: "P2PDFCA1-MVPN",
    TargetTestItem: "[DOE] RDG1m (Margin 500 drops)",
    AllocateToRelTime: "2023/7/3 17:01",
    Test1: "[DOE] RDG1m (Margin 500 drops)",
    Test1StartDate: "2024/1/6",
    CurrentCP: "T0",
    NextCP: "Drop100",
    NextCPETC: "2024/1/9",
    CurrentStoragePlace: "跌落",
    UpdateDate: "2024/1/6 17:51",
    Remark: "",
  },
];

function AppTableView({}) {
  const columns = [
    { title: "Project", dataIndex: "Project", width: 60, align: "center" },
    { title: "Build", dataIndex: "Build", align: "center" },
    { title: "WFID", dataIndex: "WFID", align: "center" },
    { title: "Rel No", dataIndex: "RelNo", align: "center" },
    { title: "SN", dataIndex: "SN", align: "center" },
    { title: "Config", dataIndex: "Config", align: "center" },
    { title: "Target Test Item", dataIndex: "TargetTestItem", width: 200, align: "center" },
    { title: "Allocate To Rel Time", dataIndex: "AllocateToRelTime", align: "center" },
    { title: "Prediction", dataIndex: "Prediction", align: "center" },
    { title: "Prediction Start Date", dataIndex: "PredictionStartDate", align: "center" },
    { title: "Prediction Complete Date", dataIndex: "PredictionCompleteDate", align: "center" },
    { title: "Prediction ETC", dataIndex: "PredictionETC", align: "center" },
    { title: "Test1", dataIndex: "Test1", width: 200, align: "center" },
    { title: "Test1 Start Date", dataIndex: "Test1StartDate", align: "center" },
    { title: "Test1 Complete Date", dataIndex: "Test1CompleteDate", align: "center" },
    { title: "Test1 ETC", dataIndex: "Test1ETC", align: "center" },
    { title: "Test2", dataIndex: "Test2", width: 200, align: "center" },
    { title: "Test2 Start Date", dataIndex: "Test2StartDate", align: "center" },
    { title: "Test2 Complete Date", dataIndex: "Test2CompleteDate", align: "center" },
    { title: "Test2 ETC", dataIndex: "Test2ETC", align: "center" },
    { title: "Strife", dataIndex: "Strife", width: 200, align: "center" },
    { title: "Strife Start Date", dataIndex: "StrifeStartDate", align: "center" },
    { title: "Strife Complete Date", dataIndex: "StrifeCompleteDate", align: "center" },
    { title: "Strife ETC", dataIndex: "StrifeETC", align: "center" },
    { title: "FA Status", dataIndex: "FAStatus", align: "center" },
    { title: "Current CP", dataIndex: "CurrentCP", align: "center" },
    { title: "Next CP", dataIndex: "NextCP", align: "center" },
    { title: "Next CP ETC", dataIndex: "NextCPETC", align: "center" },
    { title: "Current Storage Place", dataIndex: "CurrentStoragePlace", align: "center" },
    { title: "Update Date", dataIndex: "UpdateDate", align: "center" },
    { title: "Remark", dataIndex: "Remark", align: "center" },
    {
      title: "操作",
      dataIndex: "operate",
      width: 200,
      align: "center",
      render: (text, record, index) => {
        return (
          <div>
            <Button onClick={() => handleDeleteData(record)}>删除</Button>
          </div>
        );
      },
    },
  ];

  const params = useParams();
  const navigate = useNavigate();

  const [selectDatabase, setSelectDatabase] = useState(null); // 指定选择一个数据库
  const [data, setData] = useState([]); // 存储数据

  useEffect(() => {
    // 打开选定的数据库
    const openRequest = window.indexedDB.open(params.database, params.version);
    openRequest.onsuccess = async (event) => {
      const db = event.target.result;
      setSelectDatabase(db);
      const result = await getAllData(db, db.objectStoreNames[0]);
      setData([...result]);
    };
    openRequest.onerror = (event) => console.error("Error opening database:", event.target.error);
  }, []);

  /**
   *  @description 添加数据
   *  */
  const handleAddData = async () => {
    try {
      for (const dataItem of datas) {
        await addData(selectDatabase, selectDatabase.objectStoreNames[0], dataItem);
      }
      const updatedData = await getAllData(selectDatabase, selectDatabase.objectStoreNames[0]);
      setData([...updatedData]);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  /**
   * @description 删除数据
   *  */
  const handleDeleteData = async (idToDelete) => {
    try {
      // 假设你有一个函数 deleteData，用于删除数据
      // await deleteDataById(selectDatabase, selectDatabase.objectStoreNames[0], idToDelete);
      console.log("Data deleted:", idToDelete); // 更新组件状态
      // const remainingData = await getAllData(selectDatabase, selectDatabase.objectStoreNames[0]);
      // setData([...remainingData]);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // 打开弹窗
  const handleOpenPopup = () => {
    const popup = document.querySelector(".app-popup");
    const popupContainer = document.querySelector(".app-popup-container");

    popup.classList.toggle("active");
    popupContainer.classList.toggle("active");
    document.body.style.overflow = "hidden";
  };

  if (!localStorage.getItem("isWorkspace")) {
    return navigate("/");
  }
  return (
    <Fragment>
      <main className="app-tableview">
        {/* 使用头导航 */}
        <AppHeader></AppHeader>

        {/* 功能区 */}
        <section className="app-tableview-fun-area">
          <article className="">
            <Button type="primary" onClick={handleOpenPopup}>
              添加数据
            </Button>
            <Button type="primary" onClick={handleAddData}>
              add
            </Button>
          </article>
        </section>

        {/* 使用表格组件 */}
        <TableExcelComponent columns={columns} data={data}></TableExcelComponent>
      </main>

      {/* 使用弹窗 */}
      <AppPopup>
        <UploadExcelComponent></UploadExcelComponent>
      </AppPopup>
    </Fragment>
  );
}

function UploadExcelComponent({ columns, data }) {
  const handleFileDropOrDragoverOrDragleave = async (event) => {
    event.preventDefault();

    if (event.type === "drop") {
      const fileType = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      const file = event.dataTransfer.files[0];
      console.log(file);
    }
  };

  return (
    <label
      className="app-upload-excel-label"
      htmlFor="app-upload-excel"
      onDragOver={handleFileDropOrDragoverOrDragleave}
      onDragLeave={handleFileDropOrDragoverOrDragleave}
      onDrop={handleFileDropOrDragoverOrDragleave}>
      <p>点击或拖拽表格上传</p>
      <span>仅支持.xlsx、.xls类型</span>
      <input type="file" name="" id="app-upload-excel" />
    </label>
  );
}

function TableExcelComponent({ columns, data }) {
  const pagination = useMemo(() => ({ pageSize: 100 }), []);

  const handleRow = (record, index) => {
    // 给偶数行设置斑马纹
    if (index % 2 === 0) {
      return { style: { background: "var(--semi-color-fill-0)" } };
    } else {
      return {};
    }
  };

  const rowSelection = {
    getCheckboxProps: (record) => ({
      // disabled: record.RelNo === "REL1436", // Column configuration not to be checked
      name: record.name,
    }),
    onSelect: (record, selected) => {
      console.log(`select row: ${selected}`, record);
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
  };

  return (
    <Table
      className="app-table-content"
      rowKey="SN"
      columns={columns}
      dataSource={data}
      // rowSelection={rowSelection}
      pagination={pagination}
      bordered={true}
      onRow={handleRow}
      size="small"></Table>
  );
}

export default AppTableView;
