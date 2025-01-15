import AuthForm from '@/components/AuthForm'

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthForm type="sign-in" />
    </div>
  )
}

