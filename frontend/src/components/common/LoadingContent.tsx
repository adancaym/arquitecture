import { Spinner } from "react-bootstrap";
import * as React from "react";

interface LoadingContentProps {
    isLoading: boolean;
    children: JSX.Element | JSX.Element[]
}
export const LoadingContent = ({ isLoading, children }: LoadingContentProps) => {
    return isLoading ? <div className="w-100 d-flex justify-content-center">
        <Spinner animation={"grow"}></Spinner>
    </div> : <>{children}</>
}