import { useEffect, useState } from 'react'
import styled from 'styled-components/native'

export const HoneyPotInput = (props) => {



    const handleInputChange = (text) => props.setSomething(text)

    return (
        <Honey>
            <Input autoComplete='new-password' type={props.type} value={props.value} onChange={handleInputChange} />
        </Honey>
    )
}

const Honey = styled.View`
    position: absolute;
    top: -200%;
    left: -200%;
`
const Input = styled.TextInput`
    
`