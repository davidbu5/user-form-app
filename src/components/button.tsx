import React from 'react';

export interface ButtonProps {
    text: string;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        return <button onClick={this.props.onButtonClick} disabled={this.props.isDisabled}>{this.props.text}</button>;
    }
}