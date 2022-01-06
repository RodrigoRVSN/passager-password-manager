// Third party dependencies
import styled from 'styled-components';

const Input = styled.input`
    border: none;
    border-radius: 5px;
    font-size: 16px;
    height: 25px;
    padding: 5px;
    width: 200px;

    &::placeholder {
        font-size: 16px;
    }
`;

const AtomToolbarInput = (props) => {
    return <Input {...props} />
}

AtomToolbarInput.displayName = 'AtomToolbarInput';

export default AtomToolbarInput;