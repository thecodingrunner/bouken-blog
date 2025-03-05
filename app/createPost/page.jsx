"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("../../components/Form"), {
  ssr: false,
});


const page = () => {
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

  const router = useRouter()

  async function submitPost(e) {
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

    const response = await fetch("/api/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toPost),
    });

    const result = await response.json();
    
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center pt-[25vh] pb-[10vh]">
      {session?.user ? (
        <Form
          handleSubmit={submitPost}
          post={post}
          setPost={setPost}
        />
      ) : (
        <div>Please log in to create a post</div>
      )}
    </div>
  );
};

export default page;
