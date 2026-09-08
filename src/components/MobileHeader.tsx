import type { Dispatch, SetStateAction } from 'react'
import Hamburger from '../assets/hamburger.svg?react'

type Props = {
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
    return (
        <div className="w-full h-16 p-4 bg-background sticky xs:hidden top-0 flex gap-8 justify-end z-9">
            <button
                onClick={() => setIsSidePanelOpen(true)}
            >
                <Hamburger className="size-8 invert" />
            </button>
        </div>
    )
}