import Post from "@/models/post"
import { connectToDB } from "@/utils/database"

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const post = await Post.findById(params.id).populate('user')
        console.log(post)
        if (!post) return new Response("Post not found", { status: 404 })

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch post", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const post = await request.json()
    console.log(params)

    try {
        await connectToDB()

        let existingPost = await Post.findById(params.id)
        console.log(existingPost.postContent)
        if (!existingPost) return new Response("Post not found", { status: 404 })
        console.log(post.postContent.description)


        existingPost.title = post.title
        existingPost.categories = post.categories
        existingPost.postContent = post.postContent.description
        existingPost.imgsLand = post.imgsLand
        existingPost.imgsPort = post.imgsPort

        console.log(existingPost)

        await existingPost.save()

        console.log('test')

        return new Response(JSON.stringify(existingPost), { status: 200 })
    } catch (error) {
        return new Response("failed to update post", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        console.log(params.id)

        await Post.findByIdAndDelete(params.id)


        return new Response("Post deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("failed to delete post", { status: 500 })
    }
}