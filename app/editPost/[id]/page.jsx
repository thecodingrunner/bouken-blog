"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import {
  getStorage,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("../../../components/Form"), {
  ssr: false,
});

const EditPost = (searchParams) => {
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [filesLand, setFilesLand] = useState([]);
  const [filesPort, setFilesPort] = useState([]);
  const [mediaLand, setMediaLand] = useState("");
  const [mediaPort, setMediaPort] = useState("");
  const [location, setLocation] = useState('');
  const [favourite, setFavourite] = useState(false);
  const [date, setDate] = useState('');

  const { data: session } = useSession();

  const router = useRouter();

  const postId = searchParams.params.id

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const post = await response.json();


      console.log(post.imgsLand)
      setPostContent({description: post.postContent})
      setTitle(post.title)
      setDate(post.date)
      setFavourite(post.favourite)
      setCategories(post.categories)
      setMediaLand(post.imgsLand)
      setMediaPort(post.imgsPort)
      setLocation(post.location)
      setFavourite(post.favourite)
    };

    if (postId) getPromptDetails();
  }, [postId]);

  async function editPost(e) {
    e.preventDefault();

    const post = {
      title,
      location,
      date,
      favourite,
      categories,
      postContent: postContent,
      user: session?.user.id,
      imgsLand: mediaLand,
      imgsPort: mediaPort,
    };

    console.log(post);

    const response = await fetch(`/api/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const result = await response.json();
    
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center pt-[15vh] pb-[5vh]">
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
          handleSubmit={editPost}
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

export default EditPost;
