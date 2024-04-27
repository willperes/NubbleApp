import { MutationOptions, useMutation } from "@infra";

import { userService } from "../userService";
import { User } from "../userTypes";

type GetByIdMutationParams = { userId: number };

export function useUserGetById(options: MutationOptions<User>) {
  function getByIdMutation({ userId }: GetByIdMutationParams) {
    return userService.getById(userId);
  }

  return useMutation<GetByIdMutationParams, User>(getByIdMutation, options);
}
