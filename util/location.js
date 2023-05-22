import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyAE1u95bKdjZlHo48Yv434ixpZzz0t_uJI";

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
};

export async function getAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }
  const data = await response.json();
  const address = data?.display_name;
  return address;
}
