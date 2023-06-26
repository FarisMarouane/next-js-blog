import Image from 'next/image';
import Toggle from 'react-toggle';

import './Toggle.css';

interface IToggleInputProps {
  onChange: () => void;
  checked: boolean;
}

const ToggleInput = ({ onChange, checked = false }: IToggleInputProps) => (
  <Toggle
    checked={checked}
    icons={{
      checked: (
        <Image src="/crescent.png" alt="cresent" width={16} height={16} />
      ),
      unchecked: <Image src="/sun.png" alt="sun" width={16} height={16} />,
    }}
    onChange={onChange}
  />
);

export default ToggleInput;
