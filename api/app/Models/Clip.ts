import { Schema, model, Document } from 'mongoose'

interface ClipDocument extends Document {
  link: String
  username: String
  display_name: String
  channel: String
  status: String
}

const Clip = new Schema(
  {
    link: String,
    username: String,
    display_name: String,
    channel: String,
    status: String,
  },
  {
    timestamps: true,
    strict: true,
  }
)

export default model<ClipDocument>('clips', Clip)
