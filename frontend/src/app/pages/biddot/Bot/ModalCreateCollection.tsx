import {OptionsFieldEntityHtmlHelper} from "../../../../api/core/EntityHtmlHelper";
import {Modal} from "../../../../components/common/Modal";
import {TableAssetName} from "./TableAssetName";
import * as React from "react";
import {useState} from "react";
import {AutoForm} from "../../../../components/Formulario";
import {Collections} from "../../../../api/backend/Collections";
import {CollectionCreate, CollectionResponse} from "../../../../api/Types";

interface ModalAssetsProps {
    title: string;
    className?: string
    callback?: () => void
}

const collectionsController = new Collections();
export const ModalCreatecollection = ({
                                          title,
                                          className = 'btn btn-success btn-sm fa fa-plus', callback
                                      }: ModalAssetsProps) => {
    const [show, setShow] = useState<boolean>(false)
    return <Modal
        title={title}
        className={className}
        show={show}
        showToolbar={false}
        onAccept={() => setShow(false)}
        onCancel={() => setShow(false)}
        showModal={() => setShow(true)}
    >
        <AutoForm<CollectionResponse, CollectionCreate>
            initialValues={collectionsController.forms.initialValues}
            onSubmit={data => collectionsController.forms.onSubmit(data).finally(()=> {
                setShow(false)
                if (callback) callback();
            })}
            validationSchema={collectionsController.forms.validationSchema}
            table={collectionsController.table}/>
    </Modal>
}
