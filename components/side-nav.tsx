import { SecondaryNavItem, SidebarNavItem } from '@/types/nav.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SideNavProps {
	secodaryItems: SecondaryNavItem[];
	items: SidebarNavItem[];
}

export default function SideNav({ items, secodaryItems }: SideNavProps) {
	const pathname = usePathname();

	return (
		<nav className='pl-10 pt-10 border-r h-screen w-72 styled-scrollbar overflow-y-scroll'>
			{items.map((item, i) => {
				const matchingSecondaryItem = secodaryItems.find(
					(secItem) =>
						secItem.identityKey &&
						pathname.includes(secItem.identityKey)
				);

				if (
					matchingSecondaryItem &&
					matchingSecondaryItem.identityKey === item.identityKey
				) {
					return (
						<div key={i}>
							<header className='py-[10px] pl-[10px] text-sm font-semibold mb-[10px]'>
								{item.title}
							</header>
							<ul>
								{item.items.map(
									(navItem, idx) =>
										navItem.href && (
											<li key={idx}>
												<Link
													href={navItem.href}
													className={`pl-[10px] py-[5px] w-full inline-block text-[13px] font-medium capitalize rounded-sm hover:text-black mb-[10px] ${
														pathname ===
														navItem.href
															? 'text-[#4F00A3] bg-[#F4EDFB]'
															: 'text-[#5A5A5C]'
													}`}
												>
													{navItem.title}
												</Link>
											</li>
										)
								)}
							</ul>
						</div>
					);
				} else {
					return null;
				}
			})}
		</nav>
	);
}