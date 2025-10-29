import React, { createContext, useContext } from 'react'
import type { User } from '../types'

export interface UserContextType {
	user: User
	setUser: React.Dispatch<React.SetStateAction<User>>
	isAuthenticated: boolean
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultUser: User = { id: '0', name: '', email: '', points: 0 }

export const UserContext = createContext<UserContextType>({
	user: defaultUser,
	// placeholders — real setters will be injected by the provider in App
	setUser: (() => {}) as React.Dispatch<React.SetStateAction<User>>,
	isAuthenticated: false,
	setIsAuthenticated: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
})

export const useUserContext = () => useContext(UserContext)

export default UserContext
