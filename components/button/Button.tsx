import React, { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value?: string;
  className?: string;
  selected?: boolean;
}

const Button = ({
  value,
  onClick,
  className,
  selected,
  children,
}: IButtonProps) => {
  return (
    <button value={value} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
