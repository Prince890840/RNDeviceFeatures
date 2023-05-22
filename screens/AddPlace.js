import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  const createPlaceHnadler = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  };
  return <PlaceForm onCreatePlace={createPlaceHnadler} />;
};

export default AddPlace;
