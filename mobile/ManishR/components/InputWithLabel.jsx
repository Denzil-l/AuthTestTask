import { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
// import styles from './InputWithLabelStyles';

export const InputWithLabel = (props) => {
    //   const [labelStyle, setLabelStyle] = useState({});
    //   const [inputStyle, setInputStyle] = useState({});
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (!props.error) {
            //   setLabelStyle({});
            //   setInputStyle({});
            setErrorText('');
        } else if (props.error === 'emptyError') {
            //   setLabelStyle(styles.labelError);
            //   setInputStyle(styles.inputError);
            setErrorText(<Text> This field should be filled</Text>);
        } else {
            //   setLabelStyle(styles.labelError);
            //   setInputStyle(styles.inputError);
            setErrorText(<Text>{props.error}</Text>);
        }
    }, [props.error]);

    const handleInputChange = (text) => {
        if (props.regexp.test(text)) {
            props.setSomething(text);
        }
    };

    return (
        <Wrapper>
            <Label>{props.name}</Label>
            <Input
                style={{ width: props.width }}
                autoCompleteType="off"
                placeholder={props.placeholder}
                onChangeText={handleInputChange}
                value={props.value}
                textAlign='right'
            />
            <InputError>
                <Errorblock1><ErrorblockText>{errorText ? '*' : ''}</ErrorblockText></Errorblock1>
                <Errorblock2><ErrorblockText>{errorText}</ErrorblockText></Errorblock2>
            </InputError>
        </Wrapper>
    );
};


const Wrapper = styled.View`
    flex-direction: column;
    align-items:flex-end;
    width: 90%;

`
const Label = styled.Text`
    width: 100%;
    text-align: right;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`
const Input = styled.TextInput`
    width: 100%;
    height: 43px;
    text-align: right;
    border-bottom-color: black;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
`
const InputError = styled.View`
    width: 100%;
    margin-top: 6px;
    flex-direction: row-reverse;

`
const Errorblock1 = styled.View`
    width: 3%;
    height: 100%;
`
const Errorblock2 = styled.View`
     width: 97%;
    height: 100%;
`
const ErrorblockText = styled.Text`
text-align: right;
`