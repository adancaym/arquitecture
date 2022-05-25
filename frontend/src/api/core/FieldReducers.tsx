import styled from "styled-components";
import {useState} from "react";
import {Modal} from "../../components/common/Modal";

export interface ArrayObjectReducerProps<T> {
    array: Array<T>
}
export const ArrayObjectReducer = <T extends { name: string }>({array}: ArrayObjectReducerProps<T>) => {
    return array.length > 0 ? <SelectTable className={'form-control form-control-sm'}>{array.map(e => <option key={e.name} value={e.name}>{e.name}</option>)} </SelectTable> :
        <p>Sin elementos</p>
}
export interface DateReducerProps {
    date: Date
}
export const DateReducer = ({date}: DateReducerProps) =>{
    return <p>{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
}

interface ModalToTableProps {
    children: JSX.Element | JSX.Element[]
    name: string;
    size?: 'sm' | 'xl' | 'lg'
}
export const ModalToTable = ({children, name, size}: ModalToTableProps)  => {
    const [modal, setModal] = useState<boolean>(false);
    return <Modal
        show={modal}
        className={'btn btn-outline-default btn-sm'}
        size={size}
        title={name}
        showModal={() => setModal(true)}
        onCancel={()=> setModal(false)}
        onAccept={() => setModal(false)}
    >
        {children}
    </Modal>

}

export interface BooleanToHumanProps {
    bool: boolean;
}
export const BooleanToHuman = ({bool}: BooleanToHumanProps) => <span className={`badge ${bool? 'bg-success': 'bg-danger'}`}>{bool? 'Si': 'No'}</span>
const SelectTable = styled.select `
  width: 100%;
  
`
