import React from 'react';
import { ObservableFormStore, ObservableFormSection } from '../common/stores/FormStore';
import { observer } from 'mobx-react';
import { FormSection } from './FormSection';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';
import { Button } from './Button';
import { LanguageSwitch } from './LagnuageSwitch';

export interface IFormProps { store: ObservableFormStore, langStore: ObservedLanguageStore }
export interface IFormState { currSectionIndex: number }

@observer
export class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);

        this.state = { currSectionIndex: 0 };
    }

    getCurrSectionComponent = () => {
        if (this.props.store && this.props.store.sections && this.props.store.sections.length > 0) {
            const currSection = this.props.store.sections[this.state.currSectionIndex];
            return <FormSection section={currSection} langStore={this.props.langStore} key={currSection.placeholderStringName} />;
        } else {
            return ""
        }
    }

    onContinueToNextSection = () => {
        const newSectionIndex = this.state.currSectionIndex + 1;
        this.setState({currSectionIndex: newSectionIndex})
    }

    onReturnToPrevSection = () => {
        const newSectionIndex = this.state.currSectionIndex - 1;
        this.setState({currSectionIndex: newSectionIndex})
    }

    onSubmit = () => {

    }

    render() {
        if (!this.props.store || !this.props.store.sections || !this.props.store.sections.length) {
            return <div>{this.props.langStore.getString("loadingForm")}</div>
        }
        return <div>
            {this.getCurrSectionComponent()}
            {
                this.state.currSectionIndex > 0 ?
                    <Button text={this.props.langStore.getString("back")} onButtonClick={this.onReturnToPrevSection}></Button> :
                    ""
            }
            {
                this.state.currSectionIndex < this.props.store.sections.length - 1 ?
                    <Button text={this.props.langStore.getString("next")} onButtonClick={this.onContinueToNextSection}></Button> :
                    ""
            }
            {
                this.state.currSectionIndex === this.props.store.sections.length - 1 ?
                    <Button text={this.props.langStore.getString("submit")} onButtonClick={this.onSubmit}></Button> :
                    ""
            }
            <LanguageSwitch langStore={this.props.langStore} />
        </div>;
    }
}