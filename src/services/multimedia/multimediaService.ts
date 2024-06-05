import { ImageForUpload } from "./multimediaTypes";

function prepareImageForUpload(imageUri: string): ImageForUpload {
  // TODO: implement this;
  return {
    uri: imageUri,
    name: "name",
    type: "image/png",
  };
}

export const multimediaService = { prepareImageForUpload };
