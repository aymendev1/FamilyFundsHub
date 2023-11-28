import DataTable from "react-data-table-component";
import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
export default function LatestTransactionsTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const customStyles = {
    rows: {
      style: {
        minHeight: "70px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        height: "70px",
        backgroundColor: "white",
        fontSize: "1rem",
        fontFamily: "Noto Sans",
        fontWeight: "bold",
        color: "#172554",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  useEffect(() => {
    console.log("state", selectedRows);
  }, [selectedRows]);

  const handleButtonClick = () => {
    console.log("clicked");
  };

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = [
    {
      name: "Member",
      selector: (row) => (
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={row.ProfilePicture}
            width="40"
            height="40"
            className="rounded-lg object-cover"
          />
          <span className="font-black">{row.name}</span>
        </div>
      ),
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => "$ " + row.total,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      ProfilePicture: "/userProfileTest.jpg",
      name: "Aymen Azougar",
      description: "Testing Desc 1",
      total: "50",
      category: "Groceries",
      status: "Completed",
      date: "2022-10-20",
    },
    {
      id: 2,
      ProfilePicture: "/userProfileTest.jpg",
      name: "Aymen Azougar",
      description: "Testing Desc 1",
      total: "50",
      category: "Groceries",
      status: "Completed",
      date: "2022-10-20",
    },
    {
      id: 3,
      ProfilePicture: "/userProfileTest.jpg",
      name: "Aymen Azougar",
      description: "Testing Desc 1",
      total: "50",
      category: "Groceries",
      status: "Completed",
      date: "2022-10-20",
    },
    {
      id: 4,
      ProfilePicture: "/userProfileTest.jpg",
      name: "Aymen Azougar",
      description: "Testing Desc 1",
      total: "50",
      category: "Groceries",
      status: "Completed",
      date: "2022-10-20",
    },
    {
      id: 5,
      ProfilePicture: "/userProfileTest.jpg",
      name: "Aymen Azougar",
      description: "Testing Desc 1",
      total: "50",
      category: "Groceries",
      status: "Completed",
      date: "2022-10-20",
    },
    {
      id: 6,
      ProfilePicture: "/userProfileTest.jpg",
      name: "Aymen Azougar",
      description: "Testing Desc 1",
      total: "50",
      category: "Groceries",
      status: "Completed",
      date: "2022-10-20",
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      customStyles={customStyles}
      responsive
      pagination
    />
  );
}
