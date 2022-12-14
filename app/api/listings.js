import apiClient from "./client";

const endpoint = "/listings";

const getListings = () => apiClient.get(endpoint);

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("category", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return apiClient.post(endpoint, data, {
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};

export default {
  addListing,
  getListings,
};
