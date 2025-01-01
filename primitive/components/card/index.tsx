import clsx from 'clsx';
import React, { forwardRef } from 'react';

type Props = React.JSX.IntrinsicElements['div'];

export const Card = forwardRef(function Card(props: Props, ref: React.ForwardedRef<HTMLDivElement>) {
  const { children, className, ...originProps } = props;
  return (
    <div ref={ref} className={clsx('border overflow-hidden', className)} {...originProps}>
      {children}
    </div>
  );
});