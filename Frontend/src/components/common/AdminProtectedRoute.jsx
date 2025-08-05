import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const AdminProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default AdminProtectedRoute;
