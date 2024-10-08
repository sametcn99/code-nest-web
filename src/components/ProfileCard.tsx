'use client'
import { followAction } from '@/actions/follow-actions'
import useProfileEditor from '@/lib/hooks/useProfileEditor'
import { cn } from '@/utils/cn'
import {
	Button,
	Card,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RiUserAddLine, RiUserFollowLine } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { toast } from 'sonner'
import { Tables } from 'app/../../types/supabase'
import ContactListModal from './ContactListModal'
import RichTextRender from './ui/RichTextRender'
import { formatCount } from '../utils/utils'
import useValidImage from '@/lib/hooks/useValidImage'

/**
 * Props for the ProfileCard component.
 */
type ProfileCardProps = {
	/** The user profile data. */
	user: Tables<'profiles'>

	/** Indicates whether the user is authenticated. */
	auth: boolean

	/** The viewer ID. */
	viewerID?: string

	/** The component class name. */
	className?: React.HtmlHTMLAttributes<HTMLDivElement>['className']
	views: number
}

/**
 * Renders a profile card component.
 *
 * @component
 * @param {ProfileCardProps} props - The component props.
 * @returns {JSX.Element} The rendered profile card.
 */
export default function ProfileCard({
	user,
	auth,
	viewerID,
	className,
	views,
}: ProfileCardProps) {
	const {
		userData,
		bannerUrl,
		isOpen,
		isChangesSaved,
		isFollowed,
		handleBannerUrlChange,
		handleBioChange,
		handleUsernameChange,
		handleSaveChanges,
		handleSaveBannerUrl,
		onOpen,
		onOpenChange,
		setIsFollowed,
		setIsChangesSaved,
	} = useProfileEditor(user, viewerID)

	return (
		<Card
			className={cn(
				`mb-4 flex flex-col justify-center gap-4 border border-b-2 border-white/30 bg-transparent p-6 shadow-lg backdrop-blur-sm`,
				className
			)}
		>
			<div className='relative z-20 h-60 w-full overflow-visible rounded-lg'>
				{auth && (
					<Button
						isIconOnly
						className='absolute right-3 top-3 z-30 bg-opacity-50 backdrop-blur hover:bg-opacity-25 hover:text-red-600 hover:backdrop-blur'
						onPress={onOpen}
					>
						<TbEdit size={20} />
					</Button>
				)}
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className='flex flex-col gap-1'>
									Banner&apos;ı Düzenle
								</ModalHeader>
								<ModalBody>
									<Textarea
										placeholder='Banner URL'
										value={bannerUrl || ''}
										onChange={handleBannerUrlChange}
										className='w-full'
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										color='danger'
										variant='light'
										onPress={onClose}
									>
										Kaydetme
									</Button>
									<Button
										color='primary'
										onPress={onClose}
										onClick={async () => {
											await handleSaveBannerUrl()
										}}
									>
										Kaydet
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
				<Image
					src={
						useValidImage(bannerUrl)
							? (bannerUrl ?? '/images/default_banner.gif')
							: '/images/default_banner.gif'
					}
					title={`${userData.username}'s banner`}
					alt={`${userData.username}'s banner`}
					fill
					objectFit='cover'
					unoptimized
					priority
					role='banner'
					draggable='false'
					unselectable='on'
					className='rounded-lg'
				/>
				<div className='absolute bottom-0 z-50 inline-flex translate-y-3/4 place-items-center'>
					<Image
						src={
							useValidImage(user.avatar_url)
								? (user.avatar_url ?? '/images/default_avatar.png')
								: '/images/default_avatar.png'
						}
						title={`${userData.username}'s avatar`}
						alt={`${userData.username}'s avatar`}
						unoptimized
						priority
						role='banner'
						draggable='false'
						unselectable='on'
						width={100}
						height={100}
						className='h-22 w-22 rounded-full border-8 border-[#18181B]'
					/>
					<div className='flex flex-col overflow-x-scroll scrollbar-hide'>
						<div className='mb-[-0.625rem] inline-flex gap-2'>
							{auth && !isChangesSaved ? (
								<input
									className='h-10 w-fit bg-transparent text-2xl font-semibold hover:outline-none'
									placeholder='Kullanıcı adı'
									onChange={handleUsernameChange}
									value={userData.username ?? ''}
								/>
							) : (
								<p className='inline-flex h-10 w-fit place-items-center bg-transparent text-2xl font-semibold hover:outline-none'>
									<Link
										className='hover:underline'
										href={`/user/${user.id}`}
									>
										{userData.username || user.full_name || 'Kullanıcı adı'}
									</Link>
									{auth && (
										<Button
											isIconOnly
											className='bg-transparent hover:text-blue-600'
											onClick={() => setIsChangesSaved(false)}
										>
											<TbEdit size={20} />
										</Button>
									)}
								</p>
							)}
							{!auth && (
								<Button
									isIconOnly
									className='mb-auto ml-5 bg-transparent hover:text-green-500'
									onClick={(e) => {
										if (user && viewerID && user.id !== viewerID) {
											console.log('Follow action:', user, viewerID, isFollowed)
											followAction(user, viewerID, isFollowed ? 'Unfollow' : 'Follow')
											setIsFollowed(!isFollowed)
										}
										user.id === viewerID && toast.error('Kendinizi takip edemezsiniz.')
										!viewerID &&
											toast.error('Bu özelliği kullanabilmek için giriş yapmalısınız.')
									}}
								>
									{isFollowed ? (
										<RiUserFollowLine size={20} />
									) : (
										<RiUserAddLine size={20} />
									)}
								</Button>
							)}
						</div>
						{user.roles && (
							<span className='text-muted'>{user.roles?.join(', ')}</span>
						)}
					</div>
				</div>
			</div>
			<div className='mt-20 flex items-center gap-4'>
				<div className='flex w-full flex-col gap-1'>
					<div className='inline-flex gap-2'>
						<ContactListModal id={user.id} />
					</div>
					<div className='flex flex-col'>
						<p>
							Discord Adı:{' '}
							<Link
								href={`https://discord.com/users/${user.sub}`}
								className='inline-flex text-muted hover:underline'
							>
								{user.full_name}
							</Link>
						</p>
						<p>Profil Görüntülenme sayısı: {formatCount(views)}</p>
					</div>
					{auth && !isChangesSaved && (
						<Textarea
							value={userData.bio ?? ''}
							onChange={handleBioChange}
							className='w-full'
							placeholder='Biyografi'
						/>
					)}
					{auth && isChangesSaved && (
						<Card className='min-h-24 w-full p-2 text-white'>
							<div className='min-h-24 w-full p-2 text-white'>
								<RichTextRender
									content={userData.bio ?? ''}
									linkClassName='hover:underline'
								/>
							</div>
							<Button
								isIconOnly
								className='absolute right-1 top-1 mr-2 mt-2 bg-transparent hover:text-blue-600'
								onClick={() => setIsChangesSaved(false)}
							>
								<TbEdit size={20} />
							</Button>
						</Card>
					)}
					{auth === false && (
						<div className='min-h-24 w-full p-2 text-white'>
							<RichTextRender
								content={userData.bio ?? ''}
								linkClassName='hover:underline'
							/>
						</div>
					)}
				</div>
			</div>
			{auth && (
				<div className='inline-flex flex-wrap gap-2 self-end'>
					{!isChangesSaved && (
						<Button
							className='w-fit rounded-full bg-transparent pb-2 pl-6 pr-6 pt-2 text-sm transition-all duration-300 hover:bg-green-950'
							onPress={async () => await handleSaveChanges()}
						>
							Değişiklikleri kaydet
						</Button>
					)}
				</div>
			)}
		</Card>
	)
}
