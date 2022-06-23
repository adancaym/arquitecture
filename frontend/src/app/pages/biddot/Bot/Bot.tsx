import { Input } from "../../../../components/common/input/Input";
import { Accordion, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Collections } from "../../../../api/backend/Collections";
import * as React from "react";
import { Assets } from "../../../../api/backend/Assets";
import { useEffect, useState } from "react";
import { OptionsFieldEntityHtmlHelper } from "../../../../api/core/EntityHtmlHelper";

import { Wallets } from "../../../../api/backend/Wallets";
import { LoadingContent } from "../../../../components/common/LoadingContent";
import { Bids } from "../../../../api/backend/Bids";
import { BidCreate, BidResponse } from '../../../../api/Types';
import { ModalCreatecollection } from "./ModalCreateCollection";
import { Navigate } from "react-router-dom";
import { SrcCollection } from "../../../../api/shvl/Collection";

interface FormBotProps {
    srcCollection: string | undefined;
    wallet: string | undefined;
    minimalBid: number | undefined;
    maximalBid: number | undefined;
    outbidAmount: number | undefined;
    expirationTime: number | undefined;
    rarityFrom: number | undefined;
    rarityTo: number | undefined;
    expectedSalesPrice: number | undefined;
    tokens: string | undefined;
    tokenFrom: number | undefined;
    tokenTo: number | undefined;
    traitTypes: string | undefined;
    traitValues: string | undefined;
}

const assetsController = new Assets();
const collectionController = new Collections();
const bidsController = new Bids();

export const Bot = () => {
    const [redirect, setRedirect] = useState(false);
    const [collectionOptions, setCollectionOptions] = useState<Array<SrcCollection>>([])
    const [currentCollection, setCurrentCollection] = useState<SrcCollection | undefined>(undefined)
    const [wallets, setWallets] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [traitTypes, setTraitTypes] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [traitValues, setTraitValues] = useState<Array<OptionsFieldEntityHtmlHelper>>([])

    const [tokenMin, setTokenMin] = useState<number>(0);
    const [tokenMax, setTokenMax] = useState<number>(0);

    const [assetSelected, setAssetSelected] = useState<Array<string>>([]);

    const [isLoading, setIsLoading] = useState(true);

    const onSubmit = (values: FormBotProps) => {
        if (values.expirationTime &&
            values.outbidAmount &&
            values.maximalBid &&
            values.minimalBid &&
            values.wallet) {
            bidsController.create<BidResponse, BidCreate>({
                expirationTime: values.expirationTime,
                outbidAmount: values.outbidAmount,
                maximalBid: values.maximalBid,
                minimalBid: values.minimalBid,
                wallet: values.wallet,
                assets: assetSelected,
                id: undefined
            }).then(() => {
                setRedirect(true);
            })
        }

    }
    const validationSchema = Yup.object().shape({
        srcCollection: Yup.string().required('Collection is required'),
        wallet: Yup.string().required('Wallet is required'),
        minimalBid: Yup.number().required(),
        maximalBid: Yup.number().required(),
        outbidAmount: Yup.number().required(),
        expirationTime: Yup.number().required(),
        rarityFrom: Yup.number(),
        rarityTo: Yup.number(),
        expectedSalesPrice: Yup.number(),
        tokens: Yup.string(),
        tokenFrom: Yup.number().min(tokenMin || 0).max(tokenMax || 0),
        tokenTo: Yup.number().min(tokenMin || 0).max(tokenMax || 0),
        traitTypes: Yup.string(),
        traitValues: Yup.string(),
    });

    const { handleChange, values, errors, handleSubmit, setFieldValue, isValid, isSubmitting } = useFormik<FormBotProps>({
        initialValues: {
            srcCollection: undefined,
            wallet: undefined,
            minimalBid: undefined,
            maximalBid: undefined,
            outbidAmount: undefined,
            expirationTime: undefined,
            rarityFrom: undefined,
            rarityTo: undefined,
            expectedSalesPrice: undefined,
            tokens: undefined,
            tokenFrom: undefined,
            tokenTo: undefined,
            traitTypes: undefined,
            traitValues: undefined,
        },
        onSubmit,
        validationSchema,
    })


    const fetchCollections = () => collectionController.list<SrcCollection>({ params: { fields: 'id, name, slug, status, totalAssetPopulated, traits, minToken, maxToken' } })
        .then(response => response.rows)
        .then(collections => collections.filter(
            collection => collection.status === 'populated' &&
                collection.totalAssetPopulated > 0 &&
                collection.minToken > 0 &&
                collection.maxToken > 0
        ))
        .then(collections => setCollectionOptions(collections))

    useEffect(() => {
        setIsLoading(true);
        fetchCollections().then(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        new Wallets().myWallets({ params: { fields: 'id,name' } })
            .then(({ rows }) => setWallets(rows.map(w => ({ value: w.id, name: w.name }))))
            .then(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        setTokenMax(currentCollection?.maxToken || 0);
        setTokenMin(currentCollection?.minToken || 0);
        setTraitTypes(currentCollection?.traits.map(value => ({
            value: value.key,
            name: value.key
        })) || [])
        setTraitValues([])
        setAssetSelected([])
    }, [currentCollection])






    const handleChangeCollection = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setFieldValue('srcCollection', value);
        setCurrentCollection(collectionOptions.find(c => c.id === value));
    }
    const handleChangeTraitType = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setFieldValue('traitTypes', value);
        const { values } = currentCollection!.traits.find(t => t.key === value) || { values: [] };
        setTraitValues(values?.map((value: string) => ({
            value: value,
            name: value,
        })));
    }
    const handleChangeTraitTypeValue = (e: React.ChangeEvent<any>) => {
        setFieldValue('traitValues', e.target.value)
        const { srcCollection, traitTypes, traitValues } = values
        if (srcCollection && traitTypes && traitValues) {
            setIsLoading(true);

            assetsController.findBySrcCollectionAndTraitValue(srcCollection, traitTypes, traitValues, { params: { fields: 'id,name' } })
                .then(({ rows }) => rows.map(a => a.id).forEach(appendAsset))
                .finally(() => setIsLoading(false))
        }
    };


    const findAssetsByRange = () => {
        const { srcCollection, tokenFrom, tokenTo } = values;
        if (srcCollection && tokenFrom && tokenTo) {
            setIsLoading(true);
            assetsController
                .findCollectionRangeTokenId(srcCollection, tokenFrom, tokenTo, { params: { fields: 'id, name' } })
                .then(({ rows }) => rows.map(a => a.id).forEach(appendAsset))
                .finally(() => setIsLoading(false))
        }
    }

    const appendAsset = (id: string) => {
        console.log('appendAsset', id)
        setAssetSelected(state => Array.from(new Set([...state, id])));
    }


    if (redirect) return <Navigate to='/apps/biddot/trade-history' />


    const FormHeader = () => <LoadingContent isLoading={isLoading}>
        <div className={'d-flex gap-5 justify-content-end m-5'}>
            {currentCollection && <span
                className={'btn btn-info btn-sm'}>
                NUMBER ASSETS OF COLLECTION: {currentCollection?.totalAssetPopulated}
            </span>}
            {assetSelected.length > 0 && <span className="btn btn-success  btn-sm">ASSETS SELECET: {assetSelected.length}</span>}
            {assetSelected.length > 0 && <button className="btn btn-warning btn-sm" onClick={() => setAssetSelected([])}> CLEAR SELECTION </button>}
            <ModalCreatecollection title={'Create collection'} callback={fetchCollections}
            />
        </div>
    </LoadingContent>

    return <Card>
        <Card.Body>
            <h3 className={'text-center'}>
                Biding collections
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <FormHeader />
                        <Input
                            label={'Collection'}
                            className={'form-control'}
                            type={'select'}
                            name={'srcCollection'}
                            options={Promise.resolve(collectionOptions.map(collection => ({
                                value: collection.id,
                                name: collection.name
                            })))}
                            onChange={handleChangeCollection}
                            value={values.srcCollection}
                            error={errors.srcCollection}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12">
                                <Input
                                    label={'Wallet'}
                                    className={'form-control'}
                                    type={'select'}
                                    name={'wallet'}
                                    options={Promise.resolve(wallets)}
                                    onChange={handleChange}
                                    value={values.wallet}
                                    error={errors.wallet}
                                />
                                <Input
                                    className={'form-control'}
                                    label={'Outbid by this amount'}
                                    type={'number'}
                                    name={'outbidAmount'}
                                    onChange={handleChange}
                                    value={values.outbidAmount}
                                    error={errors.outbidAmount}
                                />
                                <Input
                                    className={'form-control'}
                                    label={'Expiration time in hours'}
                                    type={'number'}
                                    name={'expirationTime'}
                                    onChange={handleChange}
                                    value={values.expirationTime}
                                    error={errors.expirationTime}
                                />
                                <Input
                                    className={'form-control'}
                                    label={'Minimal bid'}
                                    type={'number'}
                                    name={'minimalBid'}
                                    onChange={handleChange}
                                    value={values.minimalBid}
                                    error={errors.minimalBid}
                                />
                                <Input
                                    className={'form-control'}
                                    label={'Maximal bid'}
                                    type={'number'}
                                    name={'maximalBid'}
                                    onChange={handleChange}
                                    value={values.maximalBid}
                                    error={errors.maximalBid}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12 align-items-center align-content-center justify-content-center ">
                                <LoadingContent isLoading={isLoading}>
                                    <Accordion className={'mt-5 w-100'} defaultActiveKey="byToken" alwaysOpen>
                                        {currentCollection && currentCollection.minToken > 0 &&
                                            currentCollection.maxToken > 0 &&
                                            <Accordion.Item eventKey="byToken">
                                                <Accordion.Header>By Token</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <Input
                                                                className={'form-control'}
                                                                label={'Token from'}
                                                                type={'text'}
                                                                name={'tokenFrom'}
                                                                onChange={handleChange}
                                                                value={values.tokenFrom}
                                                                error={errors.tokenFrom}
                                                                note={tokenMin !== undefined ? `Min token_id ${tokenMin}` : ''}
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <Input
                                                                className={'form-control'}
                                                                label={'Token to'}
                                                                type={'text'}
                                                                name={'tokenTo'}
                                                                onChange={handleChange}
                                                                value={values.tokenTo}
                                                                error={errors.tokenTo}
                                                                note={tokenMax !== undefined ? `Max token_id ${tokenMax}` : ''}

                                                            />
                                                        </div>
                                                        <div className="col-12 d-flex justify-content-end">
                                                            <button type={'button'} onClick={findAssetsByRange}
                                                                className={'fa fa-search btn btn-info btn-sm mt-5'}>Search
                                                                assets
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>}
                                        {traitTypes.length > 0 && <Accordion.Item eventKey="byTraitTypes">
                                            <Accordion.Header>Trait types</Accordion.Header>
                                            <Accordion.Body>
                                                <div className="row">
                                                    <div className="row mt-5">
                                                        <div className="col-12 d-grid align-content-center ">
                                                            <Input
                                                                label={`Trait types: ${traitTypes.length}`}
                                                                className={'form-control'}
                                                                type={'select'}
                                                                name={'traitTypes'}
                                                                options={Promise.resolve(traitTypes)}
                                                                onChange={handleChangeTraitType}
                                                                value={values.traitTypes}
                                                                error={errors.traitTypes}
                                                            />
                                                            <Input
                                                                label={`Trait values: ${traitValues.length}`}
                                                                className={'form-control'}
                                                                type={'select'}
                                                                name={'traitValues'}
                                                                options={Promise.resolve(traitValues)}
                                                                onChange={handleChangeTraitTypeValue}
                                                                value={values.traitValues}
                                                                error={errors.traitValues}
                                                            />
                                                        </div>
                                                        <div className="col-12 d-flex justify-content-end">
                                                            <button type={'button'} onClick={handleChangeTraitTypeValue}
                                                                className={'fa fa-search btn btn-info btn-sm mt-5'}>Search
                                                                assets
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Accordion.Body>
                                        </Accordion.Item>}
                                    </Accordion>
                                </LoadingContent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end mt-5">
                        <LoadingContent isLoading={isSubmitting} >
                            <button
                                className={`btn btn-sm ${!isValid || assetSelected.length === 0 ? 'btn-danger' : 'btn-success'}`}
                                type={'submit'}
                                disabled={!isValid || isSubmitting || assetSelected.length === 0}
                            >
                                Place a bid
                            </button>
                        </LoadingContent>

                    </div>
                </div>
            </form>
        </Card.Body>
    </Card>
}
