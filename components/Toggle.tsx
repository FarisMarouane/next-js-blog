import Toggle from 'react-toggle';

import Image from 'next/image';

interface IToggleInputProps {
  onChange: () => void;
  checked: boolean;
}

const ToggleInput = ({ onChange, checked = false }: IToggleInputProps) => (
  <Toggle
    id="react-toggle"
    checked={checked}
    icons={{
      checked: (
        <Image
          src="/images/crescent.png"
          alt="cresent"
          width={16}
          height={16}
        />
      ),
      unchecked: (
        <Image src="/images/sun.png" alt="sun" width={16} height={16} />
      ),
    }}
    onChange={onChange}
  />
);

export default ToggleInput;
