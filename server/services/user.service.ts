import { BreakTokensEntity, UserEntity } from "entities";
import { Logger, getBreakTokensRepository, getUserRepository } from "utils";

export const getUser = async (
  data: Partial<Pick<UserEntity, "email">>
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
    .createQueryBuilder("user")
    .select(["user.id", "user.email", "user.name"])
    .where(data)
    .getOne();
  Logger.log("User", user);
  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user = new UserEntity();
  user.name = name;
  user.email = email;
  user.password = password;
  await userRepository.save(user);
  Logger.log("User", user);
  return user;
};

export const getPassword = async (
  email: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
    .createQueryBuilder("user")
    .select(["user.password"])
    .where({ email })
    .getOne();
  return user;
};

export const resetPassword = async (
  email: string,
  password: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository.findOne({
    where: { email: email },
  });
  user.password = password;
  await userRepository.save(user);
  return user;
};

export const logout = async (token: string) => {
  const breakTokensRepository = await getBreakTokensRepository();
  const breakTokens = new BreakTokensEntity();
  breakTokens.token = token;
  await breakTokensRepository.save(breakTokens);

  return breakTokens;
};

export const getBreakTokens = async (token: string) => {
  const breakTokensRepository = await getBreakTokensRepository();
  const breakToken: BreakTokensEntity | null =
    await breakTokensRepository.findOne({
      where: { token: token },
    });
  return breakToken;
};
