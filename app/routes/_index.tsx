import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  
  return (
    <div className="container">
      <div className="row">
        <div className="col">
            Debes ir a <Link to="vista/2/menu/4"> Vamos al template </Link>
        </div>
      </div>
    </div>
  );
}

