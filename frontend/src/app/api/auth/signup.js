"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function handlerSignUp(email, username, password) {
  try {
    const response = await axios.post("http://localhost:8080/user/sign-up", {
      email,
      username,
      password,
    });

    const { access_token, refresh_token } = response.data;

    const cookieStore = cookies();

    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60, // 15 минут
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    });

    return { message: "Success!", access_token, refresh_token };
  } catch (error) {
    throw error.response?.data?.message || "User already exists";
  }
}

export async function handlerSignIn(username, password) {
  try {
    const response = await axios.post("http://localhost:8080/user/sign-in", {
      username,
      password,
    });

    const { access_token, refresh_token } = response.data;

    const cookieStore = await cookies();

    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60, // 15 m
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 d
    });

    return { message: "Success!", access_token, refresh_token };
  } catch (error) {
    throw "Wrong username or password";
  }
}

export async function getCookies() {
  const cookieStore = cookies();

  return cookieStore.getAll().map((cookie) => ({
    name: cookie.name,
    value: cookie.value,
  }));
}
