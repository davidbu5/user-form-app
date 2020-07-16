import React from 'react';
import { ObservableFormStore } from '../common/stores/FormStore';
import { observer } from 'mobx-react';
import { FormSection } from './FormSection';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';

export interface FormProps { store: ObservableFormStore, langStore: ObservedLanguageStore }

@observer
export class Form extends React.Component<FormProps> {

    componentDidMount() {
        setTimeout(() => {
            this.props.store.sections.pop();
            this.props.langStore.language = "he"
        }, 3000);
    }

    render() {
        return <div>{this.props.store.sections.map(section => <FormSection section={section} langStore={this.props.langStore} key={section.placeholderStringName} />)}</div>;
    }
}