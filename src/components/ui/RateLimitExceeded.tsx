import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'
import Link from 'next/link'

export default function RateLimitExceeded() {
	return (
		<Modal
			isOpen={true}
			closeButton={false}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Günlük ziyaret sınırı aşıldı
						</ModalHeader>
						<ModalBody>
							<p>
								Günlük ziyaret sınırı aşıldı. Lütfen daha sonra tekrar deneyin
								veya giriş yapın.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='light'
								onPress={onClose}
							>
								<Link href='/'>Ana Sayfaya Dön</Link>
							</Button>
							<Button
								color='primary'
								onPress={onClose}
							>
								<Link href='/login'>Giriş yap</Link>
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
