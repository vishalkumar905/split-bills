import { type NextRequest } from 'next/server'
 
import { headers } from 'next/headers'
 
export async function GET(request: Request) {
  const headersList = headers()
  const referer = headersList.get('referer')
 
  return new Response('Hello, Next.jssss!', {
    status: 200,
    headers: { referer: referer },
  })
}