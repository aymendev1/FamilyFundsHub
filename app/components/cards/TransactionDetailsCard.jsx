import React from "react";
import Image from "next/image";
function TransactionDetailsCard() {
  const isTransfer = true;
  return (
    <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-2">
      <span className="text-xl  font-black  text-blue-950">
        Expense Details
      </span>
      <span className="text-md text-slate-600 border-b border-gray-900/10 pb-1.5">
        Reference #1
      </span>
      {/* Header of Card */}
      <div className="flex flex-row justify-between pt-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm  text-slate-700">Date Created</span>
          <span className="text-sm text-emerald-700 font-black bigText ">
            Sunday 04th November 2023
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm  text-slate-700">Status</span>
          <span className="text-sm text-emerald-700 font-black bigText ">
            Completed
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-10 pt-5">
        <Image
          src="/boyDefaultPP.jpg"
          width="120"
          height="120"
          alt="Profile Picture"
          className="rounded-lg"
        />
        <div className="grid grid-rows-2 grid-cols-3 max-lg:grid-cols-2 max-lg:grid-rows-3 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm  text-slate-700">
              {!isTransfer ? "Preformed by :" : "Sender :"}
            </span>
            <span className="text-sm text-slate-950 font-black bigText ">
              Aymen Azougar
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm  text-slate-700">Address </span>
            <span className="text-sm text-slate-950 font-black bigText ">
              Place No99, Waw, Poland
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm  text-slate-700">Date Executed </span>
            <span className="text-sm text-slate-950 font-black bigText ">
              Sunday 04th November 2022
            </span>
          </div>
          {isTransfer ? (
            <>
              {" "}
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Recipient :</span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  You Azougar
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Address </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  Waw, Poland
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Date Updated </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  Sunday 04th November 2022
                </span>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Category </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  Food
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Date Updated </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  Sunday 04th November 2022
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="pt-5">
        <table class="table-auto w-full">
          <thead>
            <tr className="text-slate-700 text-left pb-4">
              <th>Description</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-[50px]">
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className=" text-emerald-700 font-black bigText ">$ 50.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-slate-200 rounded-lg w-full p-4 self-end mt-5">
        <span className="text-sm  text-slate-700 font-black">
          Note : This transfer is only virtual and not yet supported in real
          life
        </span>
      </div>
    </div>
  );
}

export default TransactionDetailsCard;
