import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "../../utils/auth";
import users from "./users";
export async function POST(request) {
  const body = await request.json();

  const { username, password, rememberMe } = body;
  let user = users.find((user) => user.username === username);
  if (!user || user.password !== password) {
    return NextResponse.json(
      { failure: true, message: "Invalid credentials" },
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  const token = await new SignJWT({ id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3h")
    .sign(getJwtSecretKey());

  const response = NextResponse.json(
    { success: true, token },
    { status: 200, headers: { "content-type": "application/json" } }
  );

  let expirationDate;
  if (rememberMe) {
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    const currentDate = new Date();
    expirationDate = new Date(currentDate.getTime() + oneYearInSeconds * 1000);
  } else {
    expirationDate = undefined;
  }

  response.cookies.set({
    secure: true,
    httpOnly: true,
    expires: expirationDate,
    name: "token",
    value: token,
    path: "/",
  });

  return response;
}
