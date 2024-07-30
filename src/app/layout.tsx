import { BackgroundCellCore } from '@/components/ui/BackgroundRippleEffect'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar/Navbar'
import { Providers } from '@/lib/providers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextUIProvider } from '@nextui-org/system'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import Head from 'next/head'
import Clicky from '@/components/Clarity'
import Clarity from '@/components/Clarity'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
	title: {
		template: '%s | CodeNest',
		default: 'CodeNest',
	},
	description: 'En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.',
	applicationName: 'CodeNest',
	keywords:
		'code nest, share code, collaborate, projects, code, coding, programming, development, developer, web development, web developer, full stack, front end, back end, software, software engineer, software developer, software development, open source, github, git, gitlab, bitbucket, repository, repositories, version control, version control system, vcs, versioning, versioning system, versioning control system, versioning control',
	creator: 'sametcn99',
	publisher: 'sametcn99',
	robots: 'index, follow',
	openGraph: {
		title: {
			template: '%s | CodeNest',
			default: 'CodeNest',
		},
		description: 'En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.',
		type: 'website',
		url: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
		images: ['/icons/favicon-512x512.png'],
		locale: 'tr_TR',
		siteName: 'CodeNest',
		emails: 'sametcn99@gmail.com',
	},
	icons: {
		icon: '/icons/favicon-512x512.png',
		shortcut: '/icons/favicon-512x512.png',
		apple: '/icons/favicon-512x512.png',
		username: 'sametcn99',
	},
	twitter: {
		site: 'CodeNest',
		title: 'CodeNest',
		description: 'En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.',
		card: 'summary_large_image',
		images: ['/icons/favicon-512x512.png'],
		creator: 'sametcn99',
		creatorId: '@sametcn99',
	},
	appleWebApp: {
		title: 'CodeNest',
		statusBarStyle: 'black-translucent',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${font.className} dark`}>
				<NextUIProvider>
					<Providers>
						<section className='relative flex min-h-screen flex-col gap-20 px-2 antialiased'>
							<Navbar />
							{children}
							<Toaster theme='dark' />
						</section>
						<Footer />
						<Clarity />
						<Analytics />
					</Providers>
				</NextUIProvider>
				<BackgroundCellCore />
			</body>
			<GoogleAnalytics gaId='G-6BSGH2FJGV' />
		</html>
	)
}
