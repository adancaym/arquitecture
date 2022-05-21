import {Modal} from "../../../../components/common/Modal";
import {useTranslation} from "../../../../_metronic/i18n/i18nProvider";
import {useState} from "react";


export const ManageBids = () => {
    const [show, setShow] = useState(false);
    const title = useTranslation('MANAGE-BID.TITLE', 'Manage Bids');
    return <Modal
        show={show}
        onCancel={() => setShow(false)}
        showModal={() => setShow(true)}
        onAccept={() => setShow(false)}
        className={'btn btn-sm'}
        title={title}
        showToolbar={false}
    >
        <h3>{title}</h3>
    </Modal>
}