import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";



export default function TemplateBase() {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <h1>Template Base Component</h1>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};