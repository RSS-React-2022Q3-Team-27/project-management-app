import { SignInButton } from '../SignInButton';
import { SignUpButton } from '../SignUpButton';

export const Nav = ({ placedInHeader }: { placedInHeader: boolean }) => {
  return (
    <>
      <SignInButton placedInHeader={placedInHeader} />
      <SignUpButton placedInHeader={placedInHeader} />
    </>
  );
};
