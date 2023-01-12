import Toggle from 'react-toggle';

import Image from 'next/image';

const ToggleInput = ({ onChange }) => (
  <Toggle
    icons={{
      checked: (
        <Image src="/crescent.png" alt="cresent" width={16} height={16} />
      ),
      unchecked: <Image src="/sun.png" alt="sun" width={16} height={16} />,
    }}
    defaultChecked={false}
    onChange={onChange}
  />
);

export default ToggleInput;
