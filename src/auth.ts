// import NextAuth, { User } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { login } from "./services/auth";
// import { jwtDecode } from "jwt-decode";
// import { AuthContextUser } from "./context/auth/props";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//        if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         try {
//           const response = await login({
//             email: credentials.email as string,
//             password: credentials.password as string
//           })

//           if (response.token) {
//             const decodedToken = jwtDecode<User>(response.token)

//             return {
//               id: decodedToken.id,
//               name: decodedToken.name,
//               email: decodedToken.email,
//               token: response.token
//             }
//           }

//           return null
//         } catch (error) {
//           console.error('Auth.js authorize error:', error)
//           return null
//         }
//       }
//     })
//   ],
//   callbacks: {

//    async jwt({ token, user }) {
//       if (user && (user as AuthContextUser).token) {
//         token.customToken = (user as AuthContextUser).token
//         token.id = user.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string
//         (session as any).customToken = token.customToken as string
//       }
//       return session
//     },
//   },
//   secret: process.env.NEXT_AUTH_SECRET,
//   pages: {
//     signIn: '/login',
//     signOut: '/login',
//     newUser: '/register'
//   }
// })
