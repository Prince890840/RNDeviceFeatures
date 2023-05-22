import { View, StyleSheet, Alert, Image, Text } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constant/colors";
import OutlineButton from "../UI/OutlineButton";

const ImagePicker = ({ onTakeImage }) => {
  const [pickedImage, setpickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    // PermissionStatus.UNDETERMINED:- we don't  know yet that we have permission or not
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      // requestPermission():- async function, it opens a dialog and wait for user response
      // used for to get the permissions
      const permissionResponse = await requestPermission();

      //   true if permission is granted false otherwise
      return permissionResponse.granted;
    }

    /* maybe cameraPermissionInformation.status was undetermined,
     maybe we didn't have to ask for permission in this case promise returned by verifyPermission should also yield true or false,
      to tell us whether we have permission or not */

    //   we don't have permission
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    /* neither of the PermissionStatus.UNDETERMINED checks nor PermissionStatus.DENIED checks so, we do have the permission to use the camera,
     therfore return true. */
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],

      /*       modern device clicks the high resolutions pictures so, 
      image would be too large to store ,so we should restrict the quality of the image to being a large. */

      quality: 0.5,
    });

    if (!image.canceled) {
      setpickedImage(image?.assets[0]?.uri);
      onTakeImage(image?.assets[0]?.uri);
    }
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
