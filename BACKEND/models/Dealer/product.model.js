const productSchema = new mongoose.Schema({
  storeEmail: { type: String, required: true }, // Store email to link with registration
  products: [
    {
      name: String,
      category: String,
      price: Number,
      description: String,
      email: String,
      instock : Number,
      imageUrl: String,
    },
  ],
});

const Product = mongoose.model("Products", productSchema);

module.exports=productSchema.model;
