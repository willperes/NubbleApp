import { Platform } from "react-native";

import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

import { ImageForUpload, PhotoListPaginated } from "./multimediaTypes";

async function getPhotos(cursor?: string): Promise<PhotoListPaginated> {
  const photoPage = await CameraRoll.getPhotos({
    first: 12,
    after: cursor,
  });

  return {
    photoList: photoPage.edges.map(edge => edge.node.image.uri),
    cursor: photoPage.page_info.end_cursor,
    hasNextPage: photoPage.page_info.has_next_page,
  };
}

/**
 *
 * @param imageUri image path as provided by either the camera or gallery modules
 * @returns an imageUri ready to be used in the `Image` component and `FormData` requests
 */
function prepareImageUri(imageUri: string): string {
  if (Platform.OS !== "android") {
    return imageUri;
  }

  if (imageUri.startsWith("content://")) {
    return imageUri;
  }

  return `content://${imageUri}`;
}

/**
 *
 * @param imageUri image path
 * @returns `ImageForUpload` - an object with props requested by a `FormData`
 */
async function prepareImageForUpload(
  imageUri: string,
): Promise<ImageForUpload> {
  const preparedImageUri = prepareImageUri(imageUri);
  const image = await manipulateAsync(preparedImageUri, [], {
    compress: 0.5,
    format: SaveFormat.JPEG,
  });
  return {
    uri: image.uri,
    name: Date.now().toString(),
    type: "image/jpeg",
  };
}

export const multimediaService = {
  getPhotos,
  prepareImageUri,
  prepareImageForUpload,
};
