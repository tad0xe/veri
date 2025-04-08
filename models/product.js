const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    title: String,
    material: String,
    description: String,
    size: String,
    brand: String,
    tag: { type: Array },
    photos: { type: Array },
    time: { type: Date, default: Date.now },
    price: Number,

    availability: {
      type: Boolean,
      default: false,
    },
    stockQuantity: Number,
    rating: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    overallRating: { type: Number, default: 0 },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// ✅ Automatically trim string fields before saving
ProductSchema.pre("save", function (next) {
  const fieldsToTrim = ["title", "description", "brand", "material", "size"];
  for (let field of fieldsToTrim) {
    if (this[field] && typeof this[field] === "string") {
      this[field] = this[field].trim();
    }
  }
  next();
});

// Method to calculate average review rating
ProductSchema.methods.calculateOverallRating = async function () {
  const reviews = this.reviews;
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  } else {
    return 0;
  }
};

// ✅ Safe model export to prevent OverwriteModelError
module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);
