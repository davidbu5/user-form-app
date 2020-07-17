import React from 'react';
import { ObservableFormStore, ObservableFormSection } from '../common/stores/FormStore';
import { observer } from 'mobx-react';
import { FormSection } from './FormSection';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';
import { Button } from './Button';
import { LanguageSwitch } from './LagnuageSwitch';

export interface FormProps { store: ObservableFormStore, langStore: ObservedLanguageStore }
export interface FormState { currSectionIndex: number }

@observer
export class Form extends React.Component<FormProps> {

    constructor(props: FormProps) {
        super(props);

        this.state = { currSectionIndex: 0 };
    }

    onNextSectionClicked = () => {

    }

    onPreviousSectionClicked = () => {

    }

    onSubmit = () => {

    }

    render() {
        return <div>{
            this.props.store ?
                this.props.store.sections.map(section => <FormSection section={section} langStore={this.props.langStore} key={section.placeholderStringName} />) :
                ""
        }
            <Button text={this.props.langStore.getString("submit")} onButtonClick={this.onSubmit}></Button>
            <LanguageSwitch langStore={this.props.langStore} />
        </div>;
    }
}