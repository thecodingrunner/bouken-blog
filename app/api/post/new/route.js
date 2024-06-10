import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
    const post = await req.json()

    console.log(post)

    try {
        await connectToDB()
        const newPost = new Post(post)

        console.log(newPost)
        await newPost.save()

        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 })
    }
}