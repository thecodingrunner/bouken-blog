import Post from "@/models/post"
import { connectToDB } from "@/utils/database"

export const GET = async (request) => {
    try {
        await connectToDB()

        const posts = await Post.find({favourite: true}).populate('user').limit(10)

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 })
    }
}