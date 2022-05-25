import React, {useState} from "react";
import styled from "styled-components";
import {Controller} from "../api/core/Controller";
import {FieldEntityHtmlHelper} from '../api/core/EntityHtmlHelper';
import {CrudProps} from "./Crud";
import {AutoForm} from "./Formulario";
import {Input} from "./common/input/Input";
import {Modal} from "./common/Modal";
import {Table as BTable} from 'react-bootstrap'

const GridTable = styled.div`
  grid-area: component-table;
  display: grid;
  grid-auto-flow: row;
  gap: 1em;
  border-radius: 16px;
`;


const TrStyle = styled.tr`

`;
const TheadStyle = styled.thead`

`;
const TbodyStyle = styled.tbody`

  &::-webkit-scrollbar {
    display: none;
  }
`;


interface RenderActionsProps<S extends Controller<R, E>, R extends { id: string }, E> extends CrudProps<S, R, E> {
    object: E,
    callBackUpdate: () => Promise<void>
    id: string;
}

const RenderActionsStyle = styled.div`
  display: grid;
  grid-auto-flow: column;
`
const RenderActions = <S extends Controller<R, E>, R extends { id: string }, E>(
    {
        controller,
        object,
        id,
        callBackUpdate
    }: RenderActionsProps<S, R, E>) => {

    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);


    return <div className={'btn-toolbar'}>
        <RenderActionsStyle className={'btn-group me-2 float-right'}>
            {controller.forms && <Modal
                title={"Actualizar"}
                show={showUpdate}
                onCancel={() => setShowUpdate(false)}
                showModal={() => setShowUpdate(true)}
                onAccept={() => setShowUpdate(false)}
                showToolbar={false}
                buttonTrigger={<i className={'fa fa-pen'}/>}
                className={'btn btn-info btn-sm'}
            >
                <AutoForm<R, E>
                    table={controller.table}
                    initialValues={object}
                    onSubmit={controller.forms.onSubmit}
                    validationSchema={controller.forms.validationSchema}
                    callBackSubmit={() => {
                        callBackUpdate();
                        setShowUpdate(false);
                    }}
                />
            </Modal>}


            <Modal title={"Eliminar"}
                   show={showDelete}
                   onCancel={() => setShowDelete(false)}
                   showModal={() => setShowDelete(true)}
                   buttonTrigger={<i className={'fa fa-trash'}/>}
                   className={'btn btn-danger btn-sm'}
                   onAccept={() => {
                       controller.delete(id)
                           .then(() => {
                               callBackUpdate();
                               setShowDelete(false);
                           })
                   }}
            >
                <h1>¿Deseas eliminar el registro?</h1>
            </Modal>
        </RenderActionsStyle>

    </div>
}

interface TableProps<S extends Controller<R, E>, R extends { id: string }, E> {
    controller: S;
    fetchData: () => Promise<void>
    rows: Array<R>
    total: number;
    totalPages: number
}

export const Table = <S extends Controller<R, E>, R extends { id: string }, E>(
    {
        controller,
        fetchData,
        rows,
        total,
        totalPages
    }: TableProps<S, R, E>) => {


    const searchKeyword = async (keyword: string) => {
        if (keyword !== "") {
            controller.pagination.q = keyword;
            controller.pagination.page = 1;
        } else {
            controller.pagination.q = undefined;
        }
        await fetchData();
    };
    const renderProp = (object: R, field: FieldEntityHtmlHelper<R>) => {

        const mapped = Object
            .entries(object)
            .map(([key, value]) => ({
                key,
                value
            }))
            .find((object) => object.key === field.key);

        if (
            field.type === 'checkbox' ||
            field.type === 'date' ||
            field.type === 'dateReadOnly' ||
            field.type === 'select' ||
            field.type === 'icon' ||
            field.type === 'arraySelect' ||
            field.type === 'arrayString' ||
            field.type === 'table' ||
            field.type === 'password' ||
            field.type === 'readOnlyInTable'
        ) {
            if (field.reducer) return field.reducer(object);
        }

        if (mapped) return mapped.value;
    };

    const page = async (value: number) => {
        controller.pagination.changePage(value)
        await fetchData();
    };

    if (!controller) return <>No hay controlador</>;
    if (!controller.table) return <>No hay tabla</>;
    if (!controller.table.fields) return <>No hay columnas</>;
    if (!rows) return <>No hay filas</>;
    return (
        <GridTable>
            <div>
                <Input
                    placeholder={"Search"}
                    className={'form-control'}
                    type="text"
                    onChange={({target}) => searchKeyword(target.value)}
                    icon={'fa fa-search'}
                    callbackIcon={() => fetchData()}
                />
            </div>
            <BTable bordered striped responsive style={{
                textAlign: "center"
            }}>
                <TheadStyle>
                    <TrStyle>
                        <th style={{width: "40px"}}>N</th>
                        {controller.table.fields.map((field, index) => (
                            <th key={`${field.key} ${index}`}>{field.label}</th>
                        ))}
                        <th>Acciones</th>
                    </TrStyle>
                </TheadStyle>
                <TbodyStyle>
                    {rows.length === 0 ? (
                        <TrStyle>
                            <td className={'text-center text-danger'} colSpan={controller.table.fields.length + 2}>Sin
                                datos
                            </td>
                        </TrStyle>
                    ) : rows.map((object, index) => (
                        <TrStyle key={index}>
                            <td style={{width: "40px"}}>{index + 1}</td>
                            {controller.table.fields.map((field, index) => (
                                <td key={`${field.key} row ${index}`}>
                                    {renderProp(object, field)}
                                </td>
                            ))}
                            <td>
                                <RenderActions<S, R, E>
                                    controller={controller}
                                    object={controller.convert(object)}
                                    id={object.id}
                                    callBackUpdate={() => fetchData()}
                                />
                            </td>
                        </TrStyle>
                    ))}
                </TbodyStyle>
            </BTable>
            <div className={'d-flex justify-content-center'}>
                <button
                    className={'btn btn-sm  fa fa-arrow-left '}
                    disabled={controller.pagination.page <= 1}
                    onClick={() => page(-1)}
                />
                <div className={'d-flex m-5'}>
                    <p className={'m-5'}>Total: {total}</p>
                    <p className={'m-5'}>
                        Página: {controller.pagination.page}
                    </p>
                    <p className={'m-5'}>
                        Total de páginas: {totalPages}
                    </p>
                </div>
                <button
                    className={'btn btn-sm fa fa-arrow-right'}
                    disabled={controller.pagination.page >= totalPages}
                    onClick={() => page(1)}
                />
            </div>
        </GridTable>
    );
};
