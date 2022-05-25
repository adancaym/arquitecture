import {ReactNode, useState} from "react";
import {Button, Modal as ModalComponent} from "react-bootstrap";

interface ModalProps {
    title: string
    children: ReactNode | JSX.Element | JSX.Element[]
    onAccept: () => void
    showModal: () => void
    onCancel: () => void
    show: boolean
    showToolbar?: boolean;
    className?: string,
    buttonTrigger?: JSX.Element | JSX.Element[]
    size?: 'lg' | 'sm' | 'xl'
}

export const Modal = ({ onAccept, size,onCancel, children, title,showToolbar = true,className = '',buttonTrigger,show,showModal}: ModalProps) => {
    return <>
        {buttonTrigger ? <button type={'button'} className={className} onClick={showModal}> {buttonTrigger}</button> :
            <button type={'button'} className={className} onClick={showModal}> {title}</button>}
        <ModalComponent size={size} show={show} onHide={onCancel}>
            <ModalComponent.Header closeButton>
                <ModalComponent.Title>{title}</ModalComponent.Title>
            </ModalComponent.Header>
            <ModalComponent.Body>{children}</ModalComponent.Body>
            {showToolbar && <ModalComponent.Footer>
                <Button type={'button'} variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type={'button'} variant="primary" onClick={onAccept}>
                    Accept
                </Button>
            </ModalComponent.Footer>}
        </ModalComponent>
    </>
}