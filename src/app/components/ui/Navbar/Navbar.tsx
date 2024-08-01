import { createClient } from '@/app/utils/server'
import { FloatingNavbar } from './FloatingNavbar'

export default async function Navbar() {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()
	return <FloatingNavbar id={data.user?.user_metadata.sub} />
}

/**
 * Represents the navigation items in the navbar.
 */
const navItems = [
	/**
	 * Represents the "Anasayfa" navigation item.
	 */
	{
		name: 'Anasayfa',
		link: '/',
	},
	/**
	 * Represents the "Keşfet" navigation item.
	 */
	{
		name: 'Keşfet',
		link: '/explore',
	},
	/**
	 * Represents the "Topluluk" navigation item.
	 */
	{
		name: 'Topluluk',
		link: 'community',
	},
]
