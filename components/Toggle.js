import Toggle from 'react-toggle';

import Image from 'next/image';

const ToggleInput = ({ onChange, checked = 'false' }) => (
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
