import { define, DecoderType, exact, string } from "decoders";

export const tokenDecoder = string;
export type Token = DecoderType<typeof tokenDecoder>;

export const usernameDecoder = define<string>((blob, ok, err) => {
  if (typeof blob !== "string") {
    return err("Username must be type of string");
  }
  return blob.length >= 3 && blob.length <= 20
    ? ok(blob)
    : err("Username length must be >= 3 and <= 20");
});
export type Username = DecoderType<typeof usernameDecoder>;

export const userDecoder = exact({
  token: string,
  username: usernameDecoder,
});

export type User = DecoderType<typeof userDecoder>;
