'use client'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'

/**
 * A React component that provides the Redux store to its children.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the Redux store.
 * @returns {JSX.Element} The Provider component wrapping the children with the Redux store.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={reduxStore}>{children}</Provider>
}
