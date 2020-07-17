import React from 'react';
import { ObservableFormStore, ObservableFormSection } from '../common/stores/FormStore';
import { observer } from 'mobx-react';
import { FormSection } from './FormSection';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';
import { Button } from './Button';

export interface LanguageSwitchProps { langStore: ObservedLanguageStore }

@observer
export class LanguageSwitch extends React.Component<LanguageSwitchProps> {

    render() {
        return <div>
            <Button text="Switch to English" onButtonClick={()=>this.props.langStore.language = "en"}></Button>
            <Button text="החלף שפה לעברית" onButtonClick={()=>this.props.langStore.language = "he"}></Button>
        </div>;
    }
}