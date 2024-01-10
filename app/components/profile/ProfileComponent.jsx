"use client";
import { useState, useEffect } from "react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
import {
  MdOutlineEmail,
  MdInfoOutline,
  MdOutlineLocationOn,
  MdAlternateEmail,
} from "react-icons/md";
function ProfileComponent(props) {
  const { username } = props;
  const [ProfileDetails, setProfileDetails] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");

  const [Loading, setLoading] = useState([]);
  const { items, loading, error } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const handleClickProfile = () => {
    window.location.replace("/profile/edit");
  };
  const fetchData = async () => {
    setLoading(true);
    await fetch(`/api/profile/${username}`, { method: "GET" }).then(
      async (res) => {
        const data = await res.json();
        setProfileDetails(data);

        setLoading(false);
      }
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  return Loading ? (
    <ComponentLoader />
  ) : (
    <>
      <div className="w-full flex flex-col gap-3 rounded-lg">
        {/* Cover Image */}
        <img
          src={ProfileDetails?.coverPicture || "/defaultCoverImage.jpg"}
          className="object-cover w-full h-[200px] overflow-hidden rounded-t-xl rou"
        />
        <div className="flex flex-row gap-5 relative">
          <div>
            <img
              src={ProfileDetails?.profilePicture || "/userProfileTest.jpg"}
              alt="Profile Picture"
              className="rounded-full object-cover h-[160px] w-[160px] max-lg:w-[130px] max-lg:h-[130px] absolute bottom-0 max-lg:bottom-10 left-[10px]"
            />
          </div>
          <div className="flex flex-col gap-3 w-full  pl-[160px] max-lg:pl-[0px] pr-4 max-lg:pr-2">
            {/* Profile Name */}
            <div className="flex flex-row justify-between items-center w-full max-lg:pl-[130px]">
              <div className="flex flex-col gap-2  ">
                <span className="text-2xl  font-black bigText text-blue-950 ">
                  {ProfileDetails?.name}
                </span>
                <span className="text-base max-lg:text-sm font-black text-slate-500">
                  Member in {ProfileDetails?.family?.familyName}
                </span>
              </div>
              {items?.user?.id === ProfileDetails?.id ? (
                <button
                  onClick={handleClickProfile}
                  className="bg-blue-950/80 hover:bg-blue-950 h-10 ease-out duration-500 transition-all rounded-lg p-3 text-slate-200 font-medium text-base max-lg:text-sm flex flex-row items-center  justify-center"
                >
                  Edit Profile
                </button>
              ) : (
                <></>
              )}
            </div>
            {/* Profile Details */}
            <div className="flex flex-row justify-between w-full gap-2 ">
              <div className="flex flex-row gap-2 max-lg:gap-1 items-center">
                <MdAlternateEmail className="min-w-[20px] h-[20px] text-blue-900 " />
                <span className="text-sm font-black text-blue-950">
                  {ProfileDetails?.username}
                </span>
              </div>
              <div className="flex flex-row gap-2 max-lg:gap-1 items-center">
                <MdInfoOutline className="min-w-[20px] h-[20px] text-blue-900 " />
                <span className="text-sm font-black text-blue-950">
                  {ProfileDetails?.bio || "No Bio yet !"}
                </span>
              </div>
              <div className="flex flex-row gap-2 max-lg:gap-1 items-center">
                <MdOutlineLocationOn className="min-w-[20px] h-[20px] text-blue-900 " />
                <span className="text-sm font-black text-blue-950">
                  {ProfileDetails?.address}
                </span>
              </div>
              <div className="flex flex-row gap-2 max-lg:gap-1 items-center">
                <MdOutlineEmail className="min-w-[20px] h-[20px] text-blue-900 " />
                <span className="text-sm font-black text-blue-950">
                  {ProfileDetails?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Family Members */}
        <div className="bg-white flex flex-col rounded-xl p-4 gap-7 mt-3">
          <span className="text-xl  font-black  text-blue-950">
            Family Members
          </span>
          <div className="flex flex-col  gap-3">
            {loading ? (
              <></>
            ) : (
              items?.familyMembers?.map((member, i) => {
                return (
                  <div key={i} className="flex flex-row gap-2 items-center">
                    <img
                      src={member.profilePicture || "/userProfileTest.jpg"}
                      alt={member.name}
                      className="h-[50px] w-[50px] object-cover rounded-lg"
                    />
                    <span className="text-base font-black text-blue-950">
                      {member.name}
                    </span>
                    <span className="text-right flex-1 text-base text-slate-500">
                      {member.role === 1 ? "Child" : "Parent"}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
