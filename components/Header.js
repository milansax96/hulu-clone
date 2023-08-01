import Image from "next/image";
import HeaderItem from "./HeaderItem";
import {
    BadgeCheckIcon,
    CollectionIcon,
    HomeIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon,
} from '@heroicons/react/outline'
import {useRouter} from 'next/router'

function Header() {
    const router = useRouter();
    return (
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
            <div className='flex flex-grow max-w-2xl'>
                <HeaderItem title="HOME" Icon={HomeIcon}/>
                {/*<HeaderItem title="TRENDING" Icon={LightningBoltIcon}/>*/}
                {/*<HeaderItem title="VERIFIED" Icon={BadgeCheckIcon}/>*/}
                {/*<HeaderItem title="COLLECTIONS" Icon={CollectionIcon}/>*/}
                {/*<HeaderItem title="SEARCH" Icon={SearchIcon}/>*/}
                {/*<HeaderItem title="ACCOUNT" Icon={UserIcon}/>*/}
            </div>
            <p className="text-3xl py-2 pb-10 mr-2">MovieTerminal</p>
        </header>
    )
}

export default Header