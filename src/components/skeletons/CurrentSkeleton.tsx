import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

type Props = {}

export default function CurrentSkeleton({ }: Props) {
    return (
        <Card
            title="Météo actuelle"
            childrenClassName='flex flex-col items-center gap-6 2xl:justify-between'
        >
            <div className='flex flex-col gap-2 items-center'>
                <Skeleton className="w-30 h-15" />
                <Skeleton className="size-14 rounded-full" />
                <Skeleton className="w-26 h-7" />
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-xl text-center'>Heure locale:</p>
                <Skeleton className="w-28 h-10" />
            </div>

            <div className='flex justify-between w-full'>
                <div className="flex flex-col gap-2 items-center">
                    <p className='text-gray-500'>Ressenti</p>
                    <Skeleton className="w-16 h-6" />
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <p className='text-gray-500'>Humidité</p>
                    <Skeleton className="w-16 h-6" />
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <p className='text-gray-500'>Vent</p>
                    <Skeleton className="w-16 h-6" />
                </div>
            </div>
        </Card>
    )
}