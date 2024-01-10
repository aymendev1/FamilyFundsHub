"use client";
import { useState, useEffect } from "react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export default function EditProfile() {
  const [newProfilePicture, setNewProfilePicture] = useState();
  const [newCoverPicture, setNewCoverPicture] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState("");
  const [FullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState("");

  const handleImageUpload = (e) => {
    setNewProfilePicture("");
    const data = new FileReader();
    data.addEventListener("load", () => {
      setNewProfilePicture(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };
  const handleCoverUpload = (e) => {
    setNewCoverPicture("");
    const data = new FileReader();
    data.addEventListener("load", () => {
      setNewCoverPicture(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };
  const fetchData = async () => {
    setLoading(true);
    await fetch(`/api/profile/`, { method: "GET" }).then(async (res) => {
      const data = await res.json();
      setNewCoverPicture(data?.coverPicture);
      setNewProfilePicture(data?.profilePicture);
      setUsername(data?.username);
      setBio(data?.bio);
      setFullName(data?.name);
      setAddress(data?.address);
      setEmail(data?.email);
      setLoading(false);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newCoverPicture: newCoverPicture,
        newProfilePicture: newProfilePicture,
        bio: bio,
        username: username,
        FullName: FullName,
        address: address,
        email: email,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success("Changes Saved successfully !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return setTimeout(
          () => window.location.replace(`/profile/${username}`),
          5000
        );
      } else {
        setLoading(false);
        const err = await res.json();
        toast.error(err.error, {
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
  useEffect(() => {
    fetchData();
  }, []);
  return Loading ? (
    <ComponentLoader />
  ) : (
    <>
      <div class="pb-5">
        <span class="text-3xl  font-black  text-blue-950 ">Edit Profile</span>
      </div>
      <form method="PUT" onSubmit={handleSubmit}>
        <div className=" flex flex-row max-md:flex-col gap-10 justify-between">
          <div className="p-4 bg-white rounded-lg w-full">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed to your family members.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {newProfilePicture ? (
                    <img
                      src={newProfilePicture}
                      className="object-cover h-20 w-20"
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}

                  <input
                    type="file"
                    accept=" image/jpeg"
                    onChange={handleImageUpload}
                    className="rounded-md bg-white  py-1.5  px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div
                  className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 ${
                    newCoverPicture ? "" : " px-2 py-5"
                  }`}
                >
                  {newCoverPicture ? (
                    <div className="relative w-full">
                      <img
                        src={newCoverPicture}
                        className=" h-[200px] w-full object-cover rounded-lg"
                        alt="New cover picture"
                      />
                      <button
                        onClick={() => setNewCoverPicture("")}
                        className="h-[30px] w-[30px] rounded-full top-2 right-2 absolute bg-slate-600 text-center flex items-center justify-center"
                      >
                        <FaTrashAlt className="w-[15px] h-[15px] text-slate-100 hover:text-red-700 " />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/jpeg"
                            onChange={handleCoverUpload}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        Only JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg w-full h-full">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5  px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="full-name"
                    value={FullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className=" mt-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  ⚠️ Please do not change your address email if you log in using
                  Google account, once you change your email address, you no
                  longer can access the app. In case you login using
                  Credentials, Please note that you will need to login using
                  your new email address .
                </span>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
