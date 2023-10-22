import { ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import { redirect } from '@remix-run/node'

export let loader = () => redirect('/login')

export let action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate('google', request)
}
