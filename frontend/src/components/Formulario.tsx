import {useFormik} from "formik";
import {useEffect, useState} from "react";
import styled from "styled-components";

import {
    EntityHtmlHelper,
    OptionsFieldEntityHtmlHelper,
    TypeFieldarraySelect,
} from '../api/core/EntityHtmlHelper';
import {Input} from "./common/input/Input";

interface AutoFormProps<R, E> {
    initialValues: E;
    onSubmit: (data: E) => void;
    callBackSubmit?: () => void;
    validationSchema: any;
    table: EntityHtmlHelper<R>;
}

const FormStyle = styled.form`
  width: 100%;
  display: grid;
  gap: 1em;
`;
export const AutoForm = <R, E>(
    {
        table,
        initialValues,
        onSubmit,
        validationSchema,
        callBackSubmit,
    }: AutoFormProps<R, E>) => {

    const {getFieldProps, getFieldMeta, isValid, handleSubmit, setFieldValue, handleChange} =
        useFormik({
            initialValues,
            onSubmit: (values: E) => {
                onSubmit(values);
                if (callBackSubmit) callBackSubmit();
            },
            validationSchema,
        });
    const [arrayString, setarrayString] = useState<string | undefined>(undefined);

    return <FormStyle onSubmit={handleSubmit}>
        {table.fields.map((e) => {
            switch (e.type) {
                case "select": {
                    return (
                        <Input
                            className={'form-control'}
                            type={'select'}
                            key={`${e.key}-select`}
                            name={e.key}
                            label={e.label}
                            options={e.options()}
                            onChange={handleChange}
                            value={getFieldProps(e.key).value}
                            error={getFieldMeta(e.key).error}
                            isValid={!getFieldMeta(e.key).error}
                        ></Input>
                    );
                }
                case "arraySelect": {
                    const handleChange = (event: any) => {
                        const {checked, value} = event.target;
                        if (checked) {
                            setFieldValue(e.key, [...getFieldMeta(e.key).value, value]);
                        } else {
                            setFieldValue(
                                e.key,
                                getFieldMeta(e.key).value.filter((v: any) => v !== value)
                            );
                        }
                    };
                    return (
                        <ArraySelect<TypeFieldarraySelect<R>, R>
                            {...getFieldProps(e.key)}
                            key={`${e.key}-array-select`}
                            field={e}
                            handleChange={handleChange}
                            selected={getFieldMeta(e.key).value}
                        />
                    );
                }
                case "arrayString": {
                    const onChangeArrayString = (value: string) => {
                        setarrayString(value)
                    }
                    return <Input
                        className={'form-control'}
                        type={"arrayString"}
                        key={`${e.key}-input-array-string`}
                        name={e.key}
                        label={e.label}
                        options={Promise.resolve(e.options(getFieldProps(e.key).value))}
                        icon={'fa fa-plus'}
                        error={getFieldMeta(e.key).error}
                        isValid={!getFieldMeta(e.key).error}
                        callbackIcon={() => {
                            setFieldValue(e.key, [...getFieldProps(e.key).value, arrayString])
                            setarrayString('')
                        }}
                        onChange={(event: { target: { value: { toString: () => string; }; }; }) => {
                            onChangeArrayString(event.target.value.toString());
                        }}
                        removeItem={(value: string) => {
                            setFieldValue(e.key, getFieldProps(e.key).value.filter((e: string) => e !== value))
                        }}
                        value={arrayString}
                    />
                }
                case "id": {
                    return <div key={`${e.key}-id-not-see`}></div>
                }
                case "table": {
                    return <div key={`${e.key}-table-not-see`}></div>
                }
                case "checkbox": {
                    return <div className="form-check">
                        <input className="form-check-input"
                               style={{
                                   padding: '2px'
                               }}
                               onChange={handleChange}
                               name={e.key}
                               checked={!!getFieldMeta(e.key).value}
                               value={getFieldMeta(e.key).value}
                               type={e.type}
                               id={e.key}/>
                        <label className="form-check-label" htmlFor={e.key}>{e.label}</label>
                    </div>
                }
                case "dateReadOnly": {
                    return <div key={`${e.key}-dateReadOnly-not-see`}></div>
                }
                case "readOnlyInTable": {
                    return <div key={`${e.key}-readOnlyInTable-not-see`}></div>
                }
                case "icon": {
                    return <Input
                        className={'form-control'}
                        type={'select'}
                        key={`${e.key}-icon-select`}
                        name={e.key}
                        label={e.label}
                        options={e.options()}
                        onChange={handleChange}
                        value={getFieldProps(e.key).value}
                        error={getFieldMeta(e.key).error}
                        isValid={!getFieldMeta(e.key).error}
                    ></Input>
                }
                default: {
                    const {error} = getFieldMeta(e.key)
                    return (
                        <Input
                            className={'form-control'}
                            type={e.type}
                            key={`${e.key}-input`}
                            name={e.key}
                            label={e.label}
                            onChange={handleChange}
                            value={getFieldProps(e.key).value}
                            error={error}
                            isValid={!error}
                        />
                    );
                }
            }
        })}
        <div className="d-flex justify-content-end mt-5">
            <button disabled={!isValid} className={'btn btn-primary float-right btn-sm'} type="submit">Guardar</button>
        </div>
    </FormStyle>
};


interface ArraySelectProps<F> {
    field: F;
    handleChange: (e: any) => void;
    selected?: Array<string>;
}

const ArraySelect = <F extends TypeFieldarraySelect<R>, R>(
    {
        field,
        handleChange,
        selected = []
    }: ArraySelectProps<F>) => {

    const [options, setOptions] = useState<Array<OptionsFieldEntityHtmlHelper>>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (field.options && field.type === 'arraySelect') field.options().then(setOptions).finally(() => setLoading(false));
    }, [field]);

    return <ArraySelectContainer>
        <label htmlFor={field.key}>{field.label}</label>
        {loading ? (
            <Loading/>
        ) : (
            <>
                {options.map((option) => (
                    <CheckboxContainerRow key={option.value}>
                        <div className="form-check">
                            <input className="form-check-input" onChange={handleChange}
                                   checked={!!selected.find(e => e === option.value)}
                                   value={option.value} type="checkbox" id={option.value}/>
                            <label className="form-check-label" htmlFor={option.value}>{option.name}</label>
                        </div>
                    </CheckboxContainerRow>
                ))}
            </>
        )}
    </ArraySelectContainer>
};


const CheckboxContainerRow = styled.div`
  width: 100%;

  .form-check {
    width: 100%;
  }

  .form-check > label {
    width: 100%;
  }

  .form-check > .form-check-input {
    padding: 2px;
  }
`


const ArraySelectContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  justify-items: start;
`;


///__________________________________________________________________________________________________________________
const Loading = styled.div`
  justify-self: end;
  display: inline-block;

  &:after {
    content: " ";
    display: block;
    width: 10px;
    height: 10px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
