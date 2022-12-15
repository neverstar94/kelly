import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId:'aa97f0468e2c603e46f3',
      clientSecret: 'e5e8166b097221db329aca4c18f0ca74cc885cfd',
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)