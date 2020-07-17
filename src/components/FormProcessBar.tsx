import React from 'react';
import { observer } from 'mobx-react';
import { ObservableFormField } from '../common/stores/FormStore';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';

export interface FormProcessBarProps { field: ObservableFormField, langStore: ObservedLanguageStore }

@observer
export class FormProcessBar extends React.Component<FormProcessBarProps> {
    render() {
        return <h3>{this.props.langStore.getString(this.props.field.placeholderStringName)}</h3>;
    }
}