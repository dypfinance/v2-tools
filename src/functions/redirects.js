import { Redirect } from "react-router-dom"
import { RouteComponentProps } from "react-router-dom"

export function RedirectPathToNewsOnly({ location }: RouteComponentProps) {
    return <Redirect to={{ ...location, pathname: '/news' }} />
  }