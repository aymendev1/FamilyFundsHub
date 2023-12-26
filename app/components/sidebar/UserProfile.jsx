"use client";
import { useEffect } from "react";
import SidebarProfileLoader from "../loadings/SidebarProfileLoader";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
function UserProfile(props) {
  const { items, loading, error } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  const { toggle } = props;

  return loading ? (
    <SidebarProfileLoader />
  ) : (
    <div
      className={`flex gap-5 items-center 
         transition-all duration-300 delay-200
           bg-white rounded-xl p-2
           max-md:flex-col
      `}
    >
      {/*Profile Picture */}
      <div className="min-w-[4rem] h-[4rem]">
        <img
          src={
            items?.user?.profilePicture
              ? items.user.profilePicture
              : "/userProfileTest.jpg"
          }
          alt="Profile Picture"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      {/* Profile Name */}
      <div
        className={`${
          toggle ? "max-md:hidden" : " "
        }  flex flex-col delay-100 max-md:items-center`}
      >
        <span className="text-xl max-md:text-center font-black  text-blue-950 ">
          {items?.user?.name}
        </span>
        <span className="text-[0.75rem] text-slate-500">
          {" "}
          {items?.user?.email}
        </span>
      </div>
    </div>
  );
}

export default UserProfile;
