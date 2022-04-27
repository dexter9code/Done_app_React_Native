import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import { AppFormField, AppForm, SubmitButton } from "./forms";
import messageApi from "../api/message";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messageApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "could not send the message to the seller");
    }
    resetForm();
    const content = { title: "You are cool ", body: "message send to user" };

    Notifications.scheduleNotificationAsync({ content, trigger: null });
  };
  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Enter Message..."
      />
      <SubmitButton title="Contact Seller" />
    </AppForm>
  );
}

export default ContactSellerForm;
