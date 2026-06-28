import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    suggestion: {
  type: String,
  default: "",
},

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Other",
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    location: {
      type: String,
      required: true,
    },
    image: {
  type: String,
  default: "",
},
upvotes: {
  type: Number,
  default: 0,
},

    status: {
      type: String,
      default: "Pending",
    },
  },
  
  {
    timestamps: true,
  }
  
);


export default mongoose.model("Issue", issueSchema);