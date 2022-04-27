import React from "react";

export const navigation = React.createRef();

const navigate = (name, params) => {
  navigation.current?.navigate(name, params);
};

export default {
  navigate,
};
