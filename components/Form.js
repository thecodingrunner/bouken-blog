"use client";

import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const storage = getStorage(app);

const Form = ({
  postContent,
  title,
  categories,
  filesLand,
  filesPort,
  setPostContent,
  setTitle,
  setCategories,
  setFilesLand,
  setFilesPort,
  handleSubmit,
  mediaLand,
  mediaPort,
  setMediaLand,
  setMediaPort,
  location,
  setLocation,
  favourite,
  setFavourite,
}) => {
  const [loadedLand, setLoadedLand] = useState(false);
  const [loadedPort, setLoadedPort] = useState(false);

  function updateCategories(value) {
    setCategories((prevCategories) => {
      if (prevCategories.includes(value)) {
        // If the value is already in the array, remove it
        return prevCategories.filter((category) => category !== value);
      } else {
        // If the value is not in the array, add it
        return [...prevCategories, value];
      }
    });
  }

  const handleQuillEdit = (value) => {
    setPostContent((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  useEffect(() => {
    const uploadPort = (file) => {
      const name = file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setLoadedPort(true);
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMediaPort((prevMedia) => {
              return [...prevMedia, downloadURL];
            });
          });
        }
      );
    };

    if (filesPort) {
      for (const file of filesPort) {
        uploadPort(file);
      }
    }
  }, [filesPort]);

  useEffect(() => {
    const uploadLand = (file) => {
      const name = file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setLoadedLand(true);
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMediaLand((prevMedia) => {
              return [...prevMedia, downloadURL];
            });
          });
        }
      );
    };

    if (filesLand) {
      for (const file of filesLand) {
        uploadLand(file);
      }
    }
  }, [filesLand]);

  return (
    <form
      className="w-1/3 flex flex-col gap-8 items-center justify-between"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        value={title}
        className="input"
        id="title"
        name="Title"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={location}
        className="input"
        id="location"
        name="Location"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="flex gap-4">
        <label for="favourite">Favourite</label>
        <input
          type="checkbox"
          id="favourite"
          name="favourite"
          onChange={() => setFavourite((prev) => !prev)}
        />
      </div>
      <label
        htmlFor="imageLand"
        className={`${
          loadedLand ? "bg-green-600" : ""
        } border border-black w-full h-auto flex items-center justify-center`}
      >
        <h2>Upload Landscape Images</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <input
          type="file"
          id="imageLand"
          multiple="multiple"
          onChange={(e) => setFilesLand(e.target.files)}
          hidden
        />
      </label>
      <div className="flex gap-6 flex-wrap">
        {mediaLand &&
          mediaLand.map((link) => (
            <div key={link} className="rounded-lg w-40 overflow-hidden">
              <img src={link} alt="" className="object-cover w-full" />
            </div>
          ))}
      </div>
      <label
        htmlFor="imagePort"
        className={`${
          loadedPort ? "bg-green-600" : ""
        } border border-black w-full h-auto flex items-center justify-center`}
      >
        <h2>Upload Portrait Images</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-10 rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <input
          type="file"
          id="imagePort"
          multiple="multiple"
          onChange={(e) => setFilesPort(e.target.files)}
          hidden
        />
      </label>
      <div className="flex gap-6 flex-wrap">
        {mediaPort &&
          mediaPort.map((link) => (
            <div key={link} className="rounded-lg h-40 overflow-hidden">
              <img src={link} alt="" className="object-conver h-full" />
            </div>
          ))}
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={categories.includes("Cycling")}
          id="cycling"
          name="cycling"
          value="Cycling"
          onChange={(e) => updateCategories(e.target.value)}
        />
        <label htmlFor="cycling"> Cycling</label>
        <input
          type="checkbox"
          checked={categories.includes("Language")}
          id="Language"
          name="Language"
          value="Language"
          onChange={(e) => updateCategories(e.target.value)}
        />
        <label htmlFor="Language"> Language</label>
        <input
          type="checkbox"
          checked={categories.includes("Lifestyle")}
          id="Lifestyle"
          name="Lifestyle"
          value="Lifestyle"
          onChange={(e) => updateCategories(e.target.value)}
        />
        <label htmlFor="Lifestyle"> Lifestyle</label>
        <input
          type="checkbox"
          checked={categories.includes("Tourism")}
          id="Tourism"
          name="Tourism"
          value="Tourism"
          onChange={(e) => updateCategories(e.target.value)}
        />
        <label htmlFor="Tourism"> Tourism</label>
        <input
          type="checkbox"
          checked={categories.includes("Thoughts")}
          id="Thoughts"
          name="Thoughts"
          value="Thoughts"
          onChange={(e) => updateCategories(e.target.value)}
        />
        <label htmlFor="Thoughts"> Thoughts</label>
      </div>
      <ReactQuill
        value={postContent.description}
        onChange={handleQuillEdit}
        theme="snow"
        className={`w-full h-auto`}
        placeholder={postContent}
      />
      <button type="submit" className="btn bg-black text-white">
        Submit
      </button>
    </form>
  );
};

export default Form;
