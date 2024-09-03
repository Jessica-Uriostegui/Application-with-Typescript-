import { ComponentType, ReactNode } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

interface AuthenticationGuardProps {
    component: ComponentType<object>
}

// AuthenticationGuard is going to take in a component as props
// that component will render normally if they are logged in
// if they are not logged in, the user will be redirected
const AuthenticationGuard = ({component}: AuthenticationGuardProps) => {
    // render the passed in component/page if they have been successfully authenticated
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <div>Redirecting!</div>
    })

  return <Component />
}

export default AuthenticationGuard