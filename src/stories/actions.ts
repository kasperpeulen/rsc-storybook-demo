"use server";

import { cookies } from "next/headers";
import { redirect } from "@storybook/experimental-nextjs-rsc/navigation.mock";
import { fn } from "storybook/test";

export const db = new Map();

export async function saveToDb(id: string, count: number) {
  db.set(id, count);
  console.log(`saving that ${id} has ${count} likes`);
}

export async function handleClick() {
  (await cookies()).set("user-id", "encrypted-id");
}

export async function invalidate(obj: { state: string }) {
  console.log(1);
  obj.state = "State is invalidated successfully.";
  redirect("/");
}

export const onLike = fn(async () => {}).mockName("onLike");
