import React from 'react';
import { observer } from 'mobx-react';
import { ObservableFormField } from '../common/stores/FormStore';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';

export interface FormFieldProps { field: ObservableFormField, langStore: ObservedLanguageStore }

@observer
export class FormField extends React.Component<FormFieldProps> {
    render() {
        return <h3>{this.props.langStore.getString(this.props.field.placeholderStringName)}</h3>;
    }
}