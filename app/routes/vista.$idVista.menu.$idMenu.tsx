import type { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function templeteBasic() {
    const { idVista, idMenu } = useParams();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    Recibi este idVista : {idVista || "vacio"}
                </div>
                <div className="col">
                    Recivi este idMenu : {idMenu || "vacio"}
                </div>
            </div>
        </div>
    );
}
