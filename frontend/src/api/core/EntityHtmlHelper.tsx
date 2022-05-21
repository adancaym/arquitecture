export interface TypeFieldText {
    type: 'text',
    key: string;
    label: string;
}
export interface TypeFieldTable<R> {
    type: 'table',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
}

export interface TypeFieldId {
    type: 'id',
    key: string;
    label: string;
}

export interface TypeFieldNumber {
    type: 'number',
    key: string;
    label: string;
}

export interface TypeFieldPassword<R> {
    type: 'password',
    key: string;
    label: string;
    reducer?: (e: R) => JSX.Element;
}

export interface TypeFieldReadOnlyInTable<R> {
    type: 'readOnlyInTable',
    key: string;
    label: string;
    reducer?: (e: R) => JSX.Element;
}

export interface TypeFieldCheckbox<R> {
    type: 'checkbox',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
}

export interface TypeFieldDate<R> {
    type: 'date',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
}

export interface TypeFieldDateReadOnly<R> {
    type: 'dateReadOnly',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
}

export interface TypeFieldSelect<R> {
    type: 'select',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
    options: () => Promise<Array<OptionsFieldEntityHtmlHelper>>;
}

export interface TypeFieldarraySelect<R> {
    type: 'arraySelect',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
    options: () => Promise<Array<OptionsFieldEntityHtmlHelper>>;
}

export interface TypeFieldIcon<R> {
    type: 'icon',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
    options: () => Promise<Array<OptionsFieldEntityHtmlHelper>>
}
export interface TypeFieldArrayString<R> {
    type: 'arrayString',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
    options: (e: Array<string>) => Array<OptionsFieldEntityHtmlHelper>
}

export interface OptionsFieldEntityHtmlHelper {
    value: string;
    name: string;
}

export type FieldEntityHtmlHelper<R> =
    TypeFieldText
    | TypeFieldId
    | TypeFieldNumber
    | TypeFieldPassword<R>
    | TypeFieldReadOnlyInTable<R>
    | TypeFieldCheckbox<R>
    | TypeFieldDate<R>
    | TypeFieldDateReadOnly<R>
    | TypeFieldSelect<R>
    | TypeFieldarraySelect<R>
    | TypeFieldIcon<R>
    | TypeFieldArrayString<R>
    | TypeFieldTable<R>

export class EntityHtmlHelper<R> {
    fields: Array<FieldEntityHtmlHelper<R>>;

    constructor(fields: Array<FieldEntityHtmlHelper<R>>) {
        this.fields = fields;
    }

}
