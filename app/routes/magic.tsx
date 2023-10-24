import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export let loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.authenticate('email-link', request, {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })
}
