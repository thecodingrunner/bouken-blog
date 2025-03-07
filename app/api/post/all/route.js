import Post from "@/models/post"
import { connectToDB } from "@/utils/database"

export const GET = async (request) => {
    try {
        await connectToDB()

        const posts = await Post.find().populate('user')

        console.log(posts)

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 })
    }
}