import { Permission, PermissionsAndroid, Platform } from "react-native";

import {
  PermissionName,
  PermissionService,
  PermissionStatus,
} from "../permissionTypes";

async function check(name: PermissionName): Promise<PermissionStatus> {
  const permission = mapNameToPermission(name);
  if (permission) {
    const isGranted = await PermissionsAndroid.check(permission);
    return isGranted ? "granted" : "denied";
  }

  return "unavailable";
}

async function request(name: PermissionName): Promise<PermissionStatus> {
  const permission = mapNameToPermission(name);
  if (permission) {
    const result = await PermissionsAndroid.request(permission);
    return result;
  }

  return "unavailable";
}

function mapNameToPermission(name: PermissionName): Permission | null {
  if (Platform.OS !== "android") {
    return null;
  }

  switch (name) {
    case "photoLibrary": {
      if (Platform.Version >= 33) {
        return "android.permission.READ_MEDIA_IMAGES";
      }

      return "android.permission.READ_EXTERNAL_STORAGE";
    }

    case "camera":
      return "android.permission.CAMERA";

    default:
      return null;
  }
}

export const permissionService: PermissionService = { check, request };
