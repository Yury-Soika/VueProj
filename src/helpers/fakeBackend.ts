export function fakeBackend() {
  const users = [
    {
      id: 1,
      username: 'user',
      password: 'user',
      firstName: 'UserFirstName',
      lastName: 'UserLastName'
    }
  ]
  const realFetch = window.fetch
  ;(window as any).fetch = function (url: string, opts: RequestInit) {
    return new Promise<Response>((resolve, reject) => {
      setTimeout(handleRoute, 500)

      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate') && opts.method === 'POST':
            return authenticate()
          case url.endsWith('/users') && opts.method === 'GET':
            return getUsers()
          default:
            realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error))
        }
      }

      function authenticate() {
        const { username, password } = body()
        const user = users.find((x) => x.username === username && x.password === password)

        if (!user) return error('Username or password is incorrect')

        const response = new Response(
          JSON.stringify({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
          }),
          {
            status: 200,
            statusText: 'OK',
            headers: new Headers({ 'Content-Type': 'application/json' })
          }
        )
        resolve(response)
      }

      function getUsers() {
        if (!isAuthenticated()) return unauthorized()

        const response = new Response(JSON.stringify(users), {
          status: 200,
          statusText: 'OK',
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
        resolve(response)
      }

      function unauthorized() {
        const response = new Response(JSON.stringify({ message: 'Unauthorized' }), {
          status: 401,
          statusText: 'Unauthorized',
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
        resolve(response)
      }

      function error(message: string) {
        const response = new Response(JSON.stringify({ message }), {
          status: 400,
          statusText: 'Bad Request',
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
        resolve(response)
      }

      function isAuthenticated() {
        return (
          opts.headers &&
          (opts.headers as Record<string, string>)['Authorization'] === 'Bearer fake-jwt-token'
        )
      }

      function body() {
        return opts.body && JSON.parse(opts.body as string)
      }
    })
  }
}
