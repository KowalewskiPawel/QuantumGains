import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Hashing failed error: ${JSON.stringify(error)}`);
  }
};

export const comparePasswords = async (
  inputPassword: string,
  hashedPassword: string
) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error(`Comparison failed: ${JSON.stringify(error)}`);
  }
};
