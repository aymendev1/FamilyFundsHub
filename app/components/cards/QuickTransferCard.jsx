"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SyncLoader } from "react-spinners";

export default function QuickTransferCard(props) {
  const { FamilyMembers, userBudget } = props;
  const [selectedUser, setSelectedUser] = useState("");
  const [AmountToSent, setAmountToSent] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageClick = (event, member) => {
    const image = event.target;
    if (!isSelected) {
      image.classList.add("opacity-75");
      setSelectedUser(member.id);
      setIsSelected(true);
    } else {
      if (selectedUser === member.id) {
        image.classList.remove("opacity-75");
        setSelectedUser("");
        setIsSelected(false);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (parseFloat(userBudget) < parseFloat(AmountToSent)) {
      setLoading(false);
      return toast.error(
        "Insufficient balance, Please Make sure you have enough balance to make this transfer !",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else if (!selectedUser || !AmountToSent) {
      setLoading(false);
      return toast.error("Please fill out all required fields.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    await fetch("/api/expenses/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedUser,
        amount: AmountToSent,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setLoading(false);
        setSelectedUser("");
        setAmountToSent(0);
        return toast.success("Transfer Made successfully !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setLoading(false);
        const error = await res.json();
        console.log(error);
        return toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  return (
    <div className=" bg-white rounded-lg relative font-[2rem] w-full h-[250px] p-4 flex flex-col gap-3 overflow-hidden max-xl:h-[200px] max-xl:gap-1 max-lg:w-full">
      <span className="text-xl  font-black  text-blue-950">Quick Transfer</span>
      {loading ? (
        <SyncLoader
          color="#172554"
          cssOverride={{
            alignItems: "center",
            alignSelf: "center",
            height: "100%",
          }}
        />
      ) : (
        <>
          <div className="flex flex-row gap-1 overflow-scroll overflow-y-hidden scroll-smooth quickTransferImages h-[50px]">
            {FamilyMembers?.map((member, index) => {
              return (
                <img
                  src={member.profilePicture || "/fatherDefaultPP.jpg"}
                  key={index}
                  alt="Profile Picture"
                  className="object-cover h-10 w-10  rounded-full cursor-pointer"
                  onClick={(e) => {
                    handleImageClick(e, member);
                  }}
                />
              );
            })}
          </div>
          <div className="flex flex-row gap-2 w-full justify-between">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-sm  text-slate-700">Amount to send</span>
              <input
                type="number"
                step="0.01"
                placeholder="$ 0.00"
                required
                onChange={(e) => setAmountToSent(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-100 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            className="bg-blue-950 hover:bg-blue-900 hover:delay-100 transition rounded-lg p-3 text-slate-200 font-medium text-base"
            onClick={handleSubmit}
          >
            Send Money
          </button>
        </>
      )}
    </div>
  );
}
