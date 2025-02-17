"use client";

import { useSession } from "next-auth/react";
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
import { Carter_One } from "next/font/google";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("../../components/Form"), {
  ssr: false,
});


const page = () => {
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [filesLand, setFilesLand] = useState([]);
  const [filesPort, setFilesPort] = useState([]);
  const [mediaLand, setMediaLand] = useState("");
  const [mediaPort, setMediaPort] = useState("");
  const [location, setLocation] = useState('');
  const [favourite, setFavourite] = useState(false);
  const [date, setDate] = useState('')
  // const storage = getStorage(app);

  const { data: session } = useSession();

  const router = useRouter()

  async function submitPost(e) {
    e.preventDefault();

    const post = {
      title,
      location,
      date,
      favourite,
      categories,
      postContent: postContent.description,
      user: session?.user.id,
      imgsLand: mediaLand,
      imgsPort: mediaPort,
    };

    console.log(post);

    const response = await fetch("/api/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const result = await response.json();
    
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center pt-[25vh] pb-[10vh]">
      {session?.user ? (
        <Form
          postContent={postContent}
          title={title}
          categories={categories}
          filesLand={filesLand}
          filesPort={filesPort}
          setPostContent={setPostContent}
          setTitle={setTitle}
          setCategories={setCategories}
          setFilesLand={setFilesLand}
          setFilesPort={setFilesPort}
          handleSubmit={submitPost}
          mediaLand={mediaLand}
          setMediaLand={setMediaLand}
          mediaPort={mediaPort}
          setMediaPort={setMediaPort}
          location={location}
          setLocation={setLocation}
          favourite={favourite}
          setFavourite={setFavourite}
          date={date}
          setDate={setDate}
        />
      ) : (
        <div>Please log in to create a post</div>
      )}
    </div>
  );
};

export default page;
