import React from 'react';
import { ObservableFormStore } from '../common/stores/FormStore';
import { observer } from 'mobx-react';
import { FormSection } from './FormSection';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';
import { Button } from './Button';

export interface FormProps { store: ObservableFormStore, langStore: ObservedLanguageStore }

@observer
export class Form extends React.Component<FormProps> {

    onSubmit = () => {
        console.log(this.props.store.isValid);
        console.log(this.props.store.getValues);
    }

    render() {
        return <div>{
            this.props.store ?
            this.props.store.sections.map(section => <FormSection section={section} langStore={this.props.langStore} key={section.placeholderStringName} />) :
            ""
            }
            <Button text={this.props.langStore.getString("submit")} onButtonClick={this.onSubmit}></Button>
            </div>;
    }
}