'use client'
import { Avatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import Link from 'next/link'

/**
 * Props for the UserButton component.
 */
type UserButtonProps = {
  /** User name */
  username: string

  /** User avatar */
  avatar_url: string
}

/**
 * Renders a user button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.username - The username of the user.
 * @param {string} props.avatar_url - The URL of the user's avatar.
 * @returns {JSX.Element} The rendered user button component.
 */
export default function UserButton({ username, avatar_url }: UserButtonProps) {
  return (
    <>
      {username ? (
        <div>
          <Dropdown>
            <DropdownTrigger>
              <div className="inline-flex gap-2 rounded-2xl text-2xl font-bold transition-all duration-500 hover:scale-102 hover:cursor-pointer">
                <span>Profil</span>
                <Avatar
                  src={avatar_url}
                  size="sm"
                  showFallback
                  name={username.charAt(0)}
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <Link href={'/me'} className="text-xl font-bold">
                  Profil
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href={'/api/signout'} className="text-xl font-bold">
                  Çıkış Yap
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <Link href={'/login'} className="nav-item">
          Giriş Yap
        </Link>
      )}
    </>
  )
}
