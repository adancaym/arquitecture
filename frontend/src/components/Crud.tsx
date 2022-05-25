import styled from "styled-components";

import {Controller} from "../api/core/Controller";
import {Table} from "./Table";
import {AutoForm} from "./Formulario";
import React, {useEffect, useState} from "react";
import {Modal} from "./common/Modal";

const Grid = styled.div`
  display: grid;
  gap: 1em;
  height: 100%;
  grid-template:
    "component-toolbar" 90px 
    "component-table" 1fr/
     1fr;
`;
const Toolbar = styled.div`
  display: grid;
  gap: 1em;
  grid-area: component-toolbar;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  border-radius: 16px;
  grid-auto-flow: column;
`;

export interface CrudProps<S extends Controller<R, E>, R extends { id: string }, E> {
    controller: S;
    children?: JSX.Element | JSX.Element[],
}

export const Crud = <S extends Controller<R, E>, R extends { id: string }, E>({
                                                                                  controller,
                                                                                  children
                                                                              }: CrudProps<S, R, E>) => {
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [rows, setRows] = useState<Array<R>>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState<string | undefined>(undefined)

    const fetchData = () => {
        return controller.list<R>().then((r) => {
            const totalPagesFetch = parseInt((1 + r.count / controller.pagination.limit).toString())
            setRows(r.rows);
            setTotal(r.count);
            setTotalPages(totalPagesFetch === 0 ? 1 : totalPagesFetch);
        });
    };

    useEffect(() => {
        fetchData();
    }, [showModalCreate]);

    return (
        <Grid>
            {error && <div className={'alert alert-info'}>{error}</div>}
            <Table<S, R, E> controller={controller} fetchData={fetchData} rows={rows} total={total}
                            totalPages={totalPages}/>
            <Toolbar>
                {controller.forms && <Modal
                    show={showModalCreate}
                    onCancel={() => setShowModalCreate(false)}
                    onAccept={() => setShowModalCreate(false)}
                    showModal={() => setShowModalCreate(true)}
                    title={"Crear"}
                    showToolbar={false}
                    className={'btn btn-sm btn-info fa fa-plus'}
                >
                    <AutoForm<R, E>
                        table={controller.table}
                        initialValues={controller.forms.initialValues}
                        onSubmit={data => controller.forms!.onSubmit(data)
                            .catch(e => setError(e.message))
                            .finally(async () => {
                                await fetchData()
                                setShowModalCreate(false)
                            })
                        }
                        validationSchema={controller.forms.validationSchema}
                        callBackSubmit={() => {
                        }}
                    />
                </Modal>}

                <>{children}</>
            </Toolbar>
        </Grid>
    );
};
