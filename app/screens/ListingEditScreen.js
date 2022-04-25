import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as Location from "expo-location";
import CategoryPickerItem from "../components/CategoryPickerItem";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingApi from "../api/listings";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please Select One Image"),
});

const categories = [
  {
    label: "Furniture",
    value: 1,
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
  },
  {
    label: "Clothing",
    value: 2,
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
  },
  { label: "Camera", value: 3, backgroundColor: "#fed330", icon: "camera" },
  { label: "Games", value: 4, backgroundColor: "#26de81", icon: "cards" },
  { label: "Sports", value: 5, backgroundColor: "#45aaf2", icon: "basketball" },
  { label: "Cars", value: 6, backgroundColor: "#fd9644", icon: "car" },
  {
    label: "Movies & Music",
    value: 7,
    backgroundColor: "#4b7bec",
    icon: "headphones",
  },
  {
    label: "Books",
    value: 8,
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
  },
  { label: "Other", value: 9, backgroundColor: "#778ca3", icon: "application" },
];

function ListingEditScreen() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [location, setLocation] = useState();

  // const getLocation = async () => {
  //   const { granted } = await Location.requestBackgroundPermissionsAsync();
  //   if (!granted) return;
  //   const {
  //     coords: { latitude, longitude },
  //   } = await Location.getLastKnownPositionAsync();
  //   setLocation({ longitude, latitude });
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  const handleSubmit = async (listing) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingApi.addListing({ ...listing }, (progress) =>
      setProgress(progress)
    );

    // if (!result.ok) return alert("could not save at the moment");
  };
  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          width={150}
          placeholder="Price"
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
