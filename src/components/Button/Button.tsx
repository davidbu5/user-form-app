import React from 'react';
import './Button.less';

export interface IButtonProps {
    text: string;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
}

export class Button extends React.Component<IButtonProps, {}> {
    render() {
        return <button onClick={this.props.onButtonClick} disabled={this.props.isDisabled}>{this.props.text}</button>;
    }
}