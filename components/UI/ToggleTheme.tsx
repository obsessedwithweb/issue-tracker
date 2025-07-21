'use client'

import { Theme } from '@radix-ui/themes'
import { PropsWithChildren, useState } from 'react'
import { NavBar } from '.'
import { MoonStar, SunMedium } from 'lucide-react'

const ToggleTheme = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    return (
        <Theme accentColor="violet" grayColor="sand" radius="large" scaling="110%" appearance={theme} >
            <NavBar>
                {
                    theme === 'dark' ?
                        <SunMedium onClick={() => setTheme('light')} />
                        : <MoonStar onClick={() => setTheme('dark')} />
                }
            </NavBar>
            {children}
        </Theme>
    )
}

export default ToggleTheme
