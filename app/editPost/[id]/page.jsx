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
  const [post, setPost] = useState({
    title: "",
    location: "",
    date: "",
    favourite: false,
    categories: [],
    postContent: {description: ""},
    user: "",
    imgsLand: [],
    imgsPort: [],
  })

  const { data: session } = useSession();

  const router = useRouter();

  const postId = searchParams.params.id

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const fetchedPost = await response.json();


      console.log(post.imgsLand)

      setPost({
        title: fetchedPost.title,
        location: fetchedPost.location,
        date: fetchedPost.date,
        favourite: fetchedPost.favourite,
        categories: fetchedPost.categories,
        postContent: {description: fetchedPost.postContent.description},
        user: fetchedPost.user,
        imgsLand: fetchedPost.imgsLand,
        imgsPort: fetchedPost.imgsPort,
      })
    };

    if (postId) getPromptDetails();
  }, [postId]);

  async function editPost(e) {
    e.preventDefault();

    const toPost = {
      title: post.title,
      location: post.location,
      date: post.date,
      favourite: post.favourite,
      categories: post.categories,
      postContent: post.postContent.description,
      imgsLand: post.imgsLand,
      imgsPort: post.imgsPort,
      user: session?.user.id,
    };

    console.log(toPost);

    const response = await fetch(`/api/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toPost),
    });

    const result = await response.json();
    
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center pt-[15vh] pb-[5vh]">
      {session?.user ? (
        <Form
          post={post}
          setPost={setPost}
          handleSubmit={editPost}
        />
      ) : (
        <div>Please log in to create a post</div>
      )}
    </div>
  );
};

export default EditPost;
