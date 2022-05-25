import {Spinner} from "react-bootstrap";
import * as React from "react";

interface LoadingContentProps {
    isLoading: boolean;
    children: JSX.Element | JSX.Element[]
}
export const LoadingContent = ({isLoading, children}: LoadingContentProps)=> {
    return isLoading ? <Spinner className={'align-self-center '} animation={"grow"}></Spinner>:<>{children}</>
}