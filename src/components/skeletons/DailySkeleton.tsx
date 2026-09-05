import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

type Props = {}

export default function DailySkeleton({ }: Props) {
    return (
        <Card title="Prévisions journalière" childrenClassName='flex flex-col gap-4'>

            {Array.from({length: 8}).map((_, index) => (
                <div key={index} className='flex justify-between'>
                    <Skeleton className="w-9 h-8" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8" />
                    <Skeleton className="size-8" />
                    <Skeleton className="size-8" />
                </div>
            ))}

        </Card>
    )
}