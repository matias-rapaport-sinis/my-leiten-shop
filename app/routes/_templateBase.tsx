import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";



export default function TemplateBase() {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col p-0">
                        <h1>Template Leiten shop</h1>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};