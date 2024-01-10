"use client";
import SidebarProfileLoader from "../loadings/SidebarProfileLoader";
function UserProfile(props) {
  const { toggle, data } = props;

  return (
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
            data?.profilePicture ? data.profilePicture : "/userProfileTest.jpg"
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
          {data?.name}
        </span>
        <span className="text-[0.75rem] text-slate-500"> {data?.email}</span>
      </div>
    </div>
  );
}

export default UserProfile;
