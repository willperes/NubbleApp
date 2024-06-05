import { CameraRoll } from "@react-native-camera-roll/camera-roll";

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

function prepareImageForUpload(imageUri: string): ImageForUpload {
  // TODO: implement this;
  return {
    uri: imageUri,
    name: "name",
    type: "image/png",
  };
}

export const multimediaService = { getPhotos, prepareImageForUpload };
