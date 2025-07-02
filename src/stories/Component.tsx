import { invalidate } from "./actions";
import React from "react";

const object = {
  state: "Bug! Not invalidated",
};

export async function Component() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div>
      <form action={invalidate.bind(null, object)}>
        <Sub />
        <button>Submit</button>
      </form>
    </div>
  );
}

export async function Sub() {
  console.log(10);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <div>{object.state}</div>;
}
