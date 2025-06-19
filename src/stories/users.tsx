import React, {type ReactNode, Suspense} from "react";
import { saveToDb } from "./actions";
import { Like } from "./like";

export async function Users() {
  const users: { id: string; name: string }[] = await fetch(
    "https://jsonplaceholder.typicode.com/users",
  ).then((response) => response.json());
  return (
    <div>
      <ul>
        {users.map((user) => (
          <ul key={user.id}>
            {user.name}
            <Like onLike={saveToDb.bind(null, user.id)} />
          </ul>
        ))}
      </ul>
    </div>
  );
}

export function Text({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}


export async function ServerComponent({ label }: { label: string}) {
 return (
   <div>
     <Text>All users {label}</Text>
     <Suspense fallback={"Rendering async server components on the client..."}>
       <Users />
     </Suspense>
   </div>
 )
}