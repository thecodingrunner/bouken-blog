"use client";

import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "@/utils/firebase";

const storage = getStorage(app);

const Form = ({
  handleSubmit,
  post,
  setPost,
}) => {
  const [loadedLand, setLoadedLand] = useState(false);
  const [loadedPort, setLoadedPort] = useState(false);

  const [filesLand, setFilesLand] = useState([]);
  const [filesPort, setFilesPort] = useState([]);

  function updateCategories(value) {
    setPost((prev) => {
        return {
          ...prev,
          categories: (prevCategories) => {
            if (prevCategories.includes(value)) {
              // If the value is already in the array, remove it
              return prevCategories.filter((category) => category !== value);
            } else {
              // If the value is not in the array, add it
              return [...prevCategories, value];
            }
          }
        }
      }
    )
  }

  const handleQuillEdit = (content) => {
    setPost((prev) => {
      return {
        ...prev,
        postContent: { description: content },
      };
    });
  };

  const deleteLand = (src) => {

    const confirmedLand = confirm('Do you want to delete this image?')

    if (confirmedLand) {
      // Create a reference to the file to delete
      const deleteRef = ref(storage, src);

      // Delete the file
      deleteObject(deleteRef).then(() => {
        console.log('deleted landscape image successfully')
        setPost((prev) => {
          return {
            ...prev,
            imgsLand: prev.imgsLand.filter(link => link != src)
          }
        })
        console.log(post.imgsLand)
      }).catch((error) => {
        console.log('unable to delete landscape image', error)
      });
    }

  }

  const deletePort = (src) => {

    const confirmedPort = confirm('Do you want to delete this image?')

    if (confirmedPort) {
      // Create a reference to the file to delete
      const deleteRef = ref(storage, src);

      // Delete the file
      deleteObject(deleteRef).then(() => {
        console.log('deleted portrait image successfully');
        setPost((prev) => {
          return {
            ...prev,
            imgsPort: prev.imgsPort.filter(link => link != src)
          }
        })
        console.log(post.imgsPort)
      }).catch((error) => {
        console.log('unable to delete portait image', error)
      });
    }

  }

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
            setPost((prev) => {
              return {
                ...prev,
                imgsPort: [...prev.imgsPort, downloadURL]
              }
            })
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
            setPost((prev) => {
              return {
                ...prev,
                imgsLand: [...prev.imgsLand, downloadURL]
              }
            })
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
      className="w-4/5 lg:w-3/5 flex flex-col gap-8 items-center justify-between text-lg bg-white py-16 shadow-xl rounded-3xl text-light-text"
      onSubmit={(e) => handleSubmit(e)}
    >

      <div className="w-4/5">
        <label htmlFor="title" className="font-semibold" >Title</label>
        <input
          type="text"
          value={post.title}
          className="input mt-4"
          id="title"
          name="Title"
          placeholder="Title..."
          onChange={(e) => setPost((prev) => {
            return {
              ...prev,
              title: e.target.value
            }
          })}
        />
      </div>

      <div className="w-4/5">
        <label htmlFor="location" className="font-semibold" >Location</label>
        <input
          type="text"
          value={post.location}
          className="input mt-4"
          id="location"
          name="Location"
          placeholder="Location"
          onChange={(e) => setPost((prev) => {
            return {
              ...prev,
              location: e.target.value
            }
          })}
        />
      </div>

      <div className="w-4/5">
        <label htmlFor="date" className="font-semibold">Date Written</label>
        <input 
          type="date" 
          value={post.date} 
          id="date" 
          onChange={(e) => setPost((prev) => {
            return {
              ...prev,
              date: e.target.value
            }
          })}
          className="input mt-4" 
        />
      </div>

      <div className="">
        <label htmlFor="favourite" className="font-semibold mr-4">Favourite</label>
        <input
          type="checkbox"
          id="favourite"
          name="favourite"
          checked={post.favourite}
          onChange={(e) => setPost((prev) => {
            return {
              ...prev,
              favourite: !prev.favourite
            }
          })}
        />
      </div>

      <div className="w-4/5">
        <label
          htmlFor="imageLand"
          className={`${
            loadedLand ? "green-shadow" : ""
          } input flex items-center justify-center gap-3`}
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
        <div className="flex gap-4 flex-wrap justify-center w-full  mt-8">
          {post.imgsLand &&
            post.imgsLand.map((link) => (
              <div key={link} className="rounded-lg w-40 overflow-hidden">
                <img src={link} alt="" className="object-cover h-full" onClick={(e) => deleteLand(e.target.src)}/>
              </div>
            ))}
        </div>
      </div>

      <div className="w-4/5">
        <label
          htmlFor="imagePort"
          className={`${
            loadedPort ? "green-shadow" : ""
          } input flex items-center justify-center gap-3`}
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
        <div className="flex gap-4 flex-wrap justify-center w-full mt-8">
          {post.imgsPort &&
            post.imgsPort.map((link) => (
              <div key={link} className="rounded-lg h-40 overflow-hidden">
                <img src={link} alt="" className="object-conver h-full" onClick={(e) => deletePort(e.target.src)}/>
              </div>
            ))}
        </div>
      </div>

      <div className="w-4/5">
        <h2 className="font-semibold">Categories</h2>
        <div className="flex gap-3 flex-wrap justify-between mt-4">

          <label htmlFor="cycling">
            <input
              type="checkbox"
              checked={post.categories.includes("Cycling")}
              id="cycling"
              name="cycling"
              value="Cycling"
              onChange={(e) => setPost((prev) => {
                return {
                  ...prev,
                  categories: [...prev.categories, e.target.value]
                }
              })}
              className="mr-2"
            />
            Cycling
          </label>

          <label htmlFor="Language"> 
            <input
              type="checkbox"
              checked={post.categories.includes("Language")}
              id="Language"
              name="Language"
              value="Language"
              onChange={(e) => setPost((prev) => {
                return {
                  ...prev,
                  categories: [...prev.categories, e.target.value]
                }
              })}
              className="mr-2"
            />
            Language
          </label>

          <label htmlFor="Lifestyle">
            <input
              type="checkbox"
              checked={post.categories.includes("Lifestyle")}
              id="Lifestyle"
              name="Lifestyle"
              value="Lifestyle"
              onChange={(e) => setPost((prev) => {
                return {
                  ...prev,
                  categories: [...prev.categories, e.target.value]
                }
              })}
              className="mr-2"
            />
            Lifestyle
          </label>

          <label htmlFor="Tourism">
            <input
              type="checkbox"
              checked={post.categories.includes("Tourism")}
              id="Tourism"
              name="Tourism"
              value="Tourism"
              onChange={(e) => setPost((prev) => {
                return {
                  ...prev,
                  categories: [...prev.categories, e.target.value]
                }
              })}
              className="mr-2"
            />
            Tourism
          </label>

          <label htmlFor="Thoughts">
            <input
              type="checkbox"
              checked={post.categories.includes("Thoughts")}
              id="Thoughts"
              name="Thoughts"
              value="Thoughts"
              onChange={(e) => setPost((prev) => {
                return {
                  ...prev,
                  categories: [...prev.categories, e.target.value]
                }
              })}
              className="mr-2"
            />
            Thoughts
          </label>
        </div>
      </div>

      <ReactQuill
        value={post.postContent.description}
        onChange={handleQuillEdit}
        theme="snow"
        className='w-4/5 h-auto'
        placeholder={post.postContent.description}
      />

      <button type="submit" className="btn bg-dark-background text-dark-text">
        Submit
      </button>
    </form>
  );
};

export default Form;
