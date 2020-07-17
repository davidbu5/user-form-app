import React from 'react';
import { ObservableFormStore } from '../common/stores/FormStore';
import { observer } from 'mobx-react';
import { FormSection } from './FormSection';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';

export interface FormProps { store: ObservableFormStore, langStore: ObservedLanguageStore }

@observer
export class Form extends React.Component<FormProps> {

    render() {
        return <div>{
            this.props.store ?
            this.props.store.sections.map(section => <FormSection section={section} langStore={this.props.langStore} key={section.placeholderStringName} />) :
            ""
            }</div>;
    }
}