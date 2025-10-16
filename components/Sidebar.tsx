'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname();

  return (
    <section className='sidebar'>
        <nav className='flex gap-4 flex-col'>
            <Link href="/" className="cursor-pointer mb-10 items-center gap-2 flex">
                <Image 
                    src="/icons/logo.svg"
                    width={50}
                    height={50}
                    alt='BankInd Logo'
                    className='size-[29px] max-xl:size-14'
                />
                <h1 className='sidebar-logo'>BankInd</h1>
            </Link>

            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                return (
                    <Link href={item.route} key={item.label}
                    className={cn('sidebar-link', {'bg-bank-gradient': isActive})}
                    >
                        <div className='relative size-6'>
                            <Image
                             src={item.imgURL}
                             alt={item.label}
                             fill
                             className={cn({'brightness-[4] invert-0': isActive})}
                            />
                        </div>
                        <p className={cn('sidebar-label', {'!text-white': isActive} )}>
                            {item.label}
                        </p>
                    </Link>
                )
            })}

            user
        </nav>

        footer
    </section>
  )
}

export default Sidebar