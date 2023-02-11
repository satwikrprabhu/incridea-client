import { Button } from '@/src/components/button';
import { SignUpDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, FormEventHandler } from 'react';

const SignUp: NextPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signUpMutation, { data, loading, error: mutationError }] =
    useMutation(SignUpDocument);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some validations like checking if the email is already in use, password length etc.
    e.preventDefault();
    signUpMutation({
      variables: {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      },
    })
      .then((res) => {
        if (res.data?.signUp.__typename === 'MutationSignUpSuccess') {
          router.push('/auth/verify-email');
        }
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border border-black p-5 rounded-xl"
      >
        <input
          value={userInfo.name}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, name: target.value })
          }
          type="text"
          placeholder="John Doe"
        />
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="Email"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="Password"
        />
        <Button>Sign Up</Button>
        {mutationError && <p>{mutationError.message}</p>}
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default SignUp;
