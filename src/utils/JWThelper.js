import { SignJWT, jwtVerify } from "jose";

export async function createToken(id, email) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload = { email: email, id: id };
  const token = new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
    .sign(secret);

  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const decoded = await jwtVerify(token, secret);
  return decoded["payload"];
}

export async function getUser(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token, secret);
    const data = await fetch(
      `${process.env.BASE_URL}/api/user/profile/details`,
      {
        headers: { id: decoded?.payload?.id },
      }
    );
    const response = await data.json();
    return response?.data;
  } catch (err) {
    return null;
  }
}
