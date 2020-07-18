import React from 'react';
import { observer } from 'mobx-react';
import { ObservedLanguageStore } from '../../common/stores/LanguageStore';
import { Button } from '../Button/Button';
import { ObservedModalStore } from '../../common/stores/ModalStore';

export interface IModalProps { langStore: ObservedLanguageStore, modalStore: ObservedModalStore }

@observer
export class Modal extends React.Component<IModalProps> {

    render() {
        return <div>
            <div>{this.props.langStore.getString(this.props.modalStore.modalTextStringName)}</div>
            <Button text={this.props.langStore.getString("close")} onButtonClick={()=>this.props.modalStore.close()}></Button>
        </div>;
    }
}