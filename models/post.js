import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
        unique: true,
    },
    location: {
        type: String,
    },
    favourite: {
        type: Boolean,
        default: false,
    },
    categories: {
        type: Array,
    },
    postContent: {
        type: String, 
        required: [true, 'Content required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    imgsLand: {
        type: Array,
    },
    imgsPort: {
        type: Array,
    }
}, {timestamps: true})

const Post = models.Post || model('Post', PostSchema);

export default Post