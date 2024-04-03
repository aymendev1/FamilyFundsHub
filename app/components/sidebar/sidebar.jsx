"use client";
import { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import SidebarData from "./sidebarData";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";

function sidebar(props) {
  const { data } = props;
  const [toggle, setToggle] = useState(true);
  const { items, loading, error } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div
      className={`${toggle ? "max-md:w-[5.8rem] " : "max-md:w-[10rem] "}
        max-xl:w-[20rem] 
        max-lg:w-[15rem] max-md:w-[10rem]
      flex flex-col justify-between bg-white h-[96%] rounded-3xl ml-6 p-4 border transition-all duration-500 border-solid border-white relative`}
    >
      <button
        className={`${
          toggle ? "left-[4.5rem] " : "left-[8.7rem] "
        } hidden max-md:flex absolute top-[40%]  transition-all duration-500  justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer`}
        onClick={handleToggle}
      >
        <BiChevronLeft
          className={`${
            toggle ? "rotate-180" : ""
          } text-3xl text-blue-950 transition-all duration-300 `}
        />
      </button>
      <UserProfile toggle={toggle} data={items?.user} />
      <SidebarData toggle={toggle} username={items?.user?.username} />
    </div>
  );
}

export default sidebar;
