const Post = require("./post");

// Define sample trip data
const sampleTrip = {
  title: "Sample Trip",
  description: "This is a sample trip description.",
  maker: "John Doe",
  images: [
    "https://https://thumbs.dreamstime.com/z/sample-stamp-sample-stamp-sign-icon-editable-vector-illustration-isolated-white-background-123951468.jpg",
  ],
  date: new Date(),
};

// Create a new instance of the Post model with the sample trip data
/*
const createSampleTrip = async () => {
  try {
    const createdPost = await Post.create(sampleTrip);
    console.log("Sample trip created:", createdPost);
  } catch (error) {
    console.error("Error creating sample trip:", error);
  }
};
*/

// Call the function to create and store the sample trip
createSampleTrip();
